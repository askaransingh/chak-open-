// // // // src/pages/PartPreview.js
// // // import React, { useEffect, useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";

// // // export default function PartPreview() {
// // //   const { id } = useParams();
// // //   const [part, setPart] = useState(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     fetchPart();
// // //   }, [id]);

// // //   async function fetchPart() {
// // //     const res = await fetch(`http://localhost:6003/api/pickup/parts/${id}`);
// // //     const data = await res.json();
// // //     setPart(data);
// // //   }

// // //   if (!part) return <p>Loading...</p>;

// // //   return (
// // //     <div style={{ padding: 20 }}>
// // //       <button onClick={() => navigate(-1)}>Back</button>
// // //       <h2>{part.partName}</h2>
// // //       <p><strong>Brand:</strong> {part.brand}</p>
// // //       <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
// // //       <p><strong>Part Type:</strong> {part.partType}</p>
// // //       <p><strong>OEM Number:</strong> {part.oemNumber}</p>
// // //       <p><strong>Part Number:</strong> {part.partNumber}</p>
// // //       <p><strong>Price:</strong> {part.price} {part.currency}</p>
// // //       <p><strong>MSRP:</strong> {part.msrp}</p>
// // //       <p><strong>Stock:</strong> {part.stock}</p>
// // //       <p><strong>Year:</strong> {part.year}</p>
// // //       <p><strong>Make:</strong> {part.make}</p>
// // //       <p><strong>Model:</strong> {part.model}</p>
// // //       <p><strong>Description:</strong> {part.description}</p>

// // //       <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
// // //         {part.images?.map((img, idx) => (
// // //           <img
// // //             key={idx}
// // //             src={img.startsWith("http") ? img : `http://localhost:6003/uploads/${img}`}
// // //             alt={`img-${idx}`}
// // //             style={{ width: 200, height: 150, objectFit: "contain", border: "1px solid #ccc" }}
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // src/pages/PartPreview.js
// // // import React, { useEffect, useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";

// // // export default function PartPreview() {
// // //   const { id } = useParams();
// // //   const [part, setPart] = useState(null);
// // //   const navigate = useNavigate();

// // //   const CACHE_KEY = `part_preview_${id}`;

// // //   useEffect(() => {
// // //     loadPart();
// // //   }, [id]);

// // //   async function loadPart() {
// // //     // 1️⃣ Check cache
// // //     const cached = localStorage.getItem(CACHE_KEY);
// // //     if (cached) {
// // //       setPart(JSON.parse(cached));
// // //       return;
// // //     }

// // //     // 2️⃣ Fetch from API if not cached
// // //     try {
// // //       const res = await fetch(`http://localhost:6003/api/pickup/parts/${id}`);
// // //       const data = await res.json();

// // //       setPart(data);

// // //       // 3️⃣ Save to cache
// // //       localStorage.setItem(CACHE_KEY, JSON.stringify(data));
// // //     } catch (err) {
// // //       console.error("Failed to load part", err);
// // //     }
// // //   }

// // //   if (!part) return <p className="p-4">Loading...</p>;

// // //   return (
// // //     <div className="p-5">
// // //       <button
// // //         onClick={() => navigate(-1)}
// // //         className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
// // //       >
// // //         ← Back
// // //       </button>

// // //       <h2 className="text-2xl font-bold mb-2">{part.partName}</h2>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800">
// // //         <p><strong>Brand:</strong> {part.brand}</p>
// // //         <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
// // //         <p><strong>Part Type:</strong> {part.partType}</p>
// // //         <p><strong>OEM Number:</strong> {part.oemNumber}</p>
// // //         <p><strong>Part Number:</strong> {part.partNumber}</p>
// // //         <p><strong>Price:</strong> ₹{part.price} {part.currency}</p>
// // //         <p><strong>MSRP:</strong> {part.msrp}</p>
// // //         <p><strong>Stock:</strong> {part.stock}</p>
// // //         <p><strong>Year:</strong> {part.year}</p>
// // //         <p><strong>Make:</strong> {part.make}</p>
// // //         <p><strong>Model:</strong> {part.model}</p>
// // //       </div>

// // //       <p className="mt-3"><strong>Description:</strong> {part.description}</p>

