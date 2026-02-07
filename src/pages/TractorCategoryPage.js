
// // // src/pages/CategoryPage.js
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function CategoryPage() {
// //   const [categories, setCategories] = useState([]);
// //   const [selectedCat, setSelectedCat] = useState(null);
// //   const [parts, setParts] = useState([]);
// //   const [filteredParts, setFilteredParts] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [vin, setVin] = useState("");
// //   const [vinData, setVinData] = useState(null);
// //   const [loadingParts, setLoadingParts] = useState(false);
// //   const [cart, setCart] = useState(() => {
// //     const saved = localStorage.getItem("cart");
// //     return saved ? JSON.parse(saved) : [];
// //   });
// //   const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 50;
// //   const navigate = useNavigate();

// //   // Fetch categories on load
// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   // Fetch parts when category changes
// //   useEffect(() => {
// //     if (selectedCat) fetchPartsForCategory(selectedCat);
// //   }, [selectedCat]);

// //   // Store cart in localStorage
// //   useEffect(() => {
// //     localStorage.setItem("cart", JSON.stringify(cart));
// //   }, [cart]);

// //   async function fetchCategories() {
// //     try {
// //       const res = await fetch("http://localhost:6003/api/tractor-categories");
// //       const data = await res.json();
// //       setCategories(data);
// //       if (data.length) setSelectedCat(data[0]);
// //     } catch (err) {
// //       console.error("Failed loading categories", err);
// //     }
// //   }

// //   async function fetchPartsForCategory(category, searchText = "") {
// //     setLoadingParts(true);
// //     try {
// //       const q = new URLSearchParams();
// //       q.set("category", category._id);
// //       if (searchText) q.set("search", searchText);
// //       // const res = await fetch(`http://localhost:6003/api/parts?${q.toString()}`);
// //       const res = await fetch(`http://localhost:6003/api/tractor-parts?${q.toString()}`);
// //       const data = await res.json();
// //       setParts(data);
// //       setFilteredParts(data);
// //     } catch (err) {
// //       console.error("Failed loading parts", err);
// //     } finally {
// //       setLoadingParts(false);
// //     }
// //   }

// //   const handleVinDecode = async () => {
// //     if (!vin) return alert("Enter VIN");
// //     try {
// //       const res = await fetch(`http://localhost:6003/decode-vin/${vin}`);
// //       const json = await res.json();
// //       setVinData(json.vinData || json);
// //       if (json.relevantParts) {
// //         setParts(json.relevantParts);
// //         setFilteredParts(json.relevantParts);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("VIN decode failed");
// //     }
// //   };

// //   function handleAddToCart(part) {
// //     const existing = cart.find((i) => i._id === part._id);
// //     let updated;
// //     if (existing) {
// //       updated = cart.map((i) =>
// //         i._id === part._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
// //       );
// //     } else {
// //       updated = [...cart, { ...part, quantity: 1 }];
// //     }
// //     setCart(updated);
// //     alert(`${part.partName} added to cart`);
// //   }

// //   function handleGoToCheckout() {
// //     navigate("/checkout", { state: { cart } });
// //   }

// //   // Apply price filter
// //   function applyPriceFilter() {
// //     const min = parseFloat(priceFilter.min) || 0;
// //     const max = parseFloat(priceFilter.max) || Infinity;
// //     const filtered = parts.filter(
// //       (p) => p.price >= min && p.price <= max
// //     );
// //     setFilteredParts(filtered);
// //     setCurrentPage(1);
// //   }

// //   // Pagination logic
// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const paginatedParts = filteredParts.slice(
// //     startIndex,
// //     startIndex + itemsPerPage
// //   );
// //   const totalPages = Math.ceil(filteredParts.length / itemsPerPage);

// //   return (
// //     <div style={{ display: "flex", height: "100%" }}>
// //       {/* Sidebar */}
// //       <aside
// //         style={{
// //           width: 260,
// //           borderRight: "1px solid #eee",
// //           padding: 16,
// //           height: "100vh",
// //           overflowY: "auto",
// //         }}
// //       >
// //         <h3>Categories</h3>
// //         <ul style={{ listStyle: "none", padding: 0 }}>
// //           {categories.map((cat) => (
// //             <li
// //               key={cat._id}
// //               style={{
// //                 padding: "8px 6px",
// //                 cursor: "pointer",
// //                 background:
// //                   selectedCat?._id === cat._id ? "#f0f8ff" : "transparent",
// //                 borderRadius: 6,
// //                 marginBottom: 6,
// //               }}
// //               onClick={() => setSelectedCat(cat)}
// //             >
// //               {cat.name}
// //             </li>
// //           ))}
// //         </ul>
// //       </aside>

// //       {/* Main */}
// //       <main style={{ flex: 1, padding: 20, position: "relative" }}>
// //         {/* Top bar with search + checkout */}
// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             marginBottom: 20,
// //           }}
// //         >
// //           <div style={{ flex: 1, textAlign: "center" }}>
// //             <input
// //               placeholder="Search parts..."
// //               value={search}
// //               onChange={(e) => {
// //                 setSearch(e.target.value);
// //                 fetchPartsForCategory(selectedCat, e.target.value);
// //               }}
// //               style={{
// //                 padding: 10,
// //                 width: "60%",
// //                 border: "1px solid #ccc",
// //                 borderRadius: 6,
// //               }}
// //             />
// //           </div>

// //           <button
// //             onClick={handleGoToCheckout}
// //             style={{
// //               background: "#ff8c00",
// //               color: "#fff",
// //               border: "none",
// //               padding: "10px 20px",
// //               borderRadius: 6,
// //               cursor: "pointer",
// //               fontSize: 16,
// //             }}
// //           >
// //             Go to Checkout ({cart.length})
// //           </button>
// //         </div>

// //         {/* VIN + Price filter */}
// //         <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
// //           <div style={{ flex: 1 }}>
// //             <input
// //               placeholder="Enter VIN to decode"
// //               value={vin}
// //               onChange={(e) => setVin(e.target.value)}
// //               style={{ padding: 8, width: "60%", marginRight: 8 }}
// //             />
// //             <button onClick={handleVinDecode} style={{ padding: "8px 12px" }}>
// //               Decode VIN
// //             </button>

// //             {vinData && (
// //               <div
// //                 style={{
// //                   marginTop: 12,
// //                   background: "#fafafa",
// //                   padding: 8,
// //                   borderRadius: 6,
// //                 }}
// //               >
// //                 <strong>VIN Data:</strong>
// //                 <pre
// //                   style={{ whiteSpace: "pre-wrap", fontSize: 12 }}
// //                 >{JSON.stringify(vinData, null, 2)}</pre>
// //               </div>
// //             )}
// //           </div>

// //           {/* Price filter */}
// //           <div style={{ minWidth: 300 }}>
// //             <h4>Filter by Price</h4>
// //             <div style={{ display: "flex", gap: 8 }}>
// //               <input
// //                 type="number"
// //                 placeholder="Min"
// //                 value={priceFilter.min}
// //                 onChange={(e) =>
// //                   setPriceFilter({ ...priceFilter, min: e.target.value })
// //                 }
// //                 style={{ padding: 6, width: "45%" }}
// //               />
// //               <input
// //                 type="number"
// //                 placeholder="Max"
// //                 value={priceFilter.max}
// //                 onChange={(e) =>
// //                   setPriceFilter({ ...priceFilter, max: e.target.value })
// //                 }
// //                 style={{ padding: 6, width: "45%" }}
// //               />
// //               <button
// //                 onClick={applyPriceFilter}
// //                 style={{
// //                   background: "#007bff",
// //                   color: "#fff",
// //                   border: "none",
// //                   padding: "6px 12px",
// //                   borderRadius: 6,
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 Apply
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <hr style={{ margin: "16px 0" }} />

// //         {loadingParts ? (
// //           <p>Loading parts…</p>
// //         ) : (
// //           <>
// //             <div
// //               style={{
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
// //                 gap: 18,
// //               }}
// //             >
// //               {paginatedParts.map((p) => (
// //                 <div
// //                   key={p._id}
// //                   style={{
// //                     border: "1px solid #eee",
// //                     borderRadius: 8,
// //                     overflow: "hidden",
// //                     background: "#fff",
// //                     display: "flex",
// //                     flexDirection: "column",
// //                   }}
// //                 >
// //                   {/* Image */}
// //                   <div
// //                     style={{
// //                       width: "100%",
// //                       height: 180,
// //                       background: "#f9f9f9",
// //                       display: "flex",
// //                       justifyContent: "center",
// //                       alignItems: "center",
// //                     }}
// //                   >
// //                     {/* <img
// //                       src={p.images?.[0] || "https://via.placeholder.com/400x300"}
// //                       alt={p.partName}
// //                       style={{
// //                         maxWidth: "100%",
// //                         maxHeight: "100%",
// //                         objectFit: "contain",
// //                       }}
// //                     /> */}
// //                     <img
// //                       src={
// //                         p.images?.[0]
// //                           ? `http://localhost:6003/uploads/${p.images[0]}`
// //                           : "https://via.placeholder.com/400x300"
// //                       }
// //                       alt={p.partName}
// //                     />
// //                   </div>

// //                   {/* Details */}
// //                   <div style={{ padding: 12, flexGrow: 1 }}>
// //                     <h4>{p.partName}</h4>
// //                     <p><strong>Brand:</strong> {p.brand}</p>
// //                     <p><strong>Price:</strong> {p.price} {p.currency}</p>
// //                   </div>

// //                   {/* Buttons */}
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                       gap: 8,
// //                       padding: "10px",
// //                     }}
// //                   >
// //                     <button
// //                       onClick={() => navigate(`/part/${p._id}`)}
// //                       style={{
// //                         background: "#007bff",
// //                         color: "#fff",
// //                         border: "none",
// //                         padding: "8px 12px",
// //                         borderRadius: 6,
// //                         cursor: "pointer",
// //                         flex: 1,
// //                       }}
// //                     >
// //                       View Details
// //                     </button>

// //                     <button
// //                       onClick={() => handleAddToCart(p)}
// //                       style={{
// //                         background: "#28a745",
// //                         color: "#fff",
// //                         border: "none",
// //                         padding: "8px 12px",
// //                         borderRadius: 6,
// //                         cursor: "pointer",
// //                         flex: 1,
// //                       }}
// //                     >
// //                       Add to Cart
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Pagination */}
// //             {totalPages > 1 && (
// //               <div style={{ textAlign: "center", marginTop: 20 }}>
// //                 <button
// //                   disabled={currentPage === 1}
// //                   onClick={() => setCurrentPage(currentPage - 1)}
// //                   style={{ marginRight: 10 }}
// //                 >
// //                   Prev
// //                 </button>
// //                 <span>
// //                   Page {currentPage} of {totalPages}
// //                 </span>
// //                 <button
// //                   disabled={currentPage === totalPages}
// //                   onClick={() => setCurrentPage(currentPage + 1)}
// //                   style={{ marginLeft: 10 }}
// //                 >
// //                   Next
// //                 </button>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }


