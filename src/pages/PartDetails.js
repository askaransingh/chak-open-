
// // // src/pages/PartDetails.js
// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // export default function PartDetails() {
// //   const { id } = useParams();
// //   const [part, setPart] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetch(`http://localhost:6003/api/parts/${id}`)
// //       .then(res => res.json())
// //       .then(setPart)
// //       .catch(err => console.error("Failed to fetch part", err));
// //   }, [id]);

// //   const handleAddToCart = () => {
// //     const cartItem = { ...part, quantity };
// //     navigate("/checkout", { state: { cart: [cartItem] } });
// //   };

// //   if (!part) return <p style={{ padding: 20 }}>Loading...</p>;

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <button onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
// //         ← Back
// //       </button>

// //       <div style={{ display: "flex", gap: 30 }}>
// //         {/* ✅ FIXED IMAGE */}
// //         <img
// //           src={
// //             part.images?.length > 0
// //               ? `http://localhost:6003/uploads/${part.images[0]}`
// //               : "https://via.placeholder.com/400x300"
// //           }
// //           alt={part.partName}
// //           style={{
// //             width: 400,
// //             height: 300,
// //             objectFit: "contain",
// //             borderRadius: 8,
// //             background: "#f9f9f9",
// //           }}
// //         />

// //         <div>
// //           <h2>{part.partName}</h2>
// //           <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
// //           <p><strong>Part Type:</strong> {part.partType}</p>
// //           <p><strong>Brand:</strong> {part.brand}</p>
// //           <p><strong>OEM Number:</strong> {part.oemNumber}</p>
// //           <p><strong>Part Number:</strong> {part.partNumber}</p>
// //           <p><strong>Price:</strong> {part.price} {part.currency}</p>
// //           <p><strong>MSRP:</strong> {part.msrp}</p>
// //           <p><strong>Stock:</strong> {part.stock}</p>
// //           <p><strong>Description:</strong> {part.description}</p>

// //           {/* Quantity */}
// //           <div style={{ marginTop: 12 }}>
// //             <label>Quantity: </label>
// //             <input
// //               type="number"
// //               value={quantity}
// //               min={1}
// //               max={part.stock}
// //               onChange={(e) => setQuantity(Number(e.target.value))}
// //               style={{ width: 80, padding: 6, marginLeft: 6 }}
// //             />
// //           </div>

// //           <button
// //             onClick={handleAddToCart}
// //             style={{
// //               marginTop: 16,
// //               padding: "10px 20px",
// //               background: "#28a745",
// //               color: "#fff",
// //               border: "none",
// //               borderRadius: 6,
// //               cursor: "pointer",
// //             }}
// //           >
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// // // src/pages/PartDetails.js
// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // export default function PartDetails() {
// //   const { id } = useParams();
// //   const [part, setPart] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetch(`http://localhost:6003/api/parts/${id}`)
// //       .then((res) => res.json())
// //       .then(setPart)
// //       .catch((err) => console.error("Failed to fetch part", err));
// //   }, [id]);

// //   const handleAddToCart = () => {
// //     const cartItem = { ...part, quantity };
// //     navigate("/checkout", { state: { cart: [cartItem] } });
// //   };

// //   if (!part) return <p style={{ padding: 20 }}>Loading...</p>;

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <button onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
// //         ← Back
// //       </button>

// //       <div style={{ display: "flex", gap: 30 }}>
// //         {/* IMAGE */}
// //         <img
// //           src={
// //             part.images?.length > 0
// //               ? `http://localhost:6003/uploads/${part.images[0]}`
// //               : "https://via.placeholder.com/400x300"
// //           }
// //           alt={part.partName}
// //           style={{
// //             width: 400,
// //             height: 300,
// //             objectFit: "contain",
// //             borderRadius: 8,
// //             background: "#f9f9f9",
// //           }}
// //         />

// //         {/* DETAILS */}
// //         <div style={{ maxWidth: 600 }}>
// //           <h2>{part.partName}</h2>

// //           <p><strong>Manufacturer:</strong> {part.manufacturer || "—"}</p>
// //           <p><strong>Brand:</strong> {part.brand || "—"}</p>
// //           <p><strong>Part Type:</strong> {part.partType || "—"}</p>

// //           <hr />

