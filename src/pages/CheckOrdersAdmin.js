

// // src/pages/CheckOrdersAdmin.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "./AdminNavbar";

// function CheckOrdersAdmin() {
//   const [orders, setOrders] = useState([]);
//   const [drivers, setDrivers] = useState([]);
//   const navigate = useNavigate();

//   // Fetch all orders
//   useEffect(() => {
//     fetch("http://localhost:6003/api/orders")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Orders fetched:", data); // Debug: check if addresses exist
//         setOrders(data);
//       })
//       .catch((err) => console.error("Error fetching orders:", err));
//   }, []);

//   // Fetch drivers list
//   useEffect(() => {
//     fetch("http://localhost:6003/api/drivers")
//       .then((res) => res.json())
//       .then((data) => setDrivers(data))
//       .catch((err) => console.error("Error fetching drivers:", err));
//   }, []);

//   // Update order status
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await fetch(`http://localhost:6003/api/orders/${orderId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       setOrders((prev) =>
//         prev.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (err) {
//       console.error("Error updating order status:", err);
//       alert("Failed to update order status");
//     }
//   };

//   // Assign driver to order
//   const handleAssignDriver = async (orderId, driverId) => {
//     if (!driverId) return;
//     try {
//       await fetch(`http://localhost:6003/api/drivers/assign/${orderId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ driverId }),
//       });
//       alert("✅ Driver assigned successfully");
//     } catch (err) {
//       console.error("Error assigning driver:", err);
//       alert("Failed to assign driver");
//     }
//   };

//   // Navigate to invoice page
//   const handleCreateInvoice = (order) => {
//     navigate("/invoice", { state: { order } });
//   };

//   // Render address helper
//   const renderAddress = (label, address) => {
//     // If address is missing, show empty object with N/A
//     const addr = address || {};
//     return (
//       <div style={{ marginBottom: "8px" }}>
//         <h4>{label}</h4>
//         <ul style={{ marginLeft: "20px" }}>
//           <li>Street: {addr.street || "N/A"}</li>
//           <li>City: {addr.city || "N/A"}</li>
//           <li>Province: {addr.province || "N/A"}</li>
//           <li>Postal Code: {addr.postalCode || "N/A"}</li>
//           <li>Country: {addr.country || "N/A"}</li>
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div style={{ padding: "20px" }}>
//         <h2>Admin Orders</h2>

//         {orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           orders.map((order) => (
//             <div
//               key={order._id}
//               style={{
//                 border: "1px solid #ccc",
//                 marginBottom: "15px",
//                 padding: "15px",
//                 borderRadius: "8px",
//                 boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                 backgroundColor: "#f9f9f9",
//               }}
//             >
//               {/* 👤 User Info */}
//               <h3>👤 User Info</h3>
//               <p><b>Name:</b> {order.userName || "N/A"}</p>
//               <p><b>Email:</b> {order.email || "N/A"}</p>
//               <p><b>Phone:</b> {order.phone || "N/A"}</p> 

//               {/* 📍 Addresses */}
//               <div style={{ marginTop: "10px" }}>
//                 <h3>📍 Addresses</h3>
//                 {renderAddress("User Address", order.userAddress)}
//                 {renderAddress("Company Address", order.companyAddress)}
//                 {renderAddress("Shipping Address", order.shippingAddress)}
//                 {renderAddress("Billing Address", order.billingAddress)}
//               </div>

//               {/* 💰 Order Details */}
//               <hr />
//               <p><b>Total:</b> ₹{order.total}</p>

//               {/* 📦 Status */}
//               <div style={{ marginTop: "10px", marginBottom: "10px" }}>
//                 <b>Status:</b>
//                 <select
//                   value={order.status || "Pending"}
//                   onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                   style={{
//                     padding: "5px",
//                     borderRadius: "4px",
//                     marginLeft: "10px",
//                     border: "1px solid #ccc",
//                   }}
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Dispatched">Dispatched</option>
//                   <option value="In Transit">In Transit</option>
//                   <option value="Delivered">Delivered</option>
//                 </select>
//               </div>

//               {/* 🚚 Assign Driver */}
//               <div style={{ marginBottom: "10px" }}>
//                 <label><b>Assign Driver:</b> </label>
//                 <select
//                   onChange={(e) => handleAssignDriver(order._id, e.target.value)}
//                   style={{
//                     padding: "5px",
//                     borderRadius: "4px",
//                     marginLeft: "10px",
//                     border: "1px solid #ccc",
//                   }}
//                 >
//                   <option value="">Select Driver</option>
//                   {drivers.map((driver) => (
//                     <option key={driver._id} value={driver._id}>
//                       {driver.name} ({driver.phone})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* 🧾 Invoice Button */}
//               <button
//                 onClick={() => handleCreateInvoice(order)}
//                 style={{
//                   background: "#007bff",
//                   color: "#fff",
//                   border: "none",
//                   padding: "8px 12px",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   marginBottom: "10px",
//                 }}
//               >
//                 Create Invoice
//               </button>

//               {/* 📦 Order Items */}
//               <hr />
//               <p><b>Items:</b></p>
//               <ul>
//                 {order.items.map((item) => (
//                   <li key={item.partId}>
//                     {item.partName} — Qty: {item.quantity} — Price: ₹{item.price}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// }

// export default CheckOrdersAdmin;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function CheckOrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  const ORDER_CACHE = "admin_orders_cache";
  const DRIVER_CACHE = "admin_drivers_cache";
  const API = process.env.REACT_APP_API_BASE_URL;
  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    fetch(`${API}/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        const safe = Array.isArray(data) ? data : [];
        setOrders(safe);
        localStorage.setItem(ORDER_CACHE, JSON.stringify(safe));
      })
      .catch(() => {
        const cached = localStorage.getItem(ORDER_CACHE);
        if (cached) setOrders(JSON.parse(cached));
      });
  }, []);

  /* ================= FETCH DRIVERS ================= */
  useEffect(() => {
    fetch(`${API}/api/drivers`)
      .then((res) => res.json())
      .then((data) => {
        const safe = Array.isArray(data) ? data : [];
        setDrivers(safe);
        localStorage.setItem(DRIVER_CACHE, JSON.stringify(safe));
      })
      .catch(() => {
        const cached = localStorage.getItem(DRIVER_CACHE);
        if (cached) setDrivers(JSON.parse(cached));
      });
  }, []);

  /* ================= UPDATE STATUS ================= */
  const handleStatusChange = async (orderId, status) => {
    await fetch(`${API}/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status } : o))
    );
  };
