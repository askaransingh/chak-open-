// import React, { useEffect, useState } from "react";
// import AdminNavbar from "./AdminNavbar";

// export default function AdminAllOrders() {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch("http://localhost:6003/api/orders");
//       const data = await res.json();
//       setOrders(data);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const payDriver = async (orderId) => {
//     const order = orders.find((o) => o._id === orderId);
//     if (!order.assignedDriver) {
//       alert("No driver assigned!");
//       return;
//     }

//     const amount = prompt("Enter amount to pay driver:");
//     if (!amount) return;

//     try {
//       const res = await fetch("http://localhost:6003/drivers/pay-driver", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderId, amount }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Driver Paid");
//         fetchOrders();
//       } else {
//         alert(data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to pay driver");
//     }
//   };

//   const payMechanic = async (invoiceId) => {
//     const amount = prompt("Enter amount to pay mechanic:");
//     if (!amount) return;

//     try {
//       const res = await fetch("http://localhost:6003/admin/pay-mechanic", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ invoiceId, amount }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Mechanic Paid");
//         fetchOrders();
//       } else {
//         alert(data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to pay mechanic");
//     }
//   };

//   const renderAddress = (address) => {
//     if (!address) return "-";
//     return `${address.street || "-"}, ${address.city || "-"}, ${address.province || "-"}, ${address.postalCode || "-"}, ${address.country || "-"}`;
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div style={{ padding: "20px" }}>
//         <h2>All Orders (Admin)</h2>
//         {orders.length === 0 ? (
//           <p>No orders found</p>
//         ) : (
//           orders.map((o) => (
//             <div
//               key={o._id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: 15,
//                 marginBottom: 15,
//                 borderRadius: 8,
//                 backgroundColor: "#f9f9f9",
//               }}
//             >
//               {/* Customer Info */}
//               <h3>👤 Customer Info</h3>
//               <p><b>Name:</b> {o.userName || "N/A"}</p>
//               <p><b>Email:</b> {o.email || "N/A"}</p>
//               <p><b>Phone:</b> {o.phone || "N/A"}</p>

//               {/* Addresses */}
//               <h4>📍 Shipping Address</h4>
//               <p>{renderAddress(o.shippingAddress)}</p>
//               <h4>📍 Billing Address</h4>
//               <p>{renderAddress(o.billingAddress)}</p>
//               <h4>📍 Company Address</h4>
//               <p>{renderAddress(o.companyAddress)}</p>

//               {/* Driver Info */}
//               <h4>🚚 Driver Info</h4>
//               <p><b>Name:</b> {o.assignedDriver?.name || "Not assigned"}</p>
//               <p><b>Email:</b> {o.assignedDriver?.email || "N/A"}</p>
//               <p><b>Phone:</b> {o.assignedDriver?.phone || "N/A"}</p>
//               <p><b>Status:</b> {o.status}</p>
//               <p><b>Driver Paid:</b> {o.isDriverPaid ? `✅ ₹${o.driverPaidAmount}` : "❌"}</p>

//               {/* Mechanic Info */}
//               {o.mechanic && (
//                 <>
//                   <h4>🔧 Mechanic Info</h4>
//                   <p><b>Name:</b> {o.mechanic.name}</p>
//                   <p><b>Email:</b> {o.mechanic.email}</p>
//                   <p><b>Mechanic Paid:</b> {o.isMechanicPaid ? `✅` : "❌"}</p>
//                   {!o.isMechanicPaid && (
//                     <button onClick={() => payMechanic(o.invoiceId)}>
//                       💸 Pay Mechanic
//                     </button>
//                   )}
//                 </>
//               )}

//               {/* Order Items */}
//               <h4>📦 Items</h4>
//               <ul>
//                 {o.items.map((item, idx) => (
//                   <li key={`${item.partId}-${idx}`}>
//                     {item.partName} (x{item.quantity}) – ₹{item.price}
//                   </li>
//                 ))}
//               </ul>

//               {/* Pay Driver Button */}
//               {!o.isDriverPaid && o.assignedDriver && (
//                 <button onClick={() => payDriver(o._id)}>💸 Pay Driver</button>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const CACHE_KEY = "admin_all_orders_cache";