// // // // src/pages/CategoryPage.js
// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // export default function CategoryPage() {
// // //   const [categories, setCategories] = useState([]);
// // //   const [selectedCat, setSelectedCat] = useState(null);
// // //   const [parts, setParts] = useState([]);
// // //   const [filteredParts, setFilteredParts] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [vin, setVin] = useState("");
// // //   const [vinData, setVinData] = useState(null);
// // //   const [loadingParts, setLoadingParts] = useState(false);
// // //   const [cart, setCart] = useState(() => {
// // //     const saved = localStorage.getItem("cart");
// // //     return saved ? JSON.parse(saved) : [];
// // //   });
// // //   const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
// // //   const [currentPage, setCurrentPage] = useState(1);

// // //   const itemsPerPage = 50;
// // //   const navigate = useNavigate();

// // //   /* ===================== EFFECTS ===================== */

// // //   useEffect(() => {
// // //     fetchCategories();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (selectedCat) fetchPartsForCategory(selectedCat);
// // //   }, [selectedCat]);

// // //   useEffect(() => {
// // //     localStorage.setItem("cart", JSON.stringify(cart));
// // //   }, [cart]);

// // //   /* ===================== API CALLS ===================== */

// // //   async function fetchCategories() {
// // //     try {
// // //       const res = await fetch("http://localhost:6003/api/tractor-categories");
// // //       const data = await res.json();
// // //       setCategories(Array.isArray(data) ? data : []);
// // //       if (Array.isArray(data) && data.length) setSelectedCat(data[0]);
// // //     } catch (err) {
// // //       console.error("Failed loading categories", err);
// // //     }
// // //   }

