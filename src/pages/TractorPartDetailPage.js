// // // // src/pages/TractorPartDetailPage.js
// // // import React from "react";
// // // import { useLocation, useNavigate } from "react-router-dom";

// // // export default function TractorPartDetailPage() {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const { part } = location.state || {};

// // //   if (!part) {
// // //     return (
// // //       <div className="flex justify-center items-center min-h-screen">
// // //         <p>Part not found.</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="p-4 bg-gray-50 min-h-screen">
// // //       <button
// // //         onClick={() => navigate(-1)}
// // //         className="bg-black text-white px-4 py-2 rounded mb-4"
// // //       >
// // //         Back
// // //       </button>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //         <div className="w-full h-80 bg-gray-200 flex justify-center items-center">
// // //           <img
// // //             src={
// // //               part.images?.[0]
// // //                 ? `http://localhost:6003/uploads/${part.images[0]}`
// // //                 : "https://via.placeholder.com/400"
// // //             }
// // //             alt={part.partName}
// // //             className="max-w-full max-h-full object-contain"
// // //           />
// // //         </div>
// // //         <div className="flex flex-col justify-between">
// // //           <div>
// // //             <h1 className="text-red-600 font-bold text-3xl">{part.partName}</h1>
// // //             <p className="text-gray-700 mt-2">{part.brand}</p>
// // //             <p className="text-red-600 font-semibold mt-2">
// // //               ₹{part.price} {part.currency}
// // //             </p>
// // //             <p className="text-gray-800 mt-4">{part.description}</p>
// // //           </div>

// // //           <div className="mt-4 flex gap-2 flex-wrap">
// // //             <button className="bg-black text-white px-4 py-2 rounded">
// // //               Add to Cart
// // //             </button>
// // //             <button className="bg-red-600 text-white px-4 py-2 rounded">
// // //               Buy Now
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
// // //         {part.images?.slice(1).map((img, idx) => (
// // //           <div key={idx} className="h-32 bg-gray-200 flex justify-center items-center">
// // //             <img
// // //               src={`http://localhost:6003/uploads/${img}`}
// // //               alt={`${part.partName}-${idx}`}
// // //               className="max-w-full max-h-full object-contain"
// // //             />
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // src/pages/TractorPartDetailPage.js
// // import React from "react";
// // import { useLocation, useNavigate } from "react-router-dom";

// // export default function TractorPartDetailPage() {
// //   const { state } = useLocation();
// //   const navigate = useNavigate();
// //   const part = state?.part;

// //   if (!part) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen bg-gray-100">
// //         <p className="text-red-600 text-lg">Part not found</p>
// //       </div>
// //     );
// //   }

// //   const Field = ({ label, value }) =>
// //     value ? (
// //       <div className="border-b border-gray-300 py-2">
// //         <span className="text-gray-500">{label}:</span>
// //         <span className="ml-2 font-semibold text-black">{value}</span>
// //       </div>
// //     ) : null;

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
// //       <button
// //         onClick={() => navigate(-1)}
// //         className="mb-4 bg-black text-white px-4 py-2 rounded"
// //       >
// //         ← Back
// //       </button>

// //       <div className="bg-white rounded shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
// //         {/* Images */}
// //         <div>
// //           <div className="h-80 bg-gray-200 flex items-center justify-center rounded">
// //             <img
// //               src={
// //                 part.images?.[0]
// //                   ? `http://localhost:6003/uploads/${part.images[0]}`
// //                   : "https://via.placeholder.com/500"
// //               }
// //               alt={part.partName}
// //               className="max-h-full object-contain"
// //             />
// //           </div>

// //           <div className="grid grid-cols-4 gap-2 mt-4">
// //             {part.images?.slice(1).map((img, i) => (
// //               <img
// //                 key={i}
// //                 src={`http://localhost:6003/uploads/${img}`}
// //                 alt=""
// //                 className="h-20 object-contain bg-gray-200 rounded"
// //               />
// //             ))}
// //           </div>
// //         </div>

// //         {/* Details */}
// //         <div>
// //           <h1 className="text-3xl font-bold text-red-600 mb-4">
// //             {part.partName}
// //           </h1>