// //           <p><strong>OEM Number:</strong> {part.oemNumber || "—"}</p>
// //           <p><strong>Part Number:</strong> {part.partNumber || "—"}</p>

// //           <hr />

// //           <p>
// //             <strong>Price:</strong>{" "}
// //             {part.price} {part.currency || "INR"}
// //           </p>
// //           <p><strong>MSRP:</strong> {part.msrp || "—"}</p>

// //           <p><strong>Stock Available:</strong> {part.stock ?? "—"}</p>

// //           <hr />

// //           <p><strong>Year:</strong> {part.year || "—"}</p>
// //           <p><strong>Make:</strong> {part.make || "—"}</p>
// //           <p><strong>Model:</strong> {part.model || "—"}</p>

// //           <hr />

// //           <p>
// //             <strong>Description:</strong><br />
// //             {part.description || "No description provided"}
// //           </p>

// //           {/* Quantity */}
// //           <div style={{ marginTop: 12 }}>
// //             <label>Quantity: </label>
// //             <input
// //               type="number"
// //               value={quantity}
// //               min={1}
// //               max={part.stock || 1}
// //               onChange={(e) => setQuantity(Number(e.target.value))}
// //               style={{ width: 80, padding: 6, marginLeft: 6 }}
// //             />
// //           </div>

// //           <button
// //             onClick={handleAddToCart}
// //             style={{
// //               marginTop: 16,
// //               padding: "10px 20px",
// //               background: "#28a745",
// //               color: "#fff",
// //               border: "none",
// //               borderRadius: 6,
// //               cursor: "pointer",
// //             }}
// //           >
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/PartDetails.js
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function PartDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const CACHE_KEY = `part_details_${id}`;

//   const [part, setPart] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadPart();
//     // eslint-disable-next-line
//   }, [id]);

//   async function loadPart() {
//     // 1️⃣ Check cache
//     const cached = localStorage.getItem(CACHE_KEY);
//     if (cached) {
//       setPart(JSON.parse(cached));
//       setLoading(false);
//       return;
//     }

//     // 2️⃣ Fetch from API
//     try {
//       const res = await fetch(`http://localhost:6003/api/parts/${id}`);
//       const data = await res.json();
//       setPart(data);
//       localStorage.setItem(CACHE_KEY, JSON.stringify(data));
//     } catch (err) {
//       console.error("Failed to fetch part", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleAddToCart = () => {
//     const cartItem = { ...part, quantity };
//     navigate("/checkout", { state: { cart: [cartItem] } });
//   };

//   if (loading) {
//     return <p className="p-6 text-center text-gray-600">Loading part details…</p>;
//   }

//   if (!part) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <p className="text-red-600 text-lg font-semibold">Part not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen p-4 md:p-6">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//       >
//         ← Back
//       </button>

//       <div className="bg-white rounded-lg shadow p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* IMAGE SECTION */}
//         <div>
//           <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded">
//             <img
//               src={
//                 part.images?.[0]
//                   ? `http://localhost:6003/uploads/${part.images[0]}`
//                   : "https://via.placeholder.com/400"
//               }
//               alt={part.partName}
//               className="max-h-full max-w-full object-contain"
//             />
//           </div>

//           {part.images?.length > 1 && (
//             <div className="flex gap-2 mt-3 flex-wrap">
//               {part.images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={`http://localhost:6003/uploads/${img}`}
//                   alt={`img-${idx}`}
//                   className="w-24 h-20 object-contain border rounded hover:shadow cursor-pointer"
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* DETAILS SECTION */}
//         <div>
//           <h2 className="text-2xl font-bold mb-2">{part.partName}</h2>
//           <p className="text-gray-600 mb-2">{part.brand || "—"}</p>

//           <p className="text-2xl font-semibold text-red-600 mb-3">
//             ₹{part.price} {part.currency || "INR"}
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-800 text-sm">
//             <p><strong>Manufacturer:</strong> {part.manufacturer || "—"}</p>
//             <p><strong>Part Type:</strong> {part.partType || "—"}</p>
//             <p><strong>OEM Number:</strong> {part.oemNumber || "—"}</p>
//             <p><strong>Part Number:</strong> {part.partNumber || "—"}</p>
//             <p><strong>MSRP:</strong> ₹{part.msrp || "—"}</p>
//             <p><strong>Stock:</strong> {part.stock ?? "—"}</p>
//             <p><strong>Year:</strong> {part.year || "—"}</p>
//             <p><strong>Make:</strong> {part.make || "—"}</p>
//             <p><strong>Model:</strong> {part.model || "—"}</p>
//           </div>