// https://newb-1.onrender.com
  /* ================= ASSIGN DRIVER ================= */
  const handleAssignDriver = async (orderId, driverId) => {
    if (!driverId) return;
    await fetch(`${API}/api/drivers/assign/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ driverId }),
    });
    alert("Driver assigned");
  };

  /* ================= INVOICE ================= */
  const handleCreateInvoice = (order) => {
    navigate("/invoice", { state: { order } });
  };

  const renderAddress = (title, a = {}) => (
    <div>
      <h4 className="font-semibold text-black">{title}</h4>
      <p className="text-gray-600 text-sm">
        {a.street || "N/A"}, {a.city || "N/A"}, {a.province || "N/A"} <br />
        {a.postalCode || "N/A"}, {a.country || "N/A"}
      </p>
    </div>
  );

  /* ================= UI ================= */
  return (
    <>
      <AdminNavbar />

      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Admin Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-300 rounded-lg shadow p-4"
              >
                {/* USER INFO */}
                <div className="mb-4">
                  <h3 className="font-semibold text-black mb-1">
                    👤 Customer Details
                  </h3>
                  <p className="text-sm text-gray-700">
                    {order.userName || "N/A"} • {order.email || "N/A"} •{" "}
                    {order.phone || "N/A"}
                  </p>
                </div>

                {/* ADDRESSES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {renderAddress("User Address", order.userAddress)}
                  {renderAddress("Shipping Address", order.shippingAddress)}
                  {renderAddress("Billing Address", order.billingAddress)}
                  {renderAddress("Company Address", order.companyAddress)}
                </div>

                {/* ORDER META */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                  <p className="font-semibold text-black">
                    Total: ₹{order.total}
                  </p>

                  <div className="flex gap-3 items-center">
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option>Pending</option>
                      <option>Dispatched</option>
                      <option>In Transit</option>
                      <option>Delivered</option>
                    </select>

                    <select
                      onChange={(e) =>
                        handleAssignDriver(order._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="">Assign Driver</option>
                      {drivers.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ACTIONS */}
                <button
                  onClick={() => handleCreateInvoice(order)}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 mb-4"
                >
                  Create Invoice
                </button>

                {/* ITEMS */}
                <div className="border-t pt-3">
                  <h4 className="font-semibold text-black mb-2">📦 Items</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {order.items.map((item) => (
                      <li key={item.partId}>
                        {item.partName} × {item.quantity} — ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}