export default function AdminAllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = process.env.REACT_APP_API_BASE_URL;
  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to fetch orders, loading cache", err);
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) setOrders(JSON.parse(cached));
      else setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= PAY DRIVER ================= */
  const payDriver = async (orderId) => {
    const order = orders.find((o) => o._id === orderId);
    if (!order?.assignedDriver) {
      alert("No driver assigned!");
      return;
    }

    const amount = prompt("Enter amount to pay driver:");
    if (!amount || Number(amount) <= 0) return;

    try {
      const res = await fetch(`${API}/drivers/pay-driver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, amount }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Driver Paid");
        fetchOrders();
      } else alert(data.error || "Payment failed");
    } catch (err) {
      console.error(err);
      alert("Failed to pay driver");
    }
  };

  /* ================= PAY MECHANIC ================= */
  const payMechanic = async (invoiceId) => {
    const amount = prompt("Enter amount to pay mechanic:");
    if (!amount || Number(amount) <= 0) return;
// https://newb-1.onrender.com
    try {
      const res = await fetch(`${API}/admin/pay-mechanic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId, amount }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Mechanic Paid");
        fetchOrders();
      } else alert(data.error || "Payment failed");
    } catch (err) {
      console.error(err);
      alert("Failed to pay mechanic");
    }
  };

  const renderAddress = (address) => {
    if (!address) return "-";
    return `${address.street || "-"}, ${address.city || "-"}, ${address.province || "-"}, ${address.postalCode || "-"}, ${address.country || "-"}`;
  };

  /* ================= UI ================= */
  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-6">
            📦 All Orders (Admin)
          </h2>

          {loading && <p className="text-gray-500">Loading orders...</p>}
          {!loading && orders.length === 0 && (
            <p className="text-gray-500">No orders found.</p>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {orders.map((o) => (
              <div
                key={o._id}
                className="bg-white rounded-lg shadow border border-gray-300 p-5 flex flex-col justify-between"
              >
                {/* Customer Info */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-800">👤 Customer Info</h3>
                  <p><b>Name:</b> {o.userName || "N/A"}</p>
                  <p><b>Email:</b> {o.email || "N/A"}</p>
                  <p><b>Phone:</b> {o.phone || "N/A"}</p>
                </div>

                {/* Addresses */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-800">📍 Shipping Address</h3>
                  <p>{renderAddress(o.shippingAddress)}</p>
                  <h3 className="font-semibold text-gray-800">📍 Billing Address</h3>
                  <p>{renderAddress(o.billingAddress)}</p>
                  <h3 className="font-semibold text-gray-800">📍 Company Address</h3>
                  <p>{renderAddress(o.companyAddress)}</p>
                </div>

                {/* Driver Info */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-800">🚚 Driver Info</h3>
                  <p><b>Name:</b> {o.assignedDriver?.name || "Not assigned"}</p>
                  <p><b>Email:</b> {o.assignedDriver?.email || "N/A"}</p>
                  <p><b>Phone:</b> {o.assignedDriver?.phone || "N/A"}</p>
                  <p><b>Status:</b> {o.status}</p>
                  <p><b>Driver Paid:</b> {o.isDriverPaid ? `✅ ₹${o.driverPaidAmount}` : "❌"}</p>
                </div>

                {/* Mechanic Info */}
                {o.mechanic && (
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-800">🔧 Mechanic Info</h3>
                    <p><b>Name:</b> {o.mechanic.name}</p>
                    <p><b>Email:</b> {o.mechanic.email}</p>
                    <p><b>Mechanic Paid:</b> {o.isMechanicPaid ? `✅` : "❌"}</p>
                    {!o.isMechanicPaid && (
                      <button
                        onClick={() => payMechanic(o.invoiceId)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-2"
                      >
                        💸 Pay Mechanic
                      </button>
                    )}
                  </div>
                )}

                {/* Items */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-800">📦 Items</h3>
                  <ul className="list-disc list-inside text-sm">
                    {o.items.map((item, idx) => (
                      <li key={`${item.partId}-${idx}`}>
                        {item.partName} (x{item.quantity}) – ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pay Driver Button */}
                {!o.isDriverPaid && o.assignedDriver && (
                  <button
                    onClick={() => payDriver(o._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    💸 Pay Driver
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}