// //           <Field label="Brand" value={part.brand} />
// //           <Field label="Manufacturer" value={part.manufacturer} />
// //           <Field label="Part Type" value={part.partType} />
// //           <Field label="OEM Number" value={part.oemNumber} />
// //           <Field label="Part Number" value={part.partNumber} />
// //           <Field label="Year" value={part.year} />
// //           <Field label="Make" value={part.make} />
// //           <Field label="Model" value={part.model} />
// //           <Field label="Stock" value={part.stock} />
// //           <Field label="MSRP" value={`₹${part.msrp}`} />

// //           <div className="mt-4 text-xl font-semibold text-black">
// //             Price: ₹{part.price} {part.currency}
// //           </div>

// //           {part.description && (
// //             <div className="mt-4 text-gray-700">
// //               <strong>Description:</strong>
// //               <p className="mt-1">{part.description}</p>
// //             </div>
// //           )}

// //           <div className="mt-6 flex gap-4">
// //             <button className="bg-black text-white px-6 py-2 rounded">
// //               Add to Cart
// //             </button>
// //             <button className="bg-red-600 text-white px-6 py-2 rounded">
// //               Buy Now
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // src/pages/TractorPartDetailPage.js
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

// export default function TractorPartDetailPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const CACHE_KEY = `tractor_part_${id}`;
//   const [part, setPart] = useState(state?.part || null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadPart();
//     // eslint-disable-next-line
//   }, [id]);

//   async function loadPart() {
//     // 1️⃣ If already in state (from navigation)
//     if (state?.part) {
//       setPart(state.part);
//       localStorage.setItem(CACHE_KEY, JSON.stringify(state.part));
//       setLoading(false);
//       return;
//     }

//     // 2️⃣ Check cache
//     const cached = localStorage.getItem(CACHE_KEY);
//     if (cached) {
//       setPart(JSON.parse(cached));
//       setLoading(false);
//       return;
//     }

//     // 3️⃣ Fetch from API
//     try {
//       const res = await fetch(`http://localhost:6003/api/tractor/parts/${id}`);
//       const data = await res.json();
//       setPart(data);
//       localStorage.setItem(CACHE_KEY, JSON.stringify(data));
//     } catch (err) {
//       console.error("Failed to load tractor part", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return <p className="p-4 text-gray-600">Loading...</p>;
//   }

//   if (!part) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <p className="text-red-600 text-lg">Part not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-5">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//       >
//         ← Back
//       </button>

//       {/* Title */}
//       <h2 className="text-2xl font-bold mb-2">{part.partName}</h2>

//       {/* Details Grid (same as PartPreview) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800">
//         <p><strong>Brand:</strong> {part.brand}</p>
//         <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
//         <p><strong>Part Type:</strong> {part.partType}</p>
//         <p><strong>OEM Number:</strong> {part.oemNumber}</p>
//         <p><strong>Part Number:</strong> {part.partNumber}</p>
//         <p><strong>Price:</strong> ₹{part.price} {part.currency}</p>
//         <p><strong>MSRP:</strong> ₹{part.msrp}</p>
//         <p><strong>Stock:</strong> {part.stock}</p>
//         <p><strong>Year:</strong> {part.year}</p>
//         <p><strong>Make:</strong> {part.make}</p>
//         <p><strong>Model:</strong> {part.model}</p>
//       </div>

//       {/* Description */}
//       {part.description && (
//         <p className="mt-3">
//           <strong>Description:</strong> {part.description}
//         </p>
//       )}

//       {/* Images (same style as PartPreview) */}
//       <div className="flex gap-3 flex-wrap mt-4">
//         {part.images?.map((img, idx) => (
//           <img
//             key={idx}
//             src={img.startsWith("http") ? img : `http://localhost:6003/uploads/${img}`}
//             alt={`img-${idx}`}
//             className="w-48 h-36 object-contain border rounded"
//           />
//         ))}
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-6 flex flex-col sm:flex-row gap-3">
//         <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900">
//           Add to Cart
//         </button>
//         <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// }

// good design remember this design now : 

