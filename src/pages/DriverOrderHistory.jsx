// src/pages/DriverOrdersHistory.jsx
import React, { useEffect, useState } from "react";

export default function DriverOrdersHistory() {
  const [orders, setOrders] = useState([]);
  const driver = JSON.parse(localStorage.getItem("driver"));
   const API = process.env.REACT_APP_API_BASE_URL;
  const fetchOrders = async () => {
    if (!driver) return;
// https://newb-1.onrender.com
    try {
      const res = await fetch(
        `${API}/api/drivers/orders/history/${driver._id}`
      );
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching driver orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [driver]);

  const renderAddress = (address) => {
    if (!address) return "-";
    return `${address.street || "-"}, ${address.city || "-"}, ${address.province || "-"}, ${address.postalCode || "-"}, ${address.country || "-"}`;
  };

  const handleUploadProof = async (orderId, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("proof", file);

    try {
      const res = await fetch(
        `${API}/api/drivers/deliver/${orderId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      alert(data.message || "Proof uploaded successfully");
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to upload proof");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders assigned yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 15,
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>👤 Customer Info</h3>
            <p><b>Name:</b> {order.userName || "N/A"}</p>
            <p><b>Email:</b> {order.email || "N/A"}</p>
            <p><b>Phone:</b> {order.phone || "N/A"}</p>

            <h4>📍 Shipping Address</h4>
            <p>{renderAddress(order.shippingAddress)}</p>

            <h4>📦 Order Items</h4>
            <ul>
              {order.items.map((item, idx) => (
                <li key={`${item.partId}-${idx}`}>
                  {item.partName} (x{item.quantity}) – ₹{item.price}
                </li>
              ))}
            </ul>

            <p><b>Total:</b> ₹{order.total}</p>
            <p><b>Status:</b> {order.status}</p>

            {order.deliveryProof ? (
              <p style={{ color: "green" }}>✅ Delivered</p>
            ) : (
              <div>
                <label>Upload Proof of Delivery: </label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleUploadProof(order._id, e.target.files[0])
                  }
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}