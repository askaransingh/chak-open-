// src/pages/DriverOrders.js
import React, { useState, useEffect } from "react";

function DriverOrders({ driverId }) {
  const [orders, setOrders] = useState([]);
   const API = process.env.REACT_APP_API_BASE_URL;
  // useEffect(() => {
  //   fetch(`http://localhost:6003/api/drivers/${driverId}/orders`)
  //     .then((res) => res.json())
  //     .then(setOrders);
  // }, [driverId]);

  const uploadProof = async (orderId, file) => {
    const formData = new FormData();
    formData.append("proof", file);
    await fetch(`${API}/api/drivers/${orderId}/proof`, {
      method: "POST",
      body: formData,
    });
    alert("Proof uploaded!");
  };
  
  useEffect(() => {
  if (!driverId) return;

  const cached = localStorage.getItem(`orders_${driverId}`);
  if (cached) {
    setOrders(JSON.parse(cached));
  }
// https://newb-1.onrender.com
  const getOrders = async () => {
    try {
      const res = await fetch(`${API}/api/drivers/${driverId}/orders`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      localStorage.setItem(`orders_${driverId}`, JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
  getOrders();
}, [driverId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <p><b>User:</b> {order.userName}</p>
          <p><b>Status:</b> {order.status}</p>
          {order.deliveryProof ? (
            <p>✅ Proof uploaded</p>
          ) : (
            <>
              <input type="file" onChange={(e) => uploadProof(order._id, e.target.files[0])} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default DriverOrders;