// // //   async function fetchPartsForCategory(category, searchText = "") {
// // //     setLoadingParts(true);
// // //     try {
// // //       const q = new URLSearchParams();
// // //       q.set("category", category._id);
// // //       if (searchText) q.set("search", searchText);

// // //       const res = await fetch(
// // //         `http://localhost:6003/api/tractor-parts?${q.toString()}`
// // //       );

// // //       const data = await res.json();

// // //       const safeArray = Array.isArray(data) ? data : [];
// // //       setParts(safeArray);
// // //       setFilteredParts(safeArray);
// // //       setCurrentPage(1);
// // //     } catch (err) {
// // //       console.error("Failed loading parts", err);
// // //       setParts([]);
// // //       setFilteredParts([]);
// // //     } finally {
// // //       setLoadingParts(false);
// // //     }
// // //   }

// // //   async function handleVinDecode() {
// // //     if (!vin) return alert("Enter VIN");
// // //     try {
// // //       const res = await fetch(`http://localhost:6003/decode-vin/${vin}`);
// // //       const json = await res.json();

// // //       setVinData(json.vinData || json);

// // //       const safeParts = Array.isArray(json.relevantParts)
// // //         ? json.relevantParts
// // //         : [];

// // //       setParts(safeParts);
// // //       setFilteredParts(safeParts);
// // //       setCurrentPage(1);
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("VIN decode failed");
// // //     }
// // //   }