// // src/pages/PartPreview.js
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function PartPreview() {
//   const { id } = useParams();
//   const [part, setPart] = useState(null);
//   const navigate = useNavigate();

//   const CACHE_KEY = `part_preview_${id}`;

//   useEffect(() => {
//     loadPart();
//   }, [id]);

//   async function loadPart() {
//     // 1️⃣ Check cache
//     const cached = localStorage.getItem(CACHE_KEY);
//     if (cached) {
//       setPart(JSON.parse(cached));
//       return;
//     }

//     // 2️⃣ Fetch from API if not cached
//     try {
//       const res = await fetch(`http://localhost:6003/api/pickup/parts/${id}`);
//       const data = await res.json();

//       setPart(data);

//       // 3️⃣ Save to cache
//       localStorage.setItem(CACHE_KEY, JSON.stringify(data));
//     } catch (err) {
//       console.error("Failed to load part", err);
//     }
//   }

//   if (!part) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="p-5">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//       >
//         ← Back
//       </button>

//       <h2 className="text-2xl font-bold mb-2">{part.partName}</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800">
//         <p><strong>Brand:</strong> {part.brand}</p>
//         <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
//         <p><strong>Part Type:</strong> {part.partType}</p>
//         <p><strong>OEM Number:</strong> {part.oemNumber}</p>
//         <p><strong>Part Number:</strong> {part.partNumber}</p>
//         <p><strong>Price:</strong> ₹{part.price} {part.currency}</p>
//         <p><strong>MSRP:</strong> {part.msrp}</p>
//         <p><strong>Stock:</strong> {part.stock}</p>
//         <p><strong>Year:</strong> {part.year}</p>
//         <p><strong>Make:</strong> {part.make}</p>
//         <p><strong>Model:</strong> {part.model}</p>
//       </div>

//       <p className="mt-3"><strong>Description:</strong> {part.description}</p>

//       <div className="flex gap-3 flex-wrap mt-4">
//         {part.images?.map((img, idx) => (
//           <img
//             key={idx}
//             src={img.startsWith("http") ? img : `http://localhost:6003/uploads/${img}`}
//             alt={`img-${idx}`}
//             className="w-48 h-36 object-contain border rounded"
//           />
//         ))}
//       </div>
//     </div>
//   );
// } 

// src/pages/TractorPartDetailPage.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function TractorPartDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const CACHE_KEY = `tractor_part_${id}`;
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    loadPart();
    // eslint-disable-next-line
  }, [id]);

  async function loadPart() {
    // 1️⃣ From navigation state
    if (state?.part) {
      setPart(state.part);
      localStorage.setItem(CACHE_KEY, JSON.stringify(state.part));
      setLoading(false);
      return;
    }

    // 2️⃣ From cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      setPart(JSON.parse(cached));
      setLoading(false);
      return;
    }
// https://newb-1.onrender.com
    // 3️⃣ From API
    try {
      const res = await fetch(`${API}/api/tractor/parts/${id}`);
      const data = await res.json();
      setPart(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to load tractor part", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="p-6 text-center text-gray-600">Loading part details…</p>;
  }

  if (!part) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-lg font-semibold">Part not found</p>
      </div>
    );
  }

  function handleAddToCart() {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const key = storedUser ? `cart_${storedUser.email}` : "cart_guest";

    const existingCart = JSON.parse(localStorage.getItem(key)) || [];

    const existingItem = existingCart.find((i) => i._id === part._id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((i) =>
        i._id === part._id
          ? { ...i, quantity: (i.quantity || 1) + 1 }
          : i
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...part,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(key, JSON.stringify(updatedCart));

    alert("✅ Added to cart");
  }

  function handleBuyNow() {
    handleAddToCart();
    navigate("/checkout");
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Images */}
        <div>
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded">
            <img
              src={
                part.images?.[0]
                  ? part.images[0].startsWith("http")
                    ? part.images[0]
                    : `${API}/uploads/${part.images[0]}`
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
                  src={img.startsWith("http") ? img : `${API}/uploads/${img}`}
                  alt={`img-${idx}`}
                  className="w-24 h-20 object-contain border rounded hover:shadow cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{part.partName}</h2>
          <p className="text-gray-600 mb-2">{part.brand}</p>

          <p className="text-2xl font-semibold text-red-600 mb-3">
            ${part.price} {part.currency}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-800 text-sm">
            <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
            <p><strong>Part Type:</strong> {part.partType}</p>
            <p><strong>OEM Number:</strong> {part.oemNumber}</p>
            <p><strong>Part Number:</strong> {part.partNumber}</p>
            <p><strong>MSRP:</strong> ${part.msrp}</p>
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

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {/* <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900">
              Add to Cart
            </button> */}

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Buy Now
            </button>


          </div>
        </div>
      </div>
    </div>
  );
}

