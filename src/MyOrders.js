




// import React, { useState, useEffect } from "react";

// function MyOrders() {
//   const [email, setEmail] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [autoRefresh, setAutoRefresh] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch user orders
//   const fetchOrders = async () => {
//     if (!email) return alert("Please enter your email");
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:6003/api/orders?email=${email}`);
//       if (!res.ok) throw new Error("Failed to fetch orders");
//       const data = await res.json();

//       // Filter orders by email again just to be safe
//       const userOrders = data.filter(order => order.email === email);
//       setOrders(userOrders);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch orders");
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-refresh every 10 seconds if enabled
//   useEffect(() => {
//     if (!autoRefresh) return;
//     const interval = setInterval(fetchOrders, 10000);
//     return () => clearInterval(interval);
//   }, [autoRefresh, email]);

//   // Determine progress % based on status
//   const getProgress = (status) => {
//     switch (status) {
//       case "Pending":
//         return 25;
//       case "Dispatched":
//         return 50;
//       case "In Transit":
//         return 75;
//       case "Delivered":
//         return 100;
//       default:
//         return 0;
//     }
//   };

//   // Get color based on status
//   const getColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "#ffb347";
//       case "Dispatched":
//         return "#4da6ff";
//       case "In Transit":
//         return "#ffa500";
//       case "Delivered":
//         return "#2ecc71";
//       default:
//         return "#ccc";
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//       <h2>📦 My Orders</h2>

//       {/* Email Input */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
//         />
//         <button onClick={fetchOrders} style={{ padding: "8px 12px" }}>
//           Fetch Orders
//         </button>

//         {orders.length > 0 && (
//           <label style={{ marginLeft: "20px" }}>
//             <input
//               type="checkbox"
//               checked={autoRefresh}
//               onChange={(e) => setAutoRefresh(e.target.checked)}
//               style={{ marginRight: "5px" }}
//             />
//             Auto-refresh (10s)
//           </label>
//         )}
//       </div>

//       {loading && <p>Loading orders...</p>}
//       {!loading && orders.length === 0 && <p>No orders found for this email.</p>}

//       {/* Orders Display */}
//       {orders.map((order) => (
//         <div
//           key={order._id}
//           style={{
//             border: "1px solid #ddd",
//             padding: "15px",
//             marginBottom: "20px",
//             borderRadius: "10px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//             backgroundColor: "#fff",
//           }}
//         >
//           <h3 style={{ marginBottom: "8px" }}>Order #{order._id}</h3>
//           <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
//           <p><b>Total:</b> ₹{order.total}</p>
//           <p>
//             <b>Status:</b>{" "}
//             <span style={{ color: getColor(order.status || "Pending"), fontWeight: "bold" }}>
//               {order.status || "Pending"}
//             </span>
//           </p>

//           {/* Estimated Delivery */}
//           {order.estimatedDelivery && (
//             <p>
//               <b>Estimated Delivery:</b>{" "}
//               {new Date(order.estimatedDelivery).toLocaleDateString()}
//             </p>
//           )}

//           {/* Progress Bar */}
//           <div
//             style={{
//               background: "#f0f0f0",
//               height: "10px",
//               borderRadius: "5px",
//               overflow: "hidden",
//               margin: "10px 0 15px 0",
//             }}
//           >
//             <div
//               style={{
//                 width: `${getProgress(order.status)}%`,
//                 background: getColor(order.status),
//                 height: "100%",
//                 transition: "width 0.5s ease",
//               }}
//             ></div>
//           </div>

//           {/* Item List */}
//           <p><b>Items:</b></p>
//           <ul style={{ marginLeft: "20px" }}>
//             {order.items.map((item) => (
//               <li key={item.partId}>
//                 {item.partName} — Qty: {item.quantity} — Price: ₹{item.price}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyOrders;

import React, { useState, useEffect } from "react";

function MyOrders() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
   const API = process.env.REACT_APP_API_BASE_URL;
  // 🔴 Fetch orders (with cache)
  const fetchOrders = async () => {
    if (!email) return alert("Please enter your email");

    const cacheKey = `myOrders_${email}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setOrders(JSON.parse(cached));
    }
// https://newb-1.onrender.com
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/api/orders?email=${email}`
      );
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      const userOrders = data.filter(o => o.email === email);

      setOrders(userOrders);
      localStorage.setItem(cacheKey, JSON.stringify(userOrders));
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Auto refresh
  useEffect(() => {
    if (!autoRefresh || !email) return;
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [autoRefresh, email]);

  // 🔴 Progress %
  const getProgress = (status) => {
    switch (status) {
      case "Pending": return 25;
      case "Dispatched": return 50;
      case "In Transit": return 75;
      case "Delivered": return 100;
      default: return 0;
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-400";
      case "Dispatched": return "bg-blue-500";
      case "In Transit": return "bg-orange-500";
      case "Delivered": return "bg-green-600";
      default: return "bg-gray-400";
    }
  };

  const statusText = (status) => {
    switch (status) {
      case "Pending": return "text-yellow-600";
      case "Dispatched": return "text-blue-600";
      case "In Transit": return "text-orange-600";
      case "Delivered": return "text-green-600";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <h2 className="text-2xl font-bold text-black border-b-2 border-red-600 pb-2">
          📦 My Orders
        </h2>

        {/* Email Input */}
        <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:flex-1 px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-black"
          />

          <button
            onClick={fetchOrders}
            className="w-full sm:w-auto bg-black text-white px-5 py-2 rounded hover:bg-gray-900 transition"
          >
            Fetch Orders
          </button>

          {orders.length > 0 && (
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              Auto refresh
            </label>
          )}
        </div>

        {loading && <p className="text-gray-600">Loading orders…</p>}
        {!loading && orders.length === 0 && email && (
          <p className="text-gray-600">No orders found.</p>
        )}

        {/* Orders */}
        <div className="grid gap-4">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h3 className="font-semibold text-black">
                  Order #{order._id.slice(-6)}
                </h3>
                <span className={`font-semibold ${statusText(order.status)}`}>
                  {order.status || "Pending"}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <p className="font-bold text-red-600 mt-2">
                Total: ₹{order.total}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded h-2 mt-3 overflow-hidden">
                <div
                  className={`${statusColor(order.status)} h-full transition-all`}
                  style={{ width: `${getProgress(order.status)}%` }}
                />
              </div>

              {/* Items */}
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
                {order.items.map(item => (
                  <li key={item.partId}>
                    {item.partName} × {item.quantity} — ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default MyOrders;