//           {part.description && (
//             <p className="mt-3 text-gray-700 text-sm">
//               <strong>Description:</strong> {part.description}
//             </p>
//           )}

//           {/* QUANTITY */}
//           <div className="mt-4 flex items-center gap-3">
//             <label className="font-semibold">Quantity:</label>
//             <input
//               type="number"
//               min={1}
//               max={part.stock || 1}
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               className="w-20 p-2 border rounded"
//             />
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={handleAddToCart}
//               className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
//             >
//               Add to Cart
//             </button>
//             <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function PartDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const CACHE_KEY = `part_detail_${id}`;

  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
   const API = process.env.REACT_APP_API_BASE_URL;
  // const [cart, setCart] = useState(() => {
  //   if (location.state?.cart) return location.state.cart;
  //   const user = JSON.parse(localStorage.getItem("currentUser"));
  //   const key = user ? `cart_${user.email}` : "cart_guest";
  //   return JSON.parse(localStorage.getItem(key)) || [];
  // });
  const [cart, setCart] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const key = storedUser ? `cart_${storedUser.email}` : "cart_guest";
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const key = user ? `cart_${user.email}` : "cart_guest";
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    loadPart();
    // eslint-disable-next-line
  }, [id]);

  async function loadPart() {
    // 1️⃣ cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      setPart(JSON.parse(cached));
      setLoading(false);
      return;
    }
// https://newb-1.onrender.com
    // 2️⃣ API
    try {
      const res = await fetch(`${API}/api/parts/${id}`);
      const data = await res.json();
      setPart(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to load part", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = () => {
    const existing = cart.find((i) => i._id === part._id);

    let updated;
    if (existing) {
      updated = cart.map((i) =>
        i._id === part._id
          ? { ...i, quantity: i.quantity + quantity }
          : i
      );
    } else {
      updated = [...cart, { ...part, quantity }];
    }

    setCart(updated);
  };

  if (loading) {
    return <p className="p-6 text-center text-gray-600">Loading part…</p>;
  }

  if (!part) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 font-semibold">Part not found</p>
      </div>
    );
  }

  const alreadyInCart = cart.some((i) => i._id === part._id);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IMAGE */}
        <div>
          <div className="h-64 bg-gray-100 flex items-center justify-center rounded">
            <img
              src={
                part.images?.[0]
                  ? `${API}/uploads/${part.images[0]}`
                  : "https://via.placeholder.com/400"
              }
              alt={part.partName}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {part.images?.length > 1 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {part.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`${API}/uploads/${img}`}
                  alt=""
                  className="w-24 h-20 object-contain border rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div>
          <h2 className="text-2xl font-bold">{part.partName}</h2>
          <p className="text-gray-600 mb-2">{part.brand}</p>

          <p className="text-2xl font-semibold text-red-600 mb-4">
            ${part.price} {part.currency}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
            <p><strong>Part Type:</strong> {part.partType}</p>
            <p><strong>OEM Number:</strong> {part.oemNumber}</p>
            <p><strong>Part Number:</strong> {part.partNumber}</p>
            <p><strong>Stock:</strong> {part.stock}</p>
            <p><strong>Year:</strong> {part.year}</p>
            <p><strong>Make:</strong> {part.make}</p>
            <p><strong>Model:</strong> {part.model}</p>
          </div>

          {part.description && (
            <p className="mt-3 text-gray-700 text-sm">
              <strong>Description:</strong> {part.description}
            </p>
          )}

          {/* Quantity */}
          <div className="mt-4 flex items-center gap-3">
            <label className="font-semibold">Qty:</label>
            <input
              type="number"
              min={1}
              max={part.stock || 1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 p-2 border rounded"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3 flex-col sm:flex-row">
            <button
              disabled={alreadyInCart}
              onClick={handleAddToCart}
              className={`px-6 py-2 rounded ${alreadyInCart
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
                }`}
            >
              {alreadyInCart ? "Added to Cart" : "Add to Cart"}
            </button>

            <button
              onClick={() => navigate("/checkout", { state: { cart } })}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}