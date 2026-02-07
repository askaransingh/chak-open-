

// // // import { useEffect, useState } from "react";

// // // export default function AdminDeliveredOrders() {
// // //   const [orders, setOrders] = useState([]);

// // //   const fetchOrders = async () => {
// // //     const res = await fetch("http://localhost:6003/drivers/delivered-orders");
// // //     const data = await res.json();
// // //     setOrders(data);
// // //   };

// // //   useEffect(() => {
// // //     fetchOrders();
// // //   }, []);

// // //   const payDriver = async (orderId) => {
// // //     const amount = prompt("Enter amount to pay driver:");
// // //     if (!amount) return;

// // //     const res = await fetch("http://localhost:6003/drivers/pay-driver", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({ orderId, amount }),
// // //     });

// // //     const data = await res.json();

// // //     if (res.ok) {
// // //       alert("✅ Driver Paid");
// // //       fetchOrders();
// // //     } else {
// // //       alert(data.error);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <h2>Delivered Orders</h2>

// // //       {orders.map(o => (
// // //         <div key={o._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
// // //           <p><b>Customer:</b> {o.userName}</p>
// // //           <p><b>Driver:</b> {o.assignedDriver?.name}</p>
// // //           <p><b>Status:</b> {o.status}</p>

// // //           {!o.isDriverPaid ? (
// // //             <button onClick={() => payDriver(o._id)}>
// // //               💸 Pay Driver
// // //             </button>
// // //           ) : (
// // //             <p style={{ color: "green" }}>✅ Driver Paid</p>
// // //           )}
// // //         </div>
// // //       ))}
// // //     </>
// // //   );
// // // }
// // import { useEffect, useState } from "react";
// // import AdminNavbar from "./AdminNavbar";

// // export default function AdminDeliveredOrders() {
// //   const [orders, setOrders] = useState([]);

// //   const fetchOrders = async () => {
// //     try {
// //       const res = await fetch("http://localhost:6003/drivers/delivered-orders");
// //       const data = await res.json();
// //       setOrders(data);
// //     } catch (err) {
// //       console.error("Failed to fetch delivered orders:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []);

// //   const payDriver = async (orderId) => {
// //     const amount = prompt("Enter amount to pay driver:");
// //     if (!amount) return;

// //     try {
// //       const res = await fetch("http://localhost:6003/drivers/pay-driver", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ orderId, amount }),
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         alert("✅ Driver Paid");
// //         fetchOrders();
// //       } else {
// //         alert(data.error || "Payment failed");
// //       }
// //     } catch (err) {
// //       console.error("Pay driver error:", err);
// //       alert("Failed to pay driver");
// //     }
// //   };

// //   return (
// //     <>
// //       <AdminNavbar />
// //       <div style={{ padding: "20px" }}>
// //         <h2>Delivered Orders</h2>

// //         {orders.length === 0 ? (
// //           <p>No delivered orders yet.</p>
// //         ) : (
// //           orders.map((o) => (
// //             <div key={o._id} style={{ border: "1px solid #ccc", padding: 15, marginBottom: 15 }}>
// //               <h3>👤 Customer Info</h3>
// //               <p><b>Name:</b> {o.userName}</p>
// //               <p><b>Email:</b> {o.email}</p>
// //               <p><b>Phone:</b> {o.phone}</p>

// //               <h4>📍 Shipping Address</h4>
// //               <p>
// //                 {o.shippingAddress?.street}, {o.shippingAddress?.city}, {o.shippingAddress?.province}, {o.shippingAddress?.postalCode}, {o.shippingAddress?.country}
// //               </p>

// //               <h4>Driver Info</h4>
// //               <p><b>Name:</b> {o.assignedDriver?.name || "Not assigned"}</p>
// //               <p><b>Email:</b> {o.assignedDriver?.email || "N/A"}</p>
// //               <p><b>Phone:</b> {o.assignedDriver?.phone || "N/A"}</p>

// //               <h4>Order Items</h4>
// //               <ul>
// //                 {o.items.map((item) => (
// //                   <li key={item.partId}>{item.partName} (x{item.quantity}) – ₹{item.price}</li>
// //                 ))}
// //               </ul>

// //               <p><b>Total:</b> ₹{o.total}</p>
// //               <p><b>Status:</b> {o.status}</p>

// //               {!o.isDriverPaid ? (
// //                 <button onClick={() => payDriver(o._id)}>💸 Pay Driver</button>
// //               ) : (
// //                 <p style={{ color: "green" }}>✅ Driver Paid (₹{o.driverPaidAmount})</p>
// //               )}
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </>
// //   );
// // }