// // //   /* ===================== CART ===================== */

// // //   function handleAddToCart(part) {
// // //     const existing = cart.find((i) => i._id === part._id);
// // //     const updated = existing
// // //       ? cart.map((i) =>
// // //           i._id === part._id
// // //             ? { ...i, quantity: (i.quantity || 1) + 1 }
// // //             : i
// // //         )
// // //       : [...cart, { ...part, quantity: 1 }];

// // //     setCart(updated);
// // //     alert(`${part.partName} added to cart`);
// // //   }

// // //   function handleGoToCheckout() {
// // //     navigate("/checkout", { state: { cart } });
// // //   }

// // //   /* ===================== FILTER ===================== */

// // //   function applyPriceFilter() {
// // //     const min = parseFloat(priceFilter.min) || 0;
// // //     const max = parseFloat(priceFilter.max) || Infinity;

// // //     const filtered = parts.filter(
// // //       (p) => Number(p.price) >= min && Number(p.price) <= max
// // //     );

// // //     setFilteredParts(filtered);
// // //     setCurrentPage(1);
// // //   }

// // //   /* ===================== PAGINATION ===================== */

// // //   const safeFiltered = Array.isArray(filteredParts) ? filteredParts : [];

// // //   const startIndex = (currentPage - 1) * itemsPerPage;
// // //   const paginatedParts = safeFiltered.slice(
// // //     startIndex,
// // //     startIndex + itemsPerPage
// // //   );

// // //   const totalPages = Math.ceil(safeFiltered.length / itemsPerPage);

// // //   /* ===================== UI ===================== */

// // //   return (
// // //     <div style={{ display: "flex", height: "100%" }}>
// // //       {/* Sidebar */}
// // //       <aside style={{ width: 260, borderRight: "1px solid #eee", padding: 16 }}>
// // //         <h3>Categories</h3>
// // //         <ul style={{ listStyle: "none", padding: 0 }}>
// // //           {categories.map((cat) => (
// // //             <li
// // //               key={cat._id}
// // //               onClick={() => setSelectedCat(cat)}
// // //               style={{
// // //                 padding: 8,
// // //                 cursor: "pointer",
// // //                 background:
// // //                   selectedCat?._id === cat._id ? "#f0f8ff" : "transparent",
// // //                 borderRadius: 6,
// // //                 marginBottom: 6,
// // //               }}
// // //             >
// // //               {cat.name}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       </aside>

// // //       {/* Main */}
// // //       <main style={{ flex: 1, padding: 20 }}>
// // //         <div style={{ display: "flex", justifyContent: "space-between" }}>
// // //           <input
// // //             placeholder="Search parts..."
// // //             value={search}
// // //             onChange={(e) => {
// // //               setSearch(e.target.value);
// // //               fetchPartsForCategory(selectedCat, e.target.value);
// // //             }}
// // //             style={{ width: "60%", padding: 10 }}
// // //           />

// // //           <button onClick={handleGoToCheckout}>
// // //             Checkout ({cart.length})
// // //           </button>
// // //         </div>

// // //         <hr />

