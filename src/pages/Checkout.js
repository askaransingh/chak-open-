

// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();


//   const [cart, setCart] = useState(() => {
//     const storedUser = JSON.parse(localStorage.getItem("currentUser"));
//     const userCartKey = storedUser ? `cart_${storedUser.email}` : "cart_guest";
//     return JSON.parse(localStorage.getItem(userCartKey)) || [];
//   });

//   const [user, setUser] = useState(null);
//   const [email, setEmail] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🔹 Load user on mount

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (!storedUser) {
//       alert("⚠️ Please log in before placing an order.");
//       navigate("/login");
//       return;
//     }
//     setUser(storedUser);
//     setEmail(storedUser.email);
//   }, [navigate]);

//   // 🔹 Sync cart with localStorage
//   useEffect(() => {
//     if (user) {
//       const userCartKey = `cart_${user.email}`;
//       localStorage.setItem(userCartKey, JSON.stringify(cart));
//     } else {
//       localStorage.setItem("cart_guest", JSON.stringify(cart));
//     }
//   }, [cart, user]);

//   // 🔹 Handle quantity updates
//   const handleQuantityChange = (id, change) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item._id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + change) }
//           : item
//       )
//     );
//   };

//   // 🔹 Remove item
//   const handleRemove = (id) => {
//     setCart((prev) => prev.filter((item) => item._id !== id));
//   };

//   // 🔹 Validate card input
//   const validateCard = () => {
//     const cardRegex = /^\d{16}$/;
//     const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
//     const cvvRegex = /^\d{3,4}$/;

//     if (!email.trim()) return alert("Please enter your email.");
//     if (!cardRegex.test(cardNumber))
//       return alert("Invalid card number. Must be 16 digits.");
//     if (!expiryRegex.test(expiry))
//       return alert("Invalid expiry format (MM/YY).");
//     if (!cvvRegex.test(cvv))
//       return alert("Invalid CVV. Must be 3 or 4 digits.");
//     return true;
//   };

//   const total = cart.reduce(
//     (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
//     0
//   );


//   const handlePlaceOrder = async () => {
//     if (!validateCard()) return;
//     if (!user) {
//       alert("⚠️ You must be logged in to place an order.");
//       navigate("/login");
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         email: user.email,
//         userName: user.name,

//         userAddress: user.address,
//         companyAddress: user.companyAddress,
//         billingAddress: user.billingAddress,
//         shippingAddress: user.shippingAddress,

//         items: cart,
//       };

//       const res = await fetch("http://localhost:6003/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Failed to place order");

//       await res.json();

//       alert("✅ Order placed successfully!");

//       const userCartKey = `cart_${user.email}`;
//       localStorage.removeItem(userCartKey);

//       setCart([]);
//       setCardNumber("");
//       setExpiry("");
//       setCvv("");

//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to place order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return null;

//   if (cart.length === 0) {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <h2>Your cart is empty</h2>
//         <button
//           onClick={() => navigate("/category")}
//           style={{
//             background: "#28a745",
//             color: "#fff",
//             padding: "10px 20px",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//           }}
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//       <h2>Checkout</h2>


//       {cart.map((item) => (
//   <div
//     key={item._id}
//     className="flex justify-between items-center border-b border-gray-300 py-4"
//   >
//     <div className="flex items-center gap-3">
//       <img
//         src={
//           item.images?.[0]
//             ? typeof item.images[0] === "string"
//               ? item.images[0] // base64 or URL
//               : URL.createObjectURL(item.images[0]) // File object
//             : "/placeholder.png"
//         }
//         alt={item.partName}
//         className="w-20 h-20 object-contain border rounded"
//       />
//       <div>
//         <h4 className="font-semibold">{item.partName}</h4>
//         <p>₹{item.price}</p>
//       </div>
//     </div>

//     <div className="flex items-center gap-2">
//       <button onClick={() => handleQuantityChange(item._id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
//       <span>{item.quantity}</span>
//       <button onClick={() => handleQuantityChange(item._id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
//       <button
//         onClick={() => handleRemove(item._id)}
//         className="px-2 py-1 bg-red-600 text-white rounded"
//       >
//         Remove
//       </button>
//     </div>
//   </div>
// ))}

//       <h3 style={{ marginTop: 20 }}>Total: ₹{total.toFixed(2)}</h3>

//       <div style={{ marginTop: 30 }}>
//         <h4>Payment Information</h4>
//         <input
//           type="text"
//           placeholder="Card Number (16 digits)"
//           maxLength={16}
//           value={cardNumber}
//           onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
//           style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
//         />
//         <div style={{ display: "flex", gap: "10px" }}>
//           <input
//             type="text"
//             placeholder="Expiry (MM/YY)"
//             value={expiry}
//             onChange={(e) => setExpiry(e.target.value)}
//             style={{ padding: "8px", flex: 1 }}
//           />
//           <input
//             type="text"
//             placeholder="CVV"
//             maxLength={4}
//             value={cvv}
//             onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
//             style={{ padding: "8px", flex: 1 }}
//           />
//         </div>
//       </div>

//       <button
//         onClick={handlePlaceOrder}
//         disabled={loading}
//         style={{
//           background: "#007bff",
//           color: "#fff",
//           padding: "12px 20px",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           marginTop: 20,
//           width: "100%",
//         }}
//       >
//         {loading ? "Processing..." : "Place Order"}
//       </button>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const key = storedUser ? `cart_${storedUser.email}` : "cart_guest";
    return JSON.parse(localStorage.getItem(key)) || [];
  });

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
   const API = process.env.REACT_APP_API_BASE_URL;
  // Load user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser) {
      alert("⚠️ Please log in before placing an order.");
      navigate("/login");
      return;
    }
    setUser(storedUser);
    setEmail(storedUser.email);
  }, [navigate]);

  // Sync cart with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    } else {
      localStorage.setItem("cart_guest", JSON.stringify(cart));
    }
  }, [cart, user]);

  const handleQuantityChange = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => setCart((prev) => prev.filter((item) => item._id !== id));

  const validateCard = () => {
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3,4}$/;
   
    if (!email.trim()) return alert("Please enter your email.");
    if (!cardRegex.test(cardNumber)) return alert("Invalid card number. Must be 16 digits.");
    if (!expiryRegex.test(expiry)) return alert("Invalid expiry format (MM/YY).");
    if (!cvvRegex.test(cvv)) return alert("Invalid CVV. Must be 3 or 4 digits.");
    return true;
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handlePlaceOrder = async () => {
    if (!validateCard()) return;
    if (!user) {
      alert("⚠️ You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: user.email,
        userName: user.name,
        userAddress: user.address,
        companyAddress: user.companyAddress,
        billingAddress: user.billingAddress,
        shippingAddress: user.shippingAddress,
        items: cart,
      };
// https://newb-1.onrender.com
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to place order");

      await res.json();
      alert("✅ Order placed successfully!");

      const key = user ? `cart_${user.email}` : "cart_guest";
      localStorage.removeItem(key);
      setCart([]);
      setCardNumber("");
      setExpiry("");
      setCvv("");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/category")}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row justify-between items-center border border-gray-300 rounded p-3 bg-white"
          >
            <div className="flex items-center gap-4 w-full md:w-2/3">
             {/* https://newb-1.onrender.com */}
              <img
                src={
                  item.images?.[0]
                    ? typeof item.images[0] === "string"
                      ? item.images[0].startsWith("http")
                        ? item.images[0] // already full URL
                        : `${API}/uploads/${item.images[0]}` // prepend server
                      : URL.createObjectURL(item.images[0]) // File object
                    : "/placeholder.png"
                }
                alt={item.partName}
                className="w-24 h-24 object-contain border rounded"
              />
              <div>
                <h4 className="font-semibold">{item.partName}</h4>
                <p className="text-red-600 font-semibold">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <button
                onClick={() => handleQuantityChange(item._id, -1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item._id, 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                +
              </button>
              <button
                onClick={() => handleRemove(item._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <h3 className="text-xl font-semibold mt-6">Total: ₹{total.toFixed(2)}</h3>

      {/* Payment Info */}
      <div className="mt-6 space-y-3">
        <h4 className="text-lg font-semibold mb-2">Payment Information</h4>
        <input
          type="text"
          placeholder="Card Number (16 digits)"
          maxLength={16}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Expiry (MM/YY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="CVV"
            maxLength={4}
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-900 transition"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}