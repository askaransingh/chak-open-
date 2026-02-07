// // import React, { useState, useEffect } from "react";
// // import "./Profile.css";

// // function Profile() {
// //     const [user, setUser] = useState(null);
// //     const [orders, setOrders] = useState([]);
// //     const [loading, setLoading] = useState(false);

// //     // ✅ Load user from localStorage
// //     // useEffect(() => {
// //     //     const savedUser = localStorage.getItem("signupStep1");
// //     //     if (savedUser) {
// //     //         setUser(JSON.parse(savedUser));
// //     //     }
// //     // }, []);
// //     // useEffect(() => {
// //     //     const savedUser = localStorage.getItem("currentUser");
// //     //     if (savedUser) {
// //     //         setUser(JSON.parse(savedUser));
// //     //     }
// //     // }, []);
// //     useEffect(() => {
// //         const savedUser = localStorage.getItem("currentUser");
// //         if (savedUser) {
// //             setUser(JSON.parse(savedUser));
// //         }
// //     }, []);

// //     if (!user) {
// //         return (
// //             <div className="profile-container">
// //                 <p>Loading profile...</p>
// //             </div>
// //         );
// //     }


// //     // ✅ Fetch user's orders
// //     const fetchOrders = async () => {
// //         if (!user?.email) return;
// //         setLoading(true);
// //         try {
// //             const res = await fetch(`http://localhost:6003/api/orders?email=${user.email}`);
// //             if (!res.ok) throw new Error("Failed to fetch orders");
// //             const data = await res.json();
// //             setOrders(data);
// //         } catch (err) {
// //             console.error(err);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         if (user?.email) fetchOrders();
// //     }, [user]);

// //     // ✅ Separate orders by status
// //     const deliveredOrders = orders.filter(o => o.status === "Delivered");
// //     const inProgressOrders = orders.filter(
// //         o => o.status !== "Delivered" && o.status !== "Cancelled"
// //     );

// //     // ✅ Status color helper
// //     const getColor = (status) => {
// //         switch (status) {
// //             case "Pending":
// //                 return "#ffb347";
// //             case "Dispatched":
// //                 return "#4da6ff";
// //             case "In Transit":
// //                 return "#ffa500";
// //             case "Delivered":
// //                 return "#2ecc71";
// //             default:
// //                 return "#ccc";
// //         }
// //     };

// //     return (
// //         <div className="profile-container">
// //             <h2>👤 My Profile</h2>


// //             <>
// //                 {/* User Info */}
// //                 <div className="profile-card">
// //                     <h3>{user.name}</h3>
// //                     <p><b>Email:</b> {user.email}</p>
// //                     {/* {user.address && (
// //               <p><b>Address:</b> {user.address}</p>
// //             )} */}
// //                     {user.address && (
// //                         <p>
// //                             <b>Address:</b>{" "}
// //                             {`${user.address.street}, ${user.address.city}, ${user.address.province}, ${user.address.postalCode}, ${user.address.country}`}
// //                         </p>
// //                     )}
// //                 </div>

// //                 {loading && <p>Loading your orders...</p>}

// //                 {/* In Progress Orders */}
// //                 <div className="orders-section">
// //                     <h3>🚚 Orders In Progress</h3>
// //                     {inProgressOrders.length === 0 ? (
// //                         <p>No active orders right now.</p>
// //                     ) : (
// //                         inProgressOrders.map((order) => (
// //                             <div key={order._id} className="order-card in-progress">
// //                                 <div className="order-header">
// //                                     <strong>Order #{order._id}</strong>
// //                                     <span style={{ color: getColor(order.status) }}>{order.status}</span>
// //                                 </div>
// //                                 <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
// //                                 <p><b>Total:</b> ₹{order.total}</p>
// //                                 <ul>
// //                                     {order.items.map((item) => (
// //                                         <li key={item.partId}>
// //                                             {item.partName} × {item.quantity} — ₹{item.price}
// //                                         </li>
// //                                     ))}
// //                                 </ul>
// //                             </div>
// //                         ))
// //                     )}
// //                 </div>

// //                 {/* Delivered Orders */}
// //                 <div className="orders-section">
// //                     <h3>✅ Delivered Orders</h3>
// //                     {deliveredOrders.length === 0 ? (
// //                         <p>No delivered orders yet.</p>
// //                     ) : (
// //                         deliveredOrders.map((order) => (
// //                             <div key={order._id} className="order-card delivered">
// //                                 <div className="order-header">
// //                                     <strong>Order #{order._id}</strong>
// //                                     <span style={{ color: getColor(order.status) }}>{order.status}</span>
// //                                 </div>
// //                                 <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
// //                                 <p><b>Total:</b> ₹{order.total}</p>
// //                                 <ul>
// //                                     {order.items.map((item) => (
// //                                         <li key={item.partId}>
// //                                             {item.partName} × {item.quantity} — ₹{item.price}
// //                                         </li>
// //                                     ))}
// //                                 </ul>
// //                             </div>
// //                         ))
// //                     )}
// //                 </div>
// //             </>



// //         </div>
// //     );
// // }

// // export default Profile;

// import React, { useState, useEffect } from "react";
// import "./Profile.css";

// function Profile() {
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Load logged-in user
//   useEffect(() => {
//     const savedUser = localStorage.getItem("currentUser");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   // ✅ Fetch user's orders
//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `http://localhost:6003/api/orders?email=${user.email}`
//         );
//         if (!res.ok) throw new Error("Failed to fetch orders");
//         const data = await res.json();
//         setOrders(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user]);