// // //       <div className="flex gap-3 flex-wrap mt-4">
// // //         {part.images?.map((img, idx) => (
// // //           <img
// // //             key={idx}
// // //             src={img.startsWith("http") ? img : `http://localhost:6003/uploads/${img}`}
// // //             alt={`img-${idx}`}
// // //             className="w-48 h-36 object-contain border rounded"
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/pages/PartPreview.js
// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // export default function PartPreview() {
// //   const { id } = useParams();
// //   const [part, setPart] = useState(null);
// //   const navigate = useNavigate();

// //   const CACHE_KEY = `part_preview_${id}`;

// //   useEffect(() => {
// //     loadPart();
// //   }, [id]);

// //   async function loadPart() {
// //     // 1️⃣ Check cache
// //     const cached = localStorage.getItem(CACHE_KEY);
// //     if (cached) {
// //       setPart(JSON.parse(cached));
// //       return;
// //     }

// //     // 2️⃣ Fetch from API if not cached
// //     try {
// //       const res = await fetch(`http://localhost:6003/api/pickup/parts/${id}`);
// //       const data = await res.json();

// //       setPart(data);

// //       // 3️⃣ Save to cache
// //       localStorage.setItem(CACHE_KEY, JSON.stringify(data));
// //     } catch (err) {
// //       console.error("Failed to load part", err);
// //     }
// //   }

// //   if (!part) return <p className="p-4">Loading...</p>;

// //   return (
// //     <div className="p-5">
// //       <button
// //         onClick={() => navigate(-1)}
// //         className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
// //       >
// //         ← Back
// //       </button>

// //       <h2 className="text-2xl font-bold mb-2">{part.partName}</h2>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800">
// //         <p><strong>Brand:</strong> {part.brand}</p>
// //         <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
// //         <p><strong>Part Type:</strong> {part.partType}</p>
// //         <p><strong>OEM Number:</strong> {part.oemNumber}</p>
// //         <p><strong>Part Number:</strong> {part.partNumber}</p>
// //         <p><strong>Price:</strong> ₹{part.price} {part.currency}</p>
// //         <p><strong>MSRP:</strong> {part.msrp}</p>
// //         <p><strong>Stock:</strong> {part.stock}</p>
// //         <p><strong>Year:</strong> {part.year}</p>
// //         <p><strong>Make:</strong> {part.make}</p>
// //         <p><strong>Model:</strong> {part.model}</p>
// //       </div>

// //       <p className="mt-3"><strong>Description:</strong> {part.description}</p>

