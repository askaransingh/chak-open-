
// import React, { useEffect, useState } from "react";

// function DriverDashboard() {
//   const [orders, setOrders] = useState([]);
//   const driver = JSON.parse(localStorage.getItem("driver"));

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:6003/api/drivers/orders/${driver._id}`
//       );
//       const data = await res.json();
//       setOrders(data);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     }
//   };

//   useEffect(() => {
//     if (driver) fetchOrders();
//   }, []);

//   const handleProofUpload = async (orderId, file) => {
//     const formData = new FormData();
//     formData.append("proof", file);

//     await fetch(
//       `http://localhost:6003/api/drivers/upload-proof/${orderId}`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     alert("✅ Proof uploaded! Order marked as Delivered.");
//     fetchOrders();
//   };

//   const activeOrders = orders.filter(o => o.status === "In Transit");
//   const deliveredOrders = orders.filter(o => o.status === "Delivered");

//   const handleDeliver = async (orderId, file) => {
//   const fd = new FormData();
//   fd.append("proof", file);

//   await fetch(
//     `http://localhost:6003/api/drivers/deliver/${orderId}`,
//     { method: "POST", body: fd }
//   );

//   alert("Order Delivered");
//   fetchOrders();
// };


//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Welcome, {driver?.name}</h2>
//       <h3>Your Assigned Orders</h3>

//       {orders.length === 0 ? (
//         <p>No assigned orders yet.</p>
//       ) : (
//         orders.map((order) => (
//           <div
//             key={order._id}
//             style={{
//               border: "1px solid #ccc",
//               marginBottom: "10px",
//               padding: "15px",
//               borderRadius: "8px",
//               background: "#f9f9f9",
//             }}
//           >
//             {/* ✅ Customer Details */}
//             <p><b>Customer Name:</b> {order.userName}</p>
//             <p><b>Customer Email:</b> {order.email}</p>
//             <p><b>Customer Phone:</b> {order.phone}</p>

//             {/* ✅ Shipping Address */}
//             <h4>Shipping Address</h4>
//             <p>
//               {order.shippingAddress?.street},{" "}
//               {order.shippingAddress?.city},{" "}
//               {order.shippingAddress?.province},{" "}
//               {order.shippingAddress?.postalCode},{" "}
//               {order.shippingAddress?.country}
//             </p>

//             <p><b>Status:</b> {order.status}</p>
//             <p><b>Total:</b> ₹{order.total}</p>

//             <h4>Items:</h4>
//             <ul>
//               {order.items.map((i) => (
//                 <li key={i.partId}>
//                   {i.partName} (x{i.quantity}) – ₹{i.price}
//                 </li>
//               ))}
//             </ul>

//             {order.deliveryProof ? (
//               <p style={{ color: "green" }}>✅ Delivered</p>
//             ) : (
//               <>
//                 <label>Upload Proof of Delivery: </label>
//                 <input
//                   type="file"
//                   onChange={(e) =>
//                     handleProofUpload(order._id, e.target.files[0])
//                   }
//                 />
//               </>
//             )}
//           </div>
//         ))
//       )}


//       <h3>Stats</h3>
//       <p>🚚 Active: {activeOrders.length}</p>
//       <p>✅ Delivered: {deliveredOrders.length}</p>

//       {activeOrders.map(order => (
//         <div key={order._id}>
//           <p>{order.userName}</p>

//           <input
//             type="file"
//             onChange={e =>
//               handleDeliver(order._id, e.target.files[0])
//             }
//           />

//           <button>📦 Mark Delivered</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DriverDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function DriverDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [driver, setDriver] = useState(() => {
    const saved = localStorage.getItem("driver");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
   const API = process.env.REACT_APP_API_BASE_URL;
  // ✅ Fetch orders for driver
  const fetchOrders = async () => {
    if (!driver) return;
    setLoading(true);
    try {
      // https://newb-1.onrender.com
      const res = await fetch(
        `${API}/api/drivers/orders/${driver._id}`
      );
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      // Cache orders
      localStorage.setItem(`orders_${driver._id}`, JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching orders:", err);
      // Load cached orders if available
      const cached = localStorage.getItem(`orders_${driver._id}`);
      if (cached) setOrders(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [driver]);

  // ✅ Handle proof upload
  const handleProofUpload = async (orderId, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("proof", file);

    try {
      await fetch(`${API}/api/drivers/upload-proof/${orderId}`, {
        method: "POST",
        body: formData,
      });
      alert("✅ Proof uploaded! Order marked as Delivered.");
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  const activeOrders = orders.filter((o) => o.status === "In Transit");
  const deliveredOrders = orders.filter((o) => o.status === "Delivered");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Welcome, {driver?.name || "Driver"}
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">🚚 Active Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : activeOrders.length === 0 ? (
          <p>No active orders assigned.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {activeOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <p><b>Customer:</b> {order.userName}</p>
                <p><b>Email:</b> {order.email}</p>
                <p><b>Phone:</b> {order.phone}</p>

                <h4 className="font-semibold mt-2">Shipping Address</h4>
                <p className="text-gray-700 text-sm">
                  {order.shippingAddress?.street}, {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.province}, {order.shippingAddress?.postalCode},{" "}
                  {order.shippingAddress?.country}
                </p>

                <p className="mt-2"><b>Status:</b> <span className="text-red-600">{order.status}</span></p>
                <p><b>Total:</b> ₹{order.total}</p>

                <h4 className="font-semibold mt-2">Items:</h4>
                <ul className="list-disc ml-5">
                  {order.items.map((i) => (
                    <li key={i.partId}>
                      {i.partName} × {i.quantity} — ₹{i.price}
                    </li>
                  ))}
                </ul>

                {!order.deliveryProof && (
                  <div className="mt-3">
                    <label className="block mb-1 font-semibold text-gray-700">Upload Proof</label>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleProofUpload(order._id, e.target.files[0])
                      }
                      className="block w-full text-sm text-gray-700 file:bg-red-600 file:text-white file:px-3 file:py-1 file:rounded hover:file:bg-red-700"
                    />
                  </div>
                )}

                {order.deliveryProof && (
                  <p className="text-green-600 font-semibold mt-2">✅ Delivered</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-black">📊 Stats</h2>
        <div className="flex gap-6 flex-wrap">
          <div className="bg-white p-4 rounded shadow w-48">
            <p className="text-gray-700 font-semibold">Active Orders</p>
            <p className="text-red-600 text-xl font-bold">{activeOrders.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow w-48">
            <p className="text-gray-700 font-semibold">Delivered Orders</p>
            <p className="text-black text-xl font-bold">{deliveredOrders.length}</p>
          </div>
        </div>
      </section>
      <button
        onClick={() => navigate("/DriverOrderHistory")}
        className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 transition mb-4"
      >
        📜 View Order History
      </button>
    </div>
  );
}