// import { useEffect, useState } from "react";
// import AdminNavbar from "./AdminNavbar";

// export default function AdminDeliveredOrders() {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch("http://localhost:6003/drivers/delivered-orders");
//       const data = await res.json();
//       setOrders(data);
//     } catch (err) {
//       console.error("Failed to fetch delivered orders:", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const payDriver = async (orderId) => {
//     const order = orders.find((o) => o._id === orderId);
//     if (!order?.assignedDriver) {
//       alert("No driver assigned for this order!");
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
//         alert(data.error || "Payment failed");
//       }
//     } catch (err) {
//       console.error("Pay driver error:", err);
//       alert("Failed to pay driver");
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
//         <h2>Delivered Orders</h2>

//         {orders.length === 0 ? (
//           <p>No delivered orders yet.</p>
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

//               {/* Shipping Address */}
//               <h4>📍 Shipping Address</h4>
//               <p>{renderAddress(o.shippingAddress)}</p>

//               {/* Driver Info */}
//               <h4>Driver Info</h4>
//               <p><b>Name:</b> {o.assignedDriver?.name || "Not assigned"}</p>
//               <p><b>Email:</b> {o.assignedDriver?.email || "N/A"}</p>
//               <p><b>Phone:</b> {o.assignedDriver?.phone || "N/A"}</p>

//               {/* Order Items */}
//               <h4>Order Items</h4>
//               <ul>
//                 {o.items.map((item, idx) => (
//                   <li key={`${item.partId}-${idx}`}>
//                     {item.partName} (x{item.quantity}) – ₹{item.price}
//                   </li>
//                 ))}
//               </ul>

//               <p><b>Total:</b> ₹{o.total}</p>
//               <p><b>Status:</b> {o.status}</p>

//               {/* Pay Driver Button */}
//               {!o.isDriverPaid && o.assignedDriver ? (
//                 <button onClick={() => payDriver(o._id)}>💸 Pay Driver</button>
//               ) : o.isDriverPaid ? (
//                 <p style={{ color: "green" }}>✅ Driver Paid (₹{o.driverPaidAmount})</p>
//               ) : (
//                 <p style={{ color: "red" }}>⚠️ Driver not assigned</p>
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

const CACHE_KEY = "admin_delivered_orders_cache";

export default function AdminDeliveredOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = process.env.REACT_APP_API_BASE_URL;
  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/drivers/delivered-orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to fetch delivered orders, loading cache", err);
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
      alert("No driver assigned for this order!");
      return;
    }

    const amount = prompt("Enter amount to pay driver:");
    if (!amount || Number(amount) <= 0) return;
// https://newb-1.onrender.com
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
      } else {
        alert(data.error || "Payment failed");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to pay driver");
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
            🚚 Delivered Orders
          </h2>

          {loading && <p className="text-gray-500">Loading delivered orders...</p>}
          {!loading && orders.length === 0 && (
            <p className="text-gray-500">No delivered orders yet.</p>
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

                {/* Shipping Address */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-800">📍 Shipping Address</h3>
                  <p>{renderAddress(o.shippingAddress)}</p>
                </div>

                {/* Driver Info */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-800">🚛 Driver Info</h3>
                  <p><b>Name:</b> {o.assignedDriver?.name || "Not assigned"}</p>
                  <p><b>Email:</b> {o.assignedDriver?.email || "N/A"}</p>
                  <p><b>Phone:</b> {o.assignedDriver?.phone || "N/A"}</p>
                </div>

                {/* Order Items */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-800">📦 Order Items</h3>
                  <ul className="list-disc list-inside text-sm">
                    {o.items.map((item, idx) => (
                      <li key={`${item.partId}-${idx}`}>
                        {item.partName} (x{item.quantity}) – ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <p><b>Total:</b> ₹{o.total}</p>
                  <p><b>Status:</b> <span className="text-gray-700">{o.status}</span></p>
                </div>

                {/* Pay Driver Button / Status */}
                <div className="mt-3">
                  {!o.isDriverPaid && o.assignedDriver ? (
                    <button
                      onClick={() => payDriver(o._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      💸 Pay Driver
                    </button>
                  ) : o.isDriverPaid ? (
                    <span className="text-green-600 font-semibold">
                      ✅ Driver Paid (₹{o.driverPaidAmount})
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      ⚠️ Driver not assigned
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}