//   // ✅ SAFE early return AFTER all hooks
//   if (!user) {
//     return (
//       <div className="profile-container">
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   // ✅ Order separation
//   const deliveredOrders = orders.filter((o) => o.status === "Delivered");
//   const inProgressOrders = orders.filter(
//     (o) => o.status !== "Delivered" && o.status !== "Cancelled"
//   );

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
//     <div className="profile-container">
//       <h2>👤 My Profile</h2>

//       {/* User Info */}
//       <div className="profile-card">
//         <h3>{user.name}</h3>
//         <p><b>Email:</b> {user.email}</p>

//         {user.address && (
//           <p>
//             <b>Address:</b>{" "}
//             {`${user.address.street}, ${user.address.city}, ${user.address.province},
//             ${user.address.postalCode}, ${user.address.country}`}
//           </p>
//         )}
//       </div>

//       {loading && <p>Loading your orders...</p>}

//       {/* In Progress Orders */}
//       <div className="orders-section">
//         <h3>🚚 Orders In Progress</h3>
//         {inProgressOrders.length === 0 ? (
//           <p>No active orders right now.</p>
//         ) : (
//           inProgressOrders.map((order) => (
//             <div key={order._id} className="order-card in-progress">
//               <div className="order-header">
//                 <strong>Order #{order._id}</strong>
//                 <span style={{ color: getColor(order.status) }}>
//                   {order.status}
//                 </span>
//               </div>
//               <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
//               <p><b>Total:</b> ₹{order.total}</p>
//               <ul>
//                 {order.items.map((item) => (
//                   <li key={item.partId}>
//                     {item.partName} × {item.quantity} — ₹{item.price}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Delivered Orders */}
//       <div className="orders-section">
//         <h3>✅ Delivered Orders</h3>
//         {deliveredOrders.length === 0 ? (
//           <p>No delivered orders yet.</p>
//         ) : (
//           deliveredOrders.map((order) => (
//             <div key={order._id} className="order-card delivered">
//               <div className="order-header">
//                 <strong>Order #{order._id}</strong>
//                 <span style={{ color: getColor(order.status) }}>
//                   {order.status}
//                 </span>
//               </div>
//               <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
//               <p><b>Total:</b> ₹{order.total}</p>
//               <ul>
//                 {order.items.map((item) => (
//                   <li key={item.partId}>
//                     {item.partName} × {item.quantity} — ₹{item.price}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;

import React, { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const API = process.env.REACT_APP_API_BASE_URL;
  // 🔴 Load logged-in user
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 🔴 Load cached orders + fetch fresh
  useEffect(() => {
    if (!user?.email) return;

    const cacheKey = `orders_${user.email}`;
    const cachedOrders = localStorage.getItem(cacheKey);

    if (cachedOrders) {
      setOrders(JSON.parse(cachedOrders));
    }
// https://newb-1.onrender.com
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API}/api/orders?email=${user.email}`
        );
        const data = await res.json();
        setOrders(data);
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg">Loading profile...</p>
      </div>
    );
  }

  const deliveredOrders = orders.filter(o => o.status === "Delivered");
  const activeOrders = orders.filter(
    o => o.status !== "Delivered" && o.status !== "Cancelled"
  );

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Dispatched":
        return "text-blue-500";
      case "In Transit":
        return "text-orange-500";
      case "Delivered":
        return "text-green-600";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <h2 className="text-2xl font-bold text-black border-b-2 border-red-600 pb-2">
          👤 My Profile
        </h2>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
          <h3 className="text-xl font-semibold text-black">{user.name}</h3>
          <p className="text-gray-600 mt-1">{user.email}</p>

          {user.address && (
            <p className="text-gray-700 mt-3 text-sm">
              <span className="font-semibold text-black">Address:</span>{" "}
              {`${user.address.street}, ${user.address.city},
              ${user.address.province}, ${user.address.postalCode},
              ${user.address.country}`}
            </p>
          )}
        </div>

        {/* Active Orders */}
        <section>
          <h3 className="text-xl font-semibold text-black mb-3">
            🚚 Orders In Progress
          </h3>

          {loading && <p className="text-gray-500">Updating orders…</p>}

          {activeOrders.length === 0 ? (
            <p className="text-gray-600">No active orders.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeOrders.map(order => (
                <div
                  key={order._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-black">
                      #{order._id.slice(-6)}
                    </span>
                    <span className={`text-sm font-semibold ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <p className="mt-2 font-bold text-red-600">
                    ₹{order.total}
                  </p>

                  <ul className="mt-2 text-sm text-gray-700 list-disc pl-4">
                    {order.items.map(item => (
                      <li key={item.partId}>
                        {item.partName} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Delivered Orders */}
        <section>
          <h3 className="text-xl font-semibold text-black mb-3">
            ✅ Delivered Orders
          </h3>

          {deliveredOrders.length === 0 ? (
            <p className="text-gray-600">No delivered orders yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deliveredOrders.map(order => (
                <div
                  key={order._id}
                  className="bg-gray-50 border border-gray-300 rounded-lg p-4"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-black">
                      #{order._id.slice(-6)}
                    </span>
                    <span className="text-green-600 font-semibold">
                      Delivered
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <p className="mt-2 font-bold text-black">
                    ₹{order.total}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default Profile;