// // //         {loadingParts ? (
// // //           <p>Loading parts...</p>
// // //         ) : paginatedParts.length === 0 ? (
// // //           <p>No parts found.</p>
// // //         ) : (
// // //           <div
// // //             style={{
// // //               display: "grid",
// // //               gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
// // //               gap: 16,
// // //             }}
// // //           >
// // //             {paginatedParts.map((p) => (
// // //               <div key={p._id} style={{ border: "1px solid #eee", padding: 12 }}>
// // //                 <img
// // //                   src={
// // //                     p.images?.[0]
// // //                       ? `http://localhost:6003/uploads/${p.images[0]}`
// // //                       : "https://via.placeholder.com/300"
// // //                   }
// // //                   alt={p.partName}
// // //                   style={{ width: "100%", height: 160, objectFit: "contain" }}
// // //                 />
// // //                 <h4>{p.partName}</h4>
// // //                 <p>{p.brand}</p>
// // //                 <p>
// // //                   {p.price} {p.currency}
// // //                 </p>
// // //                 <button onClick={() => handleAddToCart(p)}>
// // //                   Add to Cart
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {totalPages > 1 && (
// // //           <div style={{ marginTop: 20, textAlign: "center" }}>
// // //             <button
// // //               disabled={currentPage === 1}
// // //               onClick={() => setCurrentPage((p) => p - 1)}
// // //             >
// // //               Prev
// // //             </button>
// // //             <span style={{ margin: "0 10px" }}>
// // //               Page {currentPage} of {totalPages}
// // //             </span>
// // //             <button
// // //               disabled={currentPage === totalPages}
// // //               onClick={() => setCurrentPage((p) => p + 1)}
// // //             >
// // //               Next
// // //             </button>
// // //           </div>
// // //         )}
// // //       </main>
// // //     </div>
// // //   );
// // // }


// // src/pages/TractorCategoryPage.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function TractorCategoryPage() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCat, setSelectedCat] = useState(null);
//   const [parts, setParts] = useState([]);
//   const [filteredParts, setFilteredParts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loadingParts, setLoadingParts] = useState(false);
//   const [cart, setCart] = useState(() => {
//     const saved = localStorage.getItem("cart");
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 50;

//   const navigate = useNavigate();

//   // ✅ Caching parts so we don't fetch again if already loaded
//   const cachedPartsKey = "tractor_parts_cache";

//   useEffect(() => {
//     const cached = localStorage.getItem(cachedPartsKey);
//     if (cached) {
//       const parsed = JSON.parse(cached);
//       setCategories(parsed.categories || []);
//       setParts(parsed.parts || []);
//       setFilteredParts(parsed.parts || []);
//       if (parsed.categories?.length) setSelectedCat(parsed.categories[0]);
//     } else {
//       fetchCategories();
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedCat) {
//       const filtered = parts.filter((p) => p.category === selectedCat._id || p.category?._id === selectedCat._id);
//       setFilteredParts(filtered);
//       setCurrentPage(1);
//     }
//   }, [selectedCat, parts]);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);


//   useEffect(() => {
//   const term = search.toLowerCase().trim();

//   if (!term) {
//     // If search empty → just show category-filtered parts
//     if (selectedCat) {
//       const filtered = parts.filter(
//         (p) =>
//           p.category === selectedCat._id ||
//           p.category?._id === selectedCat._id
//       );
//       setFilteredParts(filtered);
//     } else {
//       setFilteredParts(parts);
//     }
//     return;
//   }

//   const filtered = parts.filter((p) => {
//     return (
//       p.partName?.toLowerCase().includes(term) ||
//       p.manufacturer?.toLowerCase().includes(term) ||
//       p.partType?.toLowerCase().includes(term) ||
//       p.brand?.toLowerCase().includes(term) ||
//       p.oemNumber?.toLowerCase().includes(term) ||
//       p.partNumber?.toLowerCase().includes(term) ||
//       String(p.msrp || "").includes(term) ||
//       p.year?.toLowerCase().includes(term) ||
//       p.make?.toLowerCase().includes(term) ||
//       p.model?.toLowerCase().includes(term) ||
//       p.description?.toLowerCase().includes(term)
//     );
//   });

//   setFilteredParts(filtered);
//   setCurrentPage(1);
// }, [search, selectedCat, parts]);

//   async function fetchCategories() {
//     setLoadingParts(true);
//     try {
//       const res = await fetch("http://localhost:6003/api/tractor-categories");
//       const data = await res.json();
//       setCategories(data);

//       // Fetch parts only once
//       const partsRes = await fetch("http://localhost:6003/api/tractor-parts");
//       const partsData = await partsRes.json();
//       setParts(partsData);
//       setFilteredParts(partsData);

//       if (data.length) setSelectedCat(data[0]);

//       // Save to localStorage cache
//       localStorage.setItem(
//         cachedPartsKey,
//         JSON.stringify({ categories: data, parts: partsData })
//       );
//     } catch (err) {
//       console.error("Failed loading categories or parts", err);
//     } finally {
//       setLoadingParts(false);
//     }
//   }

//   function handleAddToCart(part) {
//     const existing = cart.find((i) => i._id === part._id);
//     const updated = existing
//       ? cart.map((i) =>
//           i._id === part._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
//         )
//       : [...cart, { ...part, quantity: 1 }];
//     setCart(updated);
//   }

//   function handleGoToCheckout() {
//     navigate("/checkout", { state: { cart } });
//   }

//   function applyPriceFilter() {
//     const min = parseFloat(priceFilter.min) || 0;
//     const max = parseFloat(priceFilter.max) || Infinity;
//     const filtered = parts.filter(
//       (p) => Number(p.price) >= min && Number(p.price) <= max
//     );
//     setFilteredParts(filtered);
//     setCurrentPage(1);
//   }

//   // Pagination
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedParts = filteredParts.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );
//   const totalPages = Math.ceil(filteredParts.length / itemsPerPage);



//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-full md:w-64 bg-gray-100 p-4">
//         <h3 className="text-red-600 font-bold text-xl mb-4">Categories</h3>
//         <ul className="space-y-2">
//           {categories.map((cat) => (
//             <li
//               key={cat._id}
//               className={`p-2 rounded cursor-pointer ${
//                 selectedCat?._id === cat._id ? "bg-red-100" : ""
//               }`}
//               onClick={() => setSelectedCat(cat)}
//             >
//               {cat.name}
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-4 bg-gray-50">
//         {/* Top bar */}
//         <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">
//           <input
//             placeholder="Search parts..."
//             value={search}
//             // onChange={(e) => setSearch(e.target.value)}
//             onChange={(e) => setSearch(e.target.value)}
//             className="p-2 border border-gray-400 rounded w-full md:w-1/2"
//           />
//           <button
//             onClick={handleGoToCheckout}
//             className="bg-red-600 text-white px-4 py-2 rounded mt-2 md:mt-0"
//           >
//             Checkout ({cart.length})
//           </button>
//         </div>

//         {/* Price filter */}
//         <div className="flex gap-2 mb-4 flex-wrap items-center">
//           <input
//             type="number"
//             placeholder="Min Price"
//             value={priceFilter.min}
//             onChange={(e) =>
//               setPriceFilter({ ...priceFilter, min: e.target.value })
//             }
//             className="p-2 border border-gray-400 rounded w-24"
//           />
//           <input
//             type="number"
//             placeholder="Max Price"
//             value={priceFilter.max}
//             onChange={(e) =>
//               setPriceFilter({ ...priceFilter, max: e.target.value })
//             }
//             className="p-2 border border-gray-400 rounded w-24"
//           />
//           <button
//             onClick={applyPriceFilter}
//             className="bg-black text-white px-4 py-2 rounded"
//           >
//             Apply
//           </button>
//         </div>

//         {loadingParts ? (
//           <p className="text-gray-700">Loading parts…</p>
//         ) : paginatedParts.length === 0 ? (
//           <p className="text-gray-700">No parts found.</p>
//         ) : (
//           <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {paginatedParts.map((p) => (
//               <div
//                 key={p._id}
//                 className="border border-gray-300 rounded p-2 bg-white flex flex-col"
//               >
//                 <div className="w-full h-40 flex justify-center items-center bg-gray-200">
//                   <img
//                     src={
//                       p.images?.[0]
//                         ? `http://localhost:6003/uploads/${p.images[0]}`
//                         : "https://via.placeholder.com/300"
//                     }
//                     alt={p.partName}
//                     className="max-w-full max-h-full object-contain"
//                   />
//                 </div>
//                 <div className="flex-1 mt-2">
//                   <h4 className="font-bold text-lg">{p.partName}</h4>
//                   <p className="text-gray-700">{p.brand}</p>
//                   <p className="text-red-600 font-semibold">
//                     ₹{p.price} {p.currency}
//                   </p>
//                 </div>
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() => navigate(`/tractor-part/${p._id}`, { state: { part: p } })}
//                     className="flex-1 bg-black text-white rounded py-1"
//                   >
//                     View Details
//                   </button>
//                   <button
//                     onClick={() => handleAddToCart(p)}
//                     className="flex-1 bg-red-600 text-white rounded py-1"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-4 mt-4">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => p - 1)}
//               className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <span className="text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((p) => p + 1)}
//               className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// src/pages/TractorCategoryPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TractorCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingParts, setLoadingParts] = useState(false);

  const [cart, setCart] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const key = storedUser ? `cart_${storedUser.email}` : "cart_guest";
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const CACHE_KEY = "tractor_parts_cache";
  const API = process.env.REACT_APP_API_BASE_URL;
  // Load cached data
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      setCategories(parsed.categories || []);
      setParts(parsed.parts || []);
      setFilteredParts(parsed.parts || []);
      if (parsed.categories?.length) setSelectedCat(parsed.categories[0]);
    } else {
      fetchCategoriesAndParts();
    }
  }, []);
  // https://newb-1.onrender.com
  //   async function fetchCategoriesAndParts() {
  //     setLoadingParts(true);
  //     try {
  //       const catRes = await fetch("https://newb-1.onrender.com/api/tractor-categories");
  //       // const categoriesData = await catRes.json();
  // const categoriesJson = await catRes.json();
  // const categoriesData = Array.isArray(categoriesJson)
  //   ? categoriesJson
  //   : categoriesJson.categories || categoriesJson.data || [];

  // setCategories(categoriesData);
  //       const partsRes = await fetch("https://newb-1.onrender.com/api/tractor-parts");
  //       const partsData = await partsRes.json();

  //       // setCategories(categoriesData);
  //       setParts(partsData);
  //       setFilteredParts(partsData);
  //       if (categoriesData.length) setSelectedCat(categoriesData[0]);

  //       localStorage.setItem(
  //         CACHE_KEY,
  //         JSON.stringify({ categories: categoriesData, parts: partsData })
  //       );
  //     } catch (err) {
  //       console.error("Failed loading categories or parts", err);
  //     } finally {
  //       setLoadingParts(false);
  //     }
  //   }

  async function fetchCategoriesAndParts() {
    setLoadingParts(true);
    try {
      const catRes = await fetch(`${API}/api/tractor-categories`);
      const catJson = await catRes.json();

      const categoriesData = Array.isArray(catJson)
        ? catJson
        : catJson.categories || catJson.data || [];

      const partsRes = await fetch(`${API}/api/tractor-parts`);
      const partsJson = await partsRes.json();

      const partsData = Array.isArray(partsJson)
        ? partsJson
        : partsJson.parts || partsJson.data || [];

      setCategories(categoriesData);
      setParts(partsData);
      setFilteredParts(partsData);

      if (categoriesData.length) setSelectedCat(categoriesData[0]);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ categories: categoriesData, parts: partsData })
      );
    } catch (err) {
      console.error("Failed loading categories or parts", err);
    } finally {
      setLoadingParts(false);
    }
  }

  // Filter parts by category or search
  useEffect(() => {
    if (!selectedCat) return;
    let data = parts.filter((p) => p.category === selectedCat._id || p.category?._id === selectedCat._id);
    const term = search.toLowerCase().trim();
    if (term) {
      data = data.filter(
        (p) =>
          p.partName?.toLowerCase().includes(term) ||
          p.manufacturer?.toLowerCase().includes(term) ||
          p.partType?.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term) ||
          p.oemNumber?.toLowerCase().includes(term) ||
          p.partNumber?.toLowerCase().includes(term) ||
          p.make?.toLowerCase().includes(term) ||
          p.model?.toLowerCase().includes(term)
      );
    }
    setFilteredParts(data);
    setCurrentPage(1);
  }, [selectedCat, search, parts]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const key = user ? `cart_${user.email}` : "cart_guest";
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart]);

  function handleAddToCart(part) {
    const existing = cart.find((i) => i._id === part._id);
    const updated = existing
      ? cart.map((i) => i._id === part._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i)
      : [...cart, { ...part, quantity: 1 }];
    setCart(updated);
    // localStorage.setItem("cart", JSON.stringify(updated));
  }

  function handleGoToCheckout() {
    navigate("/checkout", { state: { cart } });
  }

  function applyPriceFilter() {
    const min = parseFloat(priceFilter.min) || 0;
    const max = parseFloat(priceFilter.max) || Infinity;
    const filtered = parts.filter((p) => Number(p.price) >= min && Number(p.price) <= max);
    setFilteredParts(filtered);
    setCurrentPage(1);
  }

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const safeFilteredParts = Array.isArray(filteredParts) ? filteredParts : [];
  const paginatedParts = safeFilteredParts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(safeFilteredParts.length / itemsPerPage);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="md:hidden p-2 flex justify-between items-center bg-red-600 text-white">
        <h3 className="font-bold">Categories</h3>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white font-bold text-xl"
        >
          {sidebarOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* <aside
        className={`bg-gray-100 p-4 md:sticky md:top-0 h-auto md:h-screen overflow-y-auto transition-transform duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-20 w-64`}
      > */}
      {/* <aside
  className={`
    bg-gray-100 p-4
    fixed md:sticky top-0 left-0
    h-screen md:h-screen
    overflow-y-auto
    transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    z-40 w-64
  `}
> */}
{/* <aside
  className={`
    bg-gray-100 p-4
    fixed md:sticky
    top-14 md:top-0 left-0
    h-[calc(100vh-56px)] md:h-screen
    overflow-y-auto
    transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    z-40 w-64
  `}
> */}