// //       <div className="flex gap-3 flex-wrap mt-4">
// //         {part.images?.map((img, idx) => (
// //           <img
// //             key={idx}
// //             src={img.startsWith("http") ? img : `http://localhost:6003/uploads/${img}`}
// //             alt={`img-${idx}`}
// //             className="w-48 h-36 object-contain border rounded"
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/PartPreview.js
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function PartPreview() {
//   const { id } = useParams();
//   const [part, setPart] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPart();
//   }, [id]);

//   async function fetchPart() {
//     const res = await fetch(`http://localhost:6003/api/pickup/parts/${id}`);
//     const data = await res.json();
//     setPart(data);
//   }

//   if (!part) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <button onClick={() => navigate(-1)}>Back</button>
//       <h2>{part.partName}</h2>
//       <p><strong>Brand:</strong> {part.brand}</p>
//       <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
//       <p><strong>Part Type:</strong> {part.partType}</p>
//       <p><strong>OEM Number:</strong> {part.oemNumber}</p>
//       <p><strong>Part Number:</strong> {part.partNumber}</p>
//       <p><strong>Price:</strong> {part.price} {part.currency}</p>
//       <p><strong>MSRP:</strong> {part.msrp}</p>
//       <p><strong>Stock:</strong> {part.stock}</p>
//       <p><strong>Year:</strong> {part.year}</p>
//       <p><strong>Make:</strong> {part.make}</p>
//       <p><strong>Model:</strong> {part.model}</p>
//       <p><strong>Description:</strong> {part.description}</p>

//       <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
//         {part.images?.map((img, idx) => (
//           <img
//             key={idx}
//             src={img.startsWith("http") ? img : `http://localhost:6003/uploads/${img}`}
//             alt={`img-${idx}`}
//             style={{ width: 200, height: 150, objectFit: "contain", border: "1px solid #ccc" }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// } 


// // use cache in this page also 

// // src/pages/PartPreview.js
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function PartPreview() {
//   const { id } = useParams();
//   const [part, setPart] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPart();
//   }, [id]);

//   async function fetchPart() {
//     const res = await fetch(`http://localhost:6003/api/pickup/parts/${id}`);
//     const data = await res.json();
//     setPart(data);
//   }

//   if (!part) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <button onClick={() => navigate(-1)}>Back</button>
//       <h2>{part.partName}</h2>
//       <p><strong>Brand:</strong> {part.brand}</p>
//       <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
//       <p><strong>Part Type:</strong> {part.partType}</p>
//       <p><strong>OEM Number:</strong> {part.oemNumber}</p>
//       <p><strong>Part Number:</strong> {part.partNumber}</p>
//       <p><strong>Price:</strong> {part.price} {part.currency}</p>
//       <p><strong>MSRP:</strong> {part.msrp}</p>
//       <p><strong>Stock:</strong> {part.stock}</p>
//       <p><strong>Year:</strong> {part.year}</p>
//       <p><strong>Make:</strong> {part.make}</p>
//       <p><strong>Model:</strong> {part.model}</p>
//       <p><strong>Description:</strong> {part.description}</p>

//       <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
//         {part.images?.map((img, idx) => (
//           <img
//             key={idx}
//             src={img.startsWith("http") ? img : `http://localhost:6003/uploads/${img}`}
//             alt={`img-${idx}`}
//             style={{ width: 200, height: 150, objectFit: "contain", border: "1px solid #ccc" }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// } 


// use cache in this page also 

// // src/pages/PartPreview.js
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function PartPreview() {
//   const { id } = useParams();
//   const [part, setPart] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPart();
//   }, [id]);

//   async function fetchPart() {
//     const res = await fetch(`http://localhost:6003/api/pickup/parts/${id}`);
//     const data = await res.json();
//     setPart(data);
//   }

//   if (!part) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <button onClick={() => navigate(-1)}>Back</button>
//       <h2>{part.partName}</h2>
//       <p><strong>Brand:</strong> {part.brand}</p>
//       <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
//       <p><strong>Part Type:</strong> {part.partType}</p>
//       <p><strong>OEM Number:</strong> {part.oemNumber}</p>
//       <p><strong>Part Number:</strong> {part.partNumber}</p>
//       <p><strong>Price:</strong> {part.price} {part.currency}</p>
//       <p><strong>MSRP:</strong> {part.msrp}</p>
//       <p><strong>Stock:</strong> {part.stock}</p>
//       <p><strong>Year:</strong> {part.year}</p>
//       <p><strong>Make:</strong> {part.make}</p>
//       <p><strong>Model:</strong> {part.model}</p>
//       <p><strong>Description:</strong> {part.description}</p>

//       <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
//         {part.images?.map((img, idx) => (
//           <img
//             key={idx}
//             src={img.startsWith("http") ? img : `http://localhost:6003/uploads/${img}`}
//             alt={`img-${idx}`}
//             style={{ width: 200, height: 150, objectFit: "contain", border: "1px solid #ccc" }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// } 


// // use cache in this page also 


// src/pages/PartPreview.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PartPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
   const API = process.env.REACT_APP_API_BASE_URL;
  const CACHE_KEY = `pickup_part_${id}`;
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPart();
    // eslint-disable-next-line
  }, [id]);

  async function loadPart() {
    // 1️⃣ Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      setPart(JSON.parse(cached));
      setLoading(false);
      return;
    }
// https://newb-1.onrender.com
    // 2️⃣ Fetch from API
    try {
      const res = await fetch(`${API}/api/pickup/parts/${id}`);
      const data = await res.json();
      setPart(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to load pickup part", err);
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


  function addToCart() {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const key = storedUser ? `cart_${storedUser.email}` : "cart_guest";

    const existingCart = JSON.parse(localStorage.getItem(key)) || [];

    const alreadyExists = existingCart.find(item => item._id === part._id);

    let updatedCart;

    if (alreadyExists) {
      updatedCart = existingCart.map(item =>
        item._id === part._id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
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

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {/* <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900">
              Add to Cart
            </button> */}

            <button
              onClick={addToCart}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
            >
              Add to Cart
            </button>
            {/* <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
              Buy Now
            </button> */}
            <button
              onClick={() => {
                addToCart();
                navigate("/checkout");
              }}
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