<aside
  className={`
    bg-gray-100 p-4
    fixed md:sticky
    top-46 md:top-0
    left-0
    h-[calc(100vh-56px)] md:h-screen
    overflow-y-auto
    transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    z-40 w-64
  `}
>

        <h3 className="text-red-600 font-bold text-xl mb-4 hidden md:block">Categories</h3>
        <ul className="space-y-2">
          {/* {categories.map((cat) => ( */}

          {Array.isArray(categories) && categories.map((cat) => (
            <li
              key={cat._id}
              className={`p-2 rounded cursor-pointer ${selectedCat?._id === cat._id ? "bg-red-100 font-semibold" : "hover:bg-gray-200"
                }`}
              onClick={() => {
                setSelectedCat(cat);
                setSidebarOpen(false); // close sidebar on mobile after click
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </aside>

 

<div
  className={`md:hidden fixed inset-0 top-14 bg-black bg-opacity-30 z-30 ${
    sidebarOpen ? "block" : "hidden"
  }`}
  onClick={() => setSidebarOpen(false)}
></div>
      {/* Main */}
      <main className="flex-1 p-4">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">
          <input
            placeholder="Search parts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-400 rounded w-full md:w-1/2"
          />
          <button
            onClick={handleGoToCheckout}
            className="bg-red-600 text-white px-4 py-2 rounded mt-2 md:mt-0 hover:bg-red-700"
          >
            Checkout ({cart.reduce((sum, i) => sum + (i.quantity || 1), 0)})
          </button>
        </div>

        {/* Price filter */}
        <div className="flex gap-2 mb-4 flex-wrap items-center">
          <input
            type="number"
            placeholder="Min Price"
            value={priceFilter.min}
            onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value })}
            className="p-2 border border-gray-400 rounded w-24"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceFilter.max}
            onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value })}
            className="p-2 border border-gray-400 rounded w-24"
          />
          <button
            onClick={applyPriceFilter}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Apply
          </button>
        </div>

        {/* Parts grid */}
        {loadingParts ? (
          <p className="text-gray-700">Loading parts…</p>
        ) : paginatedParts.length === 0 ? (
          <p className="text-gray-700">No parts found.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedParts.map((p) => (
              <div
                key={p._id}
                className="border border-gray-300 rounded p-2 bg-white flex flex-col hover:shadow-lg transition-shadow"
              >
                {/* https://newb-1.onrender.com */}
                <div className="w-full h-40 flex justify-center items-center bg-gray-200">
                  <img
                    src={
                      p.images?.[0]
                        ? `${API}/uploads/${p.images[0]}`
                        : "https://via.placeholder.com/300"
                    }
                    alt={p.partName}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1 mt-2">
                  <h4 className="font-bold text-lg">{p.partName}</h4>
                  <p className="text-gray-700">{p.brand}</p>
                  <p className="text-red-600 font-semibold">
                    ${p.price} {p.currency}
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => navigate(`/tractor-part/${p._id}`, { state: { part: p } })}
                    className="flex-1 bg-black text-white rounded py-1 hover:bg-gray-900"
                  >
                    View Details
                  </button>
                  {/* <button
                    onClick={() => handleAddToCart(p)}
                    className="flex-1 bg-red-600 text-white rounded py-1 hover:bg-red-700"
                  >
                    Add to Cart
                  </button> */}
                  <button
                    disabled={cart.some((i) => i._id === p._id)}
                    onClick={() => handleAddToCart(p)}
                    className={`flex-1 rounded py-1 ${cart.some((i) => i._id === p._id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                  >
                    {cart.some((i) => i._id === p._id) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50 hover:bg-black"
            >
              Prev
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50 hover:bg-black"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}