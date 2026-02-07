

// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import axios from "axios";

// // // // // // // function App() {
// // // // // // //   const [parts, setParts] = useState([]);
// // // // // // //   const [displayParts, setDisplayParts] = useState([]);
// // // // // // //   const [search, setSearch] = useState("");
// // // // // // //   const [vin, setVin] = useState("");
// // // // // // //   const [vinData, setVinData] = useState(null);

// // // // // // //   // Load all parts initially
// // // // // // //   useEffect(() => {
// // // // // // //     fetchParts();
// // // // // // //   }, []);

// // // // // // //   const fetchParts = async (query = "") => {
// // // // // // //     const res = await axios.get(`http://localhost:6003/parts`, { params: { search: query } });
// // // // // // //     setParts(res.data);
// // // // // // //     setDisplayParts(res.data);
// // // // // // //   };

// // // // // // //   // Filter parts when user types in search
// // // // // // //   const handleSearch = e => {
// // // // // // //     const query = e.target.value;
// // // // // // //     setSearch(query);

// // // // // // //     if (!query) {
// // // // // // //       setDisplayParts(parts);
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const lowerQuery = query.toLowerCase();
// // // // // // //     const filtered = parts.filter(part => {
// // // // // // //       // Top-level match
// // // // // // //       const topLevelMatch = Object.keys(part).some(key => {
// // // // // // //         if (typeof part[key] === "string" || typeof part[key] === "number") {
// // // // // // //           return String(part[key]).toLowerCase().includes(lowerQuery);
// // // // // // //         }
// // // // // // //         return false;
// // // // // // //       });

// // // // // // //       // Nested attributes match
// // // // // // //       const attributesMatch = part.attributes
// // // // // // //         ? Object.keys(part.attributes).some(attrKey => {
// // // // // // //             const value = part.attributes[attrKey];
// // // // // // //             return value && String(value).toLowerCase().includes(lowerQuery);
// // // // // // //           })
// // // // // // //         : false;

// // // // // // //       return topLevelMatch || attributesMatch;
// // // // // // //     });

// // // // // // //     setDisplayParts(filtered);
// // // // // // //   };

// // // // // // //   // Decode VIN and auto-filter parts
// // // // // // //   const handleVinDecode = async () => {
// // // // // // //     if (!vin) return;
// // // // // // //     try {
// // // // // // //       const res = await axios.get(`http://localhost:6003/decode-vin/${vin}`);
// // // // // // //       const data = res.data;
// // // // // // //       setVinData(data);

// // // // // // //       // Auto-filter parts by make, model, or year
// // // // // // //       const filtered = parts.filter(part => {
// // // // // // //         const { attributes = {} } = part;
// // // // // // //         const matchesMake = attributes.make?.toLowerCase() === data.Make?.toLowerCase();
// // // // // // //         const matchesModel = attributes.model?.toLowerCase() === data.Model?.toLowerCase();
// // // // // // //         const matchesYear = attributes.year?.toString() === data["Model Year"]?.toString();
// // // // // // //         return matchesMake || matchesModel || matchesYear;
// // // // // // //       });

// // // // // // //       setDisplayParts(filtered);
// // // // // // //     } catch (err) {
// // // // // // //       console.error(err);
// // // // // // //       alert("Failed to decode VIN");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ padding: "20px" }}>
// // // // // // //       <h1>Spare Parts Catalog</h1>

// // // // // // //       <div style={{ marginBottom: "20px" }}>
// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           placeholder="Search parts by name, brand, category..."
// // // // // // //           value={search}
// // // // // // //           onChange={handleSearch}
// // // // // // //           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
// // // // // // //         />
// // // // // // //         <button onClick={() => fetchParts(search)}>Search</button>
// // // // // // //       </div>

// // // // // // //       <div style={{ marginBottom: "20px" }}>
// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           placeholder="Enter VIN to decode"
// // // // // // //           value={vin}
// // // // // // //           onChange={e => setVin(e.target.value)}
// // // // // // //           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
// // // // // // //         />
// // // // // // //         <button onClick={handleVinDecode}>Decode VIN</button>
// // // // // // //       </div>

// // // // // // //       {vinData && (
// // // // // // //         <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
// // // // // // //           <h3>VIN Data:</h3>
// // // // // // //           <pre>{JSON.stringify(vinData, null, 2)}</pre>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
// // // // // // //         <thead>
// // // // // // //           <tr>
// // // // // // //             <th>Name</th>
// // // // // // //             <th>Category</th>
// // // // // // //             <th>Brand</th>
// // // // // // //             <th>Price</th>
// // // // // // //             <th>Attributes</th>
// // // // // // //           </tr>
// // // // // // //         </thead>
// // // // // // //         <tbody>
// // // // // // //           {displayParts.map(part => (
// // // // // // //             <tr key={part.id}>
// // // // // // //               <td>{part.name}</td>
// // // // // // //               <td>{part.category}</td>
// // // // // // //               <td>{part.brand}</td>
// // // // // // //               <td>{part.price} USD</td>
// // // // // // //               <td>
// // // // // // //                 {part.attributes &&
// // // // // // //                   Object.entries(part.attributes)
// // // // // // //                     .map(([k, v]) => `${k}: ${v}`)
// // // // // // //                     .join(", ")}
// // // // // // //               </td>
// // // // // // //             </tr>
// // // // // // //           ))}
// // // // // // //         </tbody>
// // // // // // //       </table>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default App;



// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import axios from "axios";

// // // // // // // function App() {
// // // // // // //   const [parts, setParts] = useState([]);
// // // // // // //   const [displayParts, setDisplayParts] = useState([]);
// // // // // // //   const [search, setSearch] = useState("");
// // // // // // //   const [vin, setVin] = useState("");
// // // // // // //   const [vinData, setVinData] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [decodedParts, setDecodedParts] = useState([]); // ✅ store relevant parts from VIN decode

// // // // // // //   // Load all parts initially
// // // // // // //   useEffect(() => {
// // // // // // //     fetchParts();
// // // // // // //   }, []);

// // // // // // //   const fetchParts = async (query = "") => {
// // // // // // //     try {
// // // // // // //       const res = await axios.get(`http://localhost:6003/parts`, {
// // // // // // //         params: { search: query },
// // // // // // //       });
// // // // // // //       setParts(res.data);
// // // // // // //       setDisplayParts(res.data);
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Error fetching parts:", err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Filter parts when user types in search
// // // // // // //   const handleSearch = (e) => {
// // // // // // //     const query = e.target.value;
// // // // // // //     setSearch(query);

// // // // // // //     if (!query) {
// // // // // // //       setDisplayParts(parts);
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const lowerQuery = query.toLowerCase();
// // // // // // //     const filtered = parts.filter((part) => {
// // // // // // //       // Top-level match
// // // // // // //       const topLevelMatch = Object.keys(part).some((key) => {
// // // // // // //         if (typeof part[key] === "string" || typeof part[key] === "number") {
// // // // // // //           return String(part[key]).toLowerCase().includes(lowerQuery);
// // // // // // //         }
// // // // // // //         return false;
// // // // // // //       });

// // // // // // //       // Nested attributes match
// // // // // // //       const attributesMatch = part.attributes
// // // // // // //         ? Object.keys(part.attributes).some((attrKey) => {
// // // // // // //             const value = part.attributes[attrKey];
// // // // // // //             return value && String(value).toLowerCase().includes(lowerQuery);
// // // // // // //           })
// // // // // // //         : false;

// // // // // // //       return topLevelMatch || attributesMatch;
// // // // // // //     });

// // // // // // //     setDisplayParts(filtered);
// // // // // // //   };

// // // // // // //   // ✅ Decode VIN and auto-fetch relevant parts
// // // // // // //   const handleVinDecode = async () => {
// // // // // // //     if (!vin) return alert("Please enter a VIN to decode.");
// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const res = await axios.get(`http://localhost:6003/decode-vin/${vin}`);
// // // // // // //       const data = res.data;

// // // // // // //       // Save decoded VIN data
// // // // // // //       setVinData(data.vinData || {});
// // // // // // //       setDecodedParts(data.relevantParts || []);
// // // // // // //       setDisplayParts(data.relevantParts || []); // show relevant parts directly
// // // // // // //     } catch (err) {
// // // // // // //       console.error(err);
// // // // // // //       alert("Failed to decode VIN or fetch related parts.");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ padding: "20px", fontFamily: "Arial" }}>
// // // // // // //       <h1>🚗 Spare Parts Catalog</h1>

// // // // // // //       {/* Search Section */}
// // // // // // //       <div style={{ marginBottom: "20px" }}>
// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           placeholder="Search parts by name, brand, or category..."
// // // // // // //           value={search}
// // // // // // //           onChange={handleSearch}
// // // // // // //           style={{
// // // // // // //             padding: "8px",
// // // // // // //             width: "300px",
// // // // // // //             marginRight: "10px",
// // // // // // //             borderRadius: "5px",
// // // // // // //             border: "1px solid #aaa",
// // // // // // //           }}
// // // // // // //         />
// // // // // // //         <button
// // // // // // //           onClick={() => fetchParts(search)}
// // // // // // //           style={{
// // // // // // //             padding: "8px 12px",
// // // // // // //             borderRadius: "5px",
// // // // // // //             background: "#007bff",
// // // // // // //             color: "white",
// // // // // // //             border: "none",
// // // // // // //             cursor: "pointer",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           Search
// // // // // // //         </button>
// // // // // // //       </div>

// // // // // // //       {/* VIN Decoder Section */}
// // // // // // //       <div style={{ marginBottom: "20px" }}>
// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           placeholder="Enter VIN to decode"
// // // // // // //           value={vin}
// // // // // // //           onChange={(e) => setVin(e.target.value)}
// // // // // // //           style={{
// // // // // // //             padding: "8px",
// // // // // // //             width: "300px",
// // // // // // //             marginRight: "10px",
// // // // // // //             borderRadius: "5px",
// // // // // // //             border: "1px solid #aaa",
// // // // // // //           }}
// // // // // // //         />
// // // // // // //         <button
// // // // // // //           onClick={handleVinDecode}
// // // // // // //           disabled={loading}
// // // // // // //           style={{
// // // // // // //             padding: "8px 12px",
// // // // // // //             borderRadius: "5px",
// // // // // // //             background: loading ? "#ccc" : "#28a745",
// // // // // // //             color: "white",
// // // // // // //             border: "none",
// // // // // // //             cursor: "pointer",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {loading ? "Decoding..." : "Decode VIN"}
// // // // // // //         </button>
// // // // // // //       </div>

// // // // // // //       {/* VIN Data */}
// // // // // // //       {vinData && Object.keys(vinData).length > 0 && (
// // // // // // //         <div
// // // // // // //           style={{
// // // // // // //             marginBottom: "20px",
// // // // // // //             border: "1px solid #ccc",
// // // // // // //             padding: "10px",
// // // // // // //             borderRadius: "8px",
// // // // // // //             background: "#f9f9f9",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           <h3>🔍 VIN Details</h3>
// // // // // // //           <pre>{JSON.stringify(vinData, null, 2)}</pre>
// // // // // // //           <p>
// // // // // // //             <strong>Total Matching Parts:</strong> {decodedParts.length}
// // // // // // //           </p>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* Parts Table */}
// // // // // // //       <h3>
// // // // // // //         {vinData
// // // // // // //           ? "Relevant Parts for VIN"
// // // // // // //           : search
// // // // // // //           ? `Search Results for "${search}"`
// // // // // // //           : "All Available Parts"}
// // // // // // //       </h3>

// // // // // // //       <table
// // // // // // //         border="1"
// // // // // // //         cellPadding="8"
// // // // // // //         style={{
// // // // // // //           borderCollapse: "collapse",
// // // // // // //           width: "100%",
// // // // // // //           borderRadius: "8px",
// // // // // // //           overflow: "hidden",
// // // // // // //         }}
// // // // // // //       >
// // // // // // //         <thead style={{ background: "#007bff", color: "white" }}>
// // // // // // //           <tr>
// // // // // // //             <th>Name</th>
// // // // // // //             <th>Category</th>
// // // // // // //             <th>Brand</th>
// // // // // // //             <th>Price</th>
// // // // // // //             <th>Attributes</th>
// // // // // // //           </tr>
// // // // // // //         </thead>
// // // // // // //         <tbody>
// // // // // // //           {displayParts.length > 0 ? (
// // // // // // //             displayParts.map((part) => (
// // // // // // //               <tr key={part.id}>
// // // // // // //                 <td>{part.name}</td>
// // // // // // //                 <td>{part.category}</td>
// // // // // // //                 <td>{part.brand}</td>
// // // // // // //                 <td>{part.price} USD</td>
// // // // // // //                 <td>
// // // // // // //                   {part.attributes &&
// // // // // // //                     Object.entries(part.attributes)
// // // // // // //                       .map(([k, v]) => `${k}: ${v}`)
// // // // // // //                       .join(", ")}
// // // // // // //                 </td>
// // // // // // //               </tr>
// // // // // // //             ))
// // // // // // //           ) : (
// // // // // // //             <tr>
// // // // // // //               <td colSpan="5" style={{ textAlign: "center" }}>
// // // // // // //                 {loading ? "Loading..." : "No parts found"}
// // // // // // //               </td>
// // // // // // //             </tr>
// // // // // // //           )}
// // // // // // //         </tbody>
// // // // // // //       </table>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default App;



// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import axios from "axios";

// // // // // // function App() {
// // // // // //   const [parts, setParts] = useState([]);
// // // // // //   const [displayParts, setDisplayParts] = useState([]);
// // // // // //   const [search, setSearch] = useState("");
// // // // // //   const [vin, setVin] = useState("");
// // // // // //   const [vinData, setVinData] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     fetchParts();
// // // // // //   }, []);

// // // // // //   const fetchParts = async (query = "") => {
// // // // // //     try {
// // // // // //       const res = await axios.get("http://localhost:8000/api/airsprings", {
// // // // // //         params: { search: query },
// // // // // //       });
// // // // // //       setParts(res.data);
// // // // // //       setDisplayParts(res.data);
// // // // // //     } catch (err) {
// // // // // //       console.error("Failed to fetch parts:", err);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSearch = (e) => {
// // // // // //     const query = e.target.value;
// // // // // //     setSearch(query);
// // // // // //     if (!query) {
// // // // // //       setDisplayParts(parts);
// // // // // //       return;
// // // // // //     }

// // // // // //     const lowerQuery = query.toLowerCase();
// // // // // //     const filtered = parts.filter((part) =>
// // // // // //       Object.values(part).some((v) => String(v).toLowerCase().includes(lowerQuery))
// // // // // //     );
// // // // // //     setDisplayParts(filtered);
// // // // // //   };

// // // // // //   const handleVinDecode = async () => {
// // // // // //     if (!vin) return;
// // // // // //     try {
// // // // // //       const res = await axios.get(`http://localhost:6003/decode-vin/${vin}`);
// // // // // //       const data = res.data;
// // // // // //       setVinData(data);

// // // // // //       const filtered = parts.filter((part) =>
// // // // // //         part.compatibleVehicles.some(
// // // // // //           (v) =>
// // // // // //             v.make?.toLowerCase() === data.Make?.toLowerCase() ||
// // // // // //             v.model?.toLowerCase() === data.Model?.toLowerCase() ||
// // // // // //             v.year?.toString() === data["Model Year"]?.toString()
// // // // // //         )
// // // // // //       );

// // // // // //       setDisplayParts(filtered);
// // // // // //     } catch (err) {
// // // // // //       console.error(err);
// // // // // //       alert("Failed to decode VIN");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ padding: "20px" }}>
// // // // // //       <h1>Air Spring Catalog</h1>

// // // // // //       <div style={{ marginBottom: "20px" }}>
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           placeholder="Search by brand, model, or category..."
// // // // // //           value={search}
// // // // // //           onChange={handleSearch}
// // // // // //           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
// // // // // //         />
// // // // // //         <button onClick={() => fetchParts(search)}>Search</button>
// // // // // //       </div>

// // // // // //       <div style={{ marginBottom: "20px" }}>
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           placeholder="Enter VIN to decode"
// // // // // //           value={vin}
// // // // // //           onChange={(e) => setVin(e.target.value)}
// // // // // //           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
// // // // // //         />
// // // // // //         <button onClick={handleVinDecode}>Decode VIN</button>
// // // // // //       </div>

// // // // // //       {vinData && (
// // // // // //         <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
// // // // // //           <h3>VIN Data:</h3>
// // // // // //           <pre>{JSON.stringify(vinData, null, 2)}</pre>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
// // // // // //         <thead>
// // // // // //           <tr>
// // // // // //             <th>Name</th>
// // // // // //             <th>Brand</th>
// // // // // //             <th>Price</th>
// // // // // //             <th>Compatibility</th>
// // // // // //             <th>Specifications</th>
// // // // // //           </tr>
// // // // // //         </thead>
// // // // // //         <tbody>
// // // // // //           {displayParts.map((part) => (
// // // // // //             <tr key={part._id}>
// // // // // //               <td>{part.partName}</td>
// // // // // //               <td>{part.brand}</td>
// // // // // //               <td>{part.price} {part.currency}</td>
// // // // // //               <td>
// // // // // //                 {part.compatibleVehicles
// // // // // //                   ?.map((v) => `${v.make} ${v.model} (${v.year})`)
// // // // // //                   .join(", ")}
// // // // // //               </td>
// // // // // //               <td>
// // // // // //                 {Object.entries(part.specifications || {})
// // // // // //                   .map(([k, v]) => `${k}: ${v}`)
// // // // // //                   .join(", ")}
// // // // // //               </td>
// // // // // //             </tr>
// // // // // //           ))}
// // // // // //         </tbody>
// // // // // //       </table>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default App;


// // // // // import React, { useEffect, useState } from "react";

// // // // // function App() {
// // // // //   const [parts, setParts] = useState([]);
// // // // //   const [displayParts, setDisplayParts] = useState([]);
// // // // //   const [search, setSearch] = useState("");
// // // // //   const [vin, setVin] = useState("");
// // // // //   const [vinData, setVinData] = useState(null);

// // // // //   useEffect(() => {
// // // // //     fetchParts();
// // // // //   }, []);

// // // // //   const fetchParts = async (query = "") => {
// // // // //     try {
// // // // //       const url = new URL("http://localhost:6003/api/airsprings");
// // // // //       if (query) url.searchParams.append("search", query);

// // // // //       const res = await fetch(url);
// // // // //       if (!res.ok) throw new Error("Failed to fetch parts");

// // // // //       const data = await res.json();
// // // // //       setParts(data);
// // // // //       setDisplayParts(data);
// // // // //     } catch (err) {
// // // // //       console.error("Failed to fetch parts:", err);
// // // // //     }
// // // // //   };

// // // // //   const handleSearch = (e) => {
// // // // //     const query = e.target.value;
// // // // //     setSearch(query);

// // // // //     if (!query) {
// // // // //       setDisplayParts(parts);
// // // // //       return;
// // // // //     }

// // // // //     const lowerQuery = query.toLowerCase();
// // // // //     const filtered = parts.filter((part) =>
// // // // //       Object.values(part).some((v) => String(v).toLowerCase().includes(lowerQuery))
// // // // //     );
// // // // //     setDisplayParts(filtered);
// // // // //   };

// // // // //   const handleVinDecode = async () => {
// // // // //     if (!vin) return;
// // // // //     try {
// // // // //       const res = await fetch(`http://localhost:6003/decode-vin/${vin}`);
// // // // //       if (!res.ok) throw new Error("Failed to decode VIN");

// // // // //       const data = await res.json();
// // // // //       setVinData(data);

// // // // //       const filtered = parts.filter((part) =>
// // // // //         part.compatibleVehicles?.some(
// // // // //           (v) =>
// // // // //             v.make?.toLowerCase() === data.Make?.toLowerCase() ||
// // // // //             v.model?.toLowerCase() === data.Model?.toLowerCase() ||
// // // // //             v.year?.toString() === data["Model Year"]?.toString()
// // // // //         )
// // // // //       );

// // // // //       setDisplayParts(filtered);
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       alert("Failed to decode VIN");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ padding: "20px" }}>
// // // // //       <h1>Air Spring Catalog</h1>

// // // // //       {/* 🔍 Search Bar */}
// // // // //       <div style={{ marginBottom: "20px" }}>
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Search by brand, model, or category..."
// // // // //           value={search}
// // // // //           onChange={handleSearch}
// // // // //           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
// // // // //         />
// // // // //         <button onClick={() => fetchParts(search)}>Search</button>
// // // // //       </div>

// // // // //       {/* 🚗 VIN Decoder */}
// // // // //       <div style={{ marginBottom: "20px" }}>
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Enter VIN to decode"
// // // // //           value={vin}
// // // // //           onChange={(e) => setVin(e.target.value)}
// // // // //           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
// // // // //         />
// // // // //         <button onClick={handleVinDecode}>Decode VIN</button>
// // // // //       </div>

// // // // //       {/* 📋 VIN Info */}
// // // // //       {vinData && (
// // // // //         <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
// // // // //           <h3>VIN Data:</h3>
// // // // //           <pre>{JSON.stringify(vinData, null, 2)}</pre>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* 🧩 Parts Table */}
// // // // //       <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
// // // // //         <thead>
// // // // //           <tr>
// // // // //             <th>Name</th>
// // // // //             <th>Brand</th>
// // // // //             <th>Price</th>
// // // // //             <th>Compatibility</th>
// // // // //             <th>Specifications</th>
// // // // //           </tr>
// // // // //         </thead>
// // // // //         <tbody>
// // // // //           {displayParts.map((part) => (
// // // // //             <tr key={part._id}>
// // // // //               <td>{part.partName}</td>
// // // // //               <td>{part.brand}</td>
// // // // //               <td>
// // // // //                 {part.price} {part.currency}
// // // // //               </td>
// // // // //               <td>
// // // // //                 {part.compatibleVehicles
// // // // //                   ?.map((v) => `${v.make} ${v.model} (${v.year})`)
// // // // //                   .join(", ")}
// // // // //               </td>
// // // // //               <td>
// // // // //                 {Object.entries(part.specifications || {})
// // // // //                   .map(([k, v]) => `${k}: ${v}`)
// // // // //                   .join(", ")}
// // // // //               </td>
// // // // //             </tr>
// // // // //           ))}
// // // // //         </tbody>
// // // // //       </table>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default App;


// // // // import React, { useEffect, useState } from "react";

// // // // function App() {
// // // //   const [parts, setParts] = useState([]);
// // // //   const [displayParts, setDisplayParts] = useState([]);
// // // //   const [search, setSearch] = useState("");
// // // //   const [vin, setVin] = useState("");
// // // //   const [vinData, setVinData] = useState(null);

// // // //   // Load all parts initially
// // // //   useEffect(() => {
// // // //     fetchAllParts();
// // // //   }, []);

// // // //   const fetchAllParts = async () => {
// // // //     try {
// // // //       const res = await fetch("http://localhost:6003/api/airsprings");
// // // //       if (!res.ok) throw new Error("Failed to fetch parts");

// // // //       const data = await res.json();
// // // //       setParts(data);
// // // //       setDisplayParts(data); // Show all parts by default
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //     }
// // // //   };

// // // //   const handleSearch = (e) => {
// // // //     const query = e.target.value;
// // // //     setSearch(query);

// // // //     if (!query) {
// // // //       setDisplayParts(parts); // Show all parts if search is empty
// // // //       return;
// // // //     }

// // // //     const lowerQuery = query.toLowerCase();
// // // //     const filtered = parts.filter((part) =>
// // // //       Object.values(part).some((v) => String(v).toLowerCase().includes(lowerQuery))
// // // //     );
// // // //     setDisplayParts(filtered);
// // // //   };

// // // //   const handleVinDecode = async () => {
// // // //     if (!vin) return;
// // // //     try {
// // // //       const res = await fetch(`http://localhost:6003/decode-vin/${vin}`);
// // // //       if (!res.ok) throw new Error("Failed to decode VIN");

// // // //       const data = await res.json();
// // // //       setVinData(data);

// // // //       // Filter parts based on compatible vehicles
// // // //       const filtered = parts.filter((part) =>
// // // //         part.compatibleVehicles?.some(
// // // //           (v) =>
// // // //             v.make?.toLowerCase() === data.Make?.toLowerCase() ||
// // // //             v.model?.toLowerCase() === data.Model?.toLowerCase() ||
// // // //             v.year?.toString() === data["Model Year"]?.toString()
// // // //         )
// // // //       );

// // // //       setDisplayParts(filtered);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       alert("Failed to decode VIN");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div style={{ padding: "20px" }}>
// // // //       <h1>Air Spring Catalog</h1>

// // // //       {/* Search bar */}
// // // //       <div style={{ marginBottom: "20px" }}>
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Search by brand, model, or category..."
// // // //           value={search}
// // // //           onChange={handleSearch}
// // // //           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
// // // //         />
// // // //       </div>

// // // //       {/* VIN decoder */}
// // // //       <div style={{ marginBottom: "20px" }}>
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Enter VIN to decode"
// // // //           value={vin}
// // // //           onChange={(e) => setVin(e.target.value)}
// // // //           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
// // // //         />
// // // //         <button onClick={handleVinDecode}>Decode VIN</button>
// // // //       </div>

// // // //       {/* VIN data */}
// // // //       {vinData && (
// // // //         <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
// // // //           <h3>VIN Data:</h3>
// // // //           <pre>{JSON.stringify(vinData, null, 2)}</pre>
// // // //         </div>
// // // //       )}

// // // //       {/* Parts table */}
// // // //       <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
// // // //         <thead>
// // // //           <tr>
// // // //             <th>Name</th>
// // // //             <th>Brand</th>
// // // //             <th>Price</th>
// // // //             <th>Compatibility</th>
// // // //             <th>Specifications</th>
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {displayParts.map((part) => (
// // // //             <tr key={part._id}>
// // // //               <td>{part.partName}</td>
// // // //               <td>{part.brand}</td>
// // // //               <td>
// // // //                 {part.price} {part.currency}
// // // //               </td>
// // // //               <td>
// // // //                 {part.compatibleVehicles
// // // //                   ?.map((v) => `${v.make} ${v.model} (${v.year})`)
// // // //                   .join(", ")}
// // // //               </td>
// // // //               <td>
// // // //                 {Object.entries(part.specifications || {})
// // // //                   .map(([k, v]) => `${k}: ${v}`)
// // // //                   .join(", ")}
// // // //               </td>
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;


// // // import React, { useEffect, useState } from "react";

// // // function App() {
// // //   const [parts, setParts] = useState([]);
// // //   const [displayParts, setDisplayParts] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [vin, setVin] = useState("");
// // //   const [vinData, setVinData] = useState(null);

// // //   // Load all parts initially
// // //   useEffect(() => {
// // //     fetchAllParts();
// // //   }, []);

// // //   const fetchAllParts = async () => {
// // //     try {
// // //       const res = await fetch("http://localhost:6003/api/airsprings");
// // //       if (!res.ok) throw new Error("Failed to fetch parts");

// // //       const data = await res.json();
// // //       setParts(data);
// // //       setDisplayParts(data); // Show all parts by default
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const handleSearch = (e) => {
// // //     const query = e.target.value;
// // //     setSearch(query);

// // //     if (!query) {
// // //       setDisplayParts(parts); // Show all parts if search is empty
// // //       return;
// // //     }

// // //     const lowerQuery = query.toLowerCase();
// // //     const filtered = parts.filter((part) =>
// // //       Object.values(part).some((v) => String(v).toLowerCase().includes(lowerQuery))
// // //     );
// // //     setDisplayParts(filtered);
// // //   };

// // //   const handleVinDecode = async () => {
// // //     if (!vin) return;
// // //     try {
// // //       const res = await fetch(`http://localhost:6003/decode-vin/${vin}`);
// // //       if (!res.ok) throw new Error("Failed to decode VIN");

// // //       const { vinData, relevantParts } = await res.json();
// // //       setVinData(vinData);
// // //       setDisplayParts(relevantParts);
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to decode VIN");
// // //     }
// // //   };

// // //   return (
// // //     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
// // //       <h1>Air Spring Catalog</h1>

// // //       {/* Search bar */}
// // //       <div style={{ marginBottom: "20px" }}>
// // //         <input
// // //           type="text"
// // //           placeholder="Search by brand, model, or category..."
// // //           value={search}
// // //           onChange={handleSearch}
// // //           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
// // //         />
// // //       </div>

// // //       {/* VIN decoder */}
// // //       <div style={{ marginBottom: "20px" }}>
// // //         <input
// // //           type="text"
// // //           placeholder="Enter VIN to decode"
// // //           value={vin}
// // //           onChange={(e) => setVin(e.target.value)}
// // //           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
// // //         />
// // //         <button onClick={handleVinDecode} style={{ padding: "8px 12px" }}>
// // //           Decode VIN
// // //         </button>
// // //       </div>

// // //       {/* VIN data */}
// // //       {vinData && (
// // //         <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
// // //           <h3>VIN Data:</h3>
// // //           <pre>{JSON.stringify(vinData, null, 2)}</pre>
// // //         </div>
// // //       )}

// // //       {/* Parts cards */}
// // //       <div
// // //         style={{
// // //           display: "flex",
// // //           flexWrap: "wrap",
// // //           gap: "20px",
// // //         }}
// // //       >
// // //         {displayParts.map((part) => (
// // //           <div
// // //             key={part._id}
// // //             style={{
// // //               width: "250px",
// // //               border: "1px solid #ddd",
// // //               borderRadius: "8px",
// // //               overflow: "hidden",
// // //               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
// // //               display: "flex",
// // //               flexDirection: "column",
// // //             }}
// // //           >
// // //             {/* Image */}
// // //             <div style={{ height: "180px", overflow: "hidden", background: "#f9f9f9" }}>
// // //               <img
// // //                 src={part.images?.[0] || "https://via.placeholder.com/250x180"}
// // //                 alt={part.partName}
// // //                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
// // //               />
// // //             </div>

// // //             {/* Details */}
// // //             <div style={{ padding: "10px", flexGrow: 1 }}>
// // //               <h3 style={{ margin: "5px 0" }}>{part.partName}</h3>
// // //               <p style={{ margin: "5px 0", fontWeight: "bold" }}>
// // //                 Brand: {part.brand}
// // //               </p>
// // //               <p style={{ margin: "5px 0" }}>
// // //                 Price: {part.price} {part.currency}
// // //               </p>
// // //               <p style={{ margin: "5px 0" }}>
// // //                 Stock: {part.stock} pcs
// // //               </p>
// // //               <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#555" }}>
// // //                 {part.specifications &&
// // //                   Object.entries(part.specifications)
// // //                     .map(([k, v]) => `${k}: ${v}`)
// // //                     .join(", ")}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App; 




// // import React, { useEffect, useState } from "react";
// // import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

// // // Main App
// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Catalog />} />
// //         <Route path="/checkout" element={<Checkout />} />
// //         <Route path="/admin" element={<Admin />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // // Catalog Page
// // function Catalog() {
// //   const [parts, setParts] = useState([]);
// //   const [displayParts, setDisplayParts] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [cart, setCart] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetch("http://localhost:6003/api/airsprings")
// //       .then(res => res.json())
// //       .then(data => {
// //         setParts(data);
// //         setDisplayParts(data);
// //       });
// //   }, []);

// //   const handleAddToCart = (part, quantity) => {
// //     if (quantity <= 0) return alert("Quantity must be at least 1");
// //     setCart([{ ...part, quantity }]);
// //     navigate("/checkout", { state: { cart: [{ ...part, quantity }] } });
// //   };

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h1>Air Spring Catalog</h1>
// //       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
// //         {displayParts.map((part) => {
// //           const [quantity, setQuantity] = useState(1);
// //           return (
// //             <div
// //               key={part._id}
// //               style={{
// //                 width: "250px",
// //                 border: "1px solid #ddd",
// //                 borderRadius: "8px",
// //                 overflow: "hidden",
// //                 boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
// //                 display: "flex",
// //                 flexDirection: "column",
// //               }}
// //             >
// //               <div style={{ height: "180px", background: "#f9f9f9" }}>
// //                 <img
// //                   src={part.images?.[0] || "https://via.placeholder.com/250x180"}
// //                   alt={part.partName}
// //                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //                 />
// //               </div>
// //               <div style={{ padding: "10px", flexGrow: 1 }}>
// //                 <h3>{part.partName}</h3>
// //                 <p>Brand: {part.brand}</p>
// //                 <p>
// //                   Price: {part.price} {part.currency}
// //                 </p>
// //                 <input
// //                   type="number"
// //                   min={1}
// //                   value={quantity}
// //                   onChange={(e) => setQuantity(parseInt(e.target.value))}
// //                   style={{ width: "60px", marginRight: "10px" }}
// //                 />
// //                 <button onClick={() => handleAddToCart(part, quantity)}>Add to Cart</button>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // // Checkout Page
// // import { useLocation } from "react-router-dom";
// // function Checkout() {
// //   const location = useLocation();
// //   const { cart } = location.state || { cart: [] };
// //   const [email, setEmail] = useState("");

// //   const handlePlaceOrder = async () => {
// //     if (!email) return alert("Please enter your email");

// //     try {
// //       const res = await fetch("http://localhost:6003/api/orders", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, items: cart }),
// //       });
// //       const data = await res.json();
// //       alert("Order placed successfully!");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to place order");
// //     }
// //   };

// //   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>Checkout</h2>
// //       {cart.map((item) => (
// //         <div key={item._id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
// //           <h3>{item.partName}</h3>
// //           <p>Price: {item.price}</p>
// //           <p>Quantity: {item.quantity}</p>
// //           <p>Subtotal: {item.price * item.quantity}</p>
// //         </div>
// //       ))}
// //       <h3>Total: {total}</h3>
// //       <input
// //         type="email"
// //         placeholder="Enter your email"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //         style={{ padding: "8px", marginRight: "10px" }}
// //       />
// //       <button onClick={handlePlaceOrder}>Place Order</button>
// //     </div>
// //   );
// // }


// // function Admin() {
// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:6003/api/orders")
// //       .then(res => res.json())
// //       .then(data => setOrders(data));
// //   }, []);

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>Admin Orders</h2>
// //       {orders.map(order => (
// //         <div key={order._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
// //           <p>Email: {order.email}</p>
// //           <p>Total: {order.total}</p>
// //           <p>Items:</p>
// //           <ul>
// //             {order.items.map(item => (
// //               <li key={item.partId}>
// //                 {item.partName} - Qty: {item.quantity} - Price: {item.price}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // export default App;


// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
//   useLocation
// } from "react-router-dom";

// // Main App
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Catalog />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/admin" element={<Admin />} />
//       </Routes>
//     </Router>
//   );
// }

// // Catalog Page
// function Catalog() {
//   const [parts, setParts] = useState([]);
//   const [displayParts, setDisplayParts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [quantities, setQuantities] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:6003/api/airsprings")
//       .then((res) => res.json())
//       .then((data) => {
//         setParts(data);
//         setDisplayParts(data);
//       });
//   }, []);

//   const handleAddToCart = (part) => {
//     const quantity = quantities[part._id] || 1;
//     if (quantity <= 0) return alert("Quantity must be at least 1");
//     navigate("/checkout", { state: { cart: [{ ...part, quantity }] } });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Air Spring Catalog</h1>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           const query = e.target.value.toLowerCase();
//           if (!query) return setDisplayParts(parts);
//           setDisplayParts(
//             parts.filter((part) =>
//               Object.values(part).some((v) =>
//                 String(v).toLowerCase().includes(query)
//               )
//             )
//           );
//         }}
//         style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
//       />
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {displayParts.map((part) => (
//           <div
//             key={part._id}
//             style={{
//               width: "250px",
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               overflow: "hidden",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <div style={{ height: "180px", background: "#f9f9f9" }}>
//               <img
//                 src={part.images?.[0] || "https://via.placeholder.com/250x180"}
//                 alt={part.partName}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div style={{ padding: "10px", flexGrow: 1 }}>
//               <h3>{part.partName}</h3>
//               <p>Brand: {part.brand}</p>
//               <p>
//                 Price: {part.price} {part.currency}
//               </p>
//               <input
//                 type="number"
//                 min={1}
//                 value={quantities[part._id] || 1}
//                 onChange={(e) =>
//                   setQuantities({
//                     ...quantities,
//                     [part._id]: parseInt(e.target.value),
//                   })
//                 }
//                 style={{ width: "60px", marginRight: "10px" }}
//               />
//               <button onClick={() => handleAddToCart(part)}>Add to Cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Checkout Page
// function Checkout() {
//   const location = useLocation();
//   const { cart } = location.state || { cart: [] };
//   const [email, setEmail] = useState("");

//   const handlePlaceOrder = async () => {
//     if (!email) return alert("Please enter your email");

//     try {
//       const res = await fetch("http://localhost:6003/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, items: cart }),
//       });
//       await res.json();
//       alert("Order placed successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to place order");
//     }
//   };

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Checkout</h2>
//       {cart.map((item) => (
//         <div
//           key={item._id}
//           style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
//         >
//           <h3>{item.partName}</h3>
//           <p>Price: {item.price}</p>
//           <p>Quantity: {item.quantity}</p>
//           <p>Subtotal: {item.price * item.quantity}</p>
//         </div>
//       ))}
//       <h3>Total: {total}</h3>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={{ padding: "8px", marginRight: "10px" }}
//       />
//       <button onClick={handlePlaceOrder}>Place Order</button>
//     </div>
//   );
// }

// // Admin Page
// function Admin() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:6003/api/orders")
//       .then((res) => res.json())
//       .then((data) => setOrders(data));
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Orders</h2>
//       {orders.map((order) => (
//         <div
//           key={order._id}
//           style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}
//         >
//           <p>Email: {order.email}</p>
//           <p>Total: {order.total}</p>
//           <p>Items:</p>
//           <ul>
//             {order.items.map((item) => (
//               <li key={item.partId}>
//                 {item.partName} - Qty: {item.quantity} - Price: {item.price}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import MyOrders from "./MyOrders";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/Category";
import AdminPages from "./pages/Admin";
import PartDetails from "./pages/PartDetails";
import CheckOrdersAdmin from "./pages/CheckOrdersAdmin";
import Invoice from "./pages/Invoice";
import Footer from "./components/Footer";
// import Catalog from "./pages/Catalog";
import TractorCategoryPage from "./pages/TractorCategoryPage";
import TractorAdminPage from "./pages/TractorAdminPage";
import PickupCategory from "./pages/PickupCategory";
import PickupAdmin from "./pages/PickupAdmin";
import AdminPage from "./pages/AdminPage";
import SignupStep1 from "./pages/SignupStep1";
import SignupStep2 from "./pages/SignupStep2";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/AdminUsers";
import AdminDrivers from "./pages/AdminDrivers";
import DriverOrders from "./pages/DriverOrders";
import DriverLogin from "./pages/DriverLogin";
import DriverDashboard from "./pages/DriverDashboard";
import DriverSignup from "./pages/DriverSignup";
import SignupStep3 from "./pages/SignupStep3";
import MechanicSignup from "./pages/MechanicSignup";
import MechanicLogin from "./pages/MechanicLogin";
import CustomerProblem from "./pages/CustomerProblem";
import AdminDashboard from "./pages/AdminDashboard";
import AssignJob from "./pages/AssignJob";
import MechanicDashboard from "./pages/MechanicDashboard";
import AdminCompletedJobs from "./pages/AdminCompletedJobs";
import AdminCompletedJobsList from "./pages/AdminCompletedJobsList";
import InvoiceHistoryPage from "./pages/InvoiceHistoryPage";
import MechanicJobHistory from "./pages/MechanicJobHistory";
import DriverOrderHistory from "./pages/DriverOrderHistory";
import AdminDeliveredOrders from "./pages/AdminDeliveredOrders";
import AdminAllOrders from "./pages/AdminAllOrders";
import TractorPartDetailPage from "./pages/TractorPartDetailPage";
import PartPreview from "./pages/Pickup-PartPreview";

// Main App
function App() {
  return (
    <>
      <Navbar />
      {/* <Router> */}
      <Routes>

        <Route path="/" element={<Home />} />
        {/* <Route path="/catalog" element={<Catalog />} /> */}
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/catalog" element={<CategoryPage />} />
        <Route path="/admins" element={<AdminPages />} />
        <Route path="/part/:id" element={<PartDetails />} />  {/* 👈 new */}
        <Route path="/admin/orders" element={<CheckOrdersAdmin />} />
        {/* <Route path="/admin/orders" element={<CheckOrdersAdmin />} /> */}
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/tractor-category" element={<TractorCategoryPage />} />
        <Route path="/tractor-category-admin" element={<TractorAdminPage />} />
        <Route path="/PickupCategory" element={<PickupCategory />} />
        <Route path="/PickupAdmin" element={<PickupAdmin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/SignupStep1" element={<SignupStep1 />} />
        <Route path="/SignupStep2" element={<SignupStep2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/AdminDrivers" element={<AdminDrivers />} />

        <Route path="/DriverOrders" element={<DriverOrders />} />
        <Route path="/DriverLogin" element={<DriverLogin />} />
        <Route path="/DriverDashboard" element={<DriverDashboard />} />
        <Route path="/DriverSignup" element={<DriverSignup />} />
        <Route path="/SignupStep3" element={<SignupStep3 />} />
        <Route path="/MechanicSignup" element={<MechanicSignup />} />
        <Route path="/MechanicLogin" element={<MechanicLogin />} />
        <Route path="/CustomerProblem" element={<CustomerProblem />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AssignJob" element={<AssignJob />} />
        <Route path="/MechanicDashboard" element={<MechanicDashboard />} />
        {/* <Route path="/admin/invoice/:jobId" element={<AdminCompletedJobs/>} /> */}
        <Route path="/admin/completed-jobs" element={<AdminCompletedJobsList />} />
        <Route path="/admin/invoice/:jobId" element={<AdminCompletedJobs />} />
        <Route path="/invoice-history" element={<InvoiceHistoryPage />} />
        <Route path="/mechanic/job-history" element={<MechanicJobHistory />} />
        <Route path="/DriverOrderHistory" element={<DriverOrderHistory />} />
        <Route path="/AdminDeliveredOrders" element={<AdminDeliveredOrders />} />
        <Route path="/AdminAllOrders" element={<AdminAllOrders />} />
        <Route path="/tractor-part/:id" element={<TractorPartDetailPage />} />
        <Route path="/parts/:id" element={<PartPreview />} />
      </Routes>
      {/* AdminCompletedJobs */}
      {/* </Router> */}
      {/* /mechanic/job-history */}
      {/* AdminDeliveredOrders */}
      <Footer />
    </>
  );
}

// Catalog Page
function Catalog() {
  const [parts, setParts] = useState([]);
  const [displayParts, setDisplayParts] = useState([]);
  const [search, setSearch] = useState("");
  const [vin, setVin] = useState("");
  const [vinData, setVinData] = useState(null);
  const [quantities, setQuantities] = useState({});
   const API = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
// https://newb-1.onrender.com
  useEffect(() => {
    fetch(`${API}/api/airsprings`)
      .then((res) => res.json())
      .then((data) => {
        setParts(data);
        setDisplayParts(data);
      });
  }, []);

  // VIN decoder
  const handleVinDecode = async () => {
    if (!vin) return alert("Please enter a VIN");
    try {
      const res = await fetch(`${API}/decode-vin/${vin}`);
      if (!res.ok) throw new Error("Failed to decode VIN");
      const { vinData, relevantParts } = await res.json();
      setVinData(vinData);
      setDisplayParts(relevantParts);
    } catch (err) {
      console.error(err);
      alert("Failed to decode VIN");
    }
  };

  const handleAddToCart = (part) => {
    const quantity = quantities[part._id] || 1;
    if (quantity <= 0) return alert("Quantity must be at least 1");
    navigate("/checkout", { state: { cart: [{ ...part, quantity }] } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Air Spring Catalog</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by brand, model, category..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          const query = e.target.value.toLowerCase();
          if (!query) return setDisplayParts(parts);
          setDisplayParts(
            parts.filter((part) =>
              Object.values(part).some((v) =>
                String(v).toLowerCase().includes(query)
              )
            )
          );
        }}
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />

      {/* VIN decoder */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter VIN to decode"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button onClick={handleVinDecode} style={{ padding: "8px 12px" }}>
          Decode VIN
        </button>
      </div>

      {/* VIN data display */}
      {vinData && (
        <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>VIN Data:</h3>
          <pre>{JSON.stringify(vinData, null, 2)}</pre>
        </div>
      )}

      {/* Parts */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {displayParts.map((part) => (
          <div
            key={part._id}
            style={{
              width: "250px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ height: "180px", background: "#f9f9f9" }}>
              <img
                src={part.images?.[0] || "https://via.placeholder.com/250x180"}
                alt={part.partName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "10px", flexGrow: 1 }}>
              <h3>{part.partName}</h3>
              <p>Brand: {part.brand}</p>
              <p>
                Price: {part.price} {part.currency}
              </p>
              <input
                type="number"
                min={1}
                value={quantities[part._id] || 1}
                onChange={(e) =>
                  setQuantities({
                    ...quantities,
                    [part._id]: parseInt(e.target.value),
                  })
                }
                style={{ width: "60px", marginRight: "10px" }}
              />
              <button onClick={() => handleAddToCart(part)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Checkout Page
// function Checkout() {
//   const location = useLocation();
//   const { cart } = location.state || { cart: [] };
//   const [email, setEmail] = useState("");

//   const handlePlaceOrder = async () => {
//     if (!email) return alert("Please enter your email");

//     try {
//       const res = await fetch("http://localhost:6003/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, items: cart }),
//       });
//       await res.json();
//       alert("Order placed successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to place order");
//     }
//   };

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Checkout</h2>
//       {cart.map((item) => (
//         <div
//           key={item._id}
//           style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
//         >
//           <h3>{item.partName}</h3>
//           <p>Price: {item.price}</p>
//           <p>Quantity: {item.quantity}</p>
//           <p>Subtotal: {item.price * item.quantity}</p>
//         </div>
//       ))}
//       <h3>Total: {total}</h3>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={{ padding: "8px", marginRight: "10px" }}
//       />
//       <button onClick={handlePlaceOrder}>Place Order</button>
//     </div>
//   );
// }


// Admin Page
// function Admin() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:6003/api/orders")
//       .then((res) => res.json())
//       .then((data) => setOrders(data));
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Orders</h2>
//       {orders.map((order) => (
//         <div
//           key={order._id}
//           style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}
//         >
//           <p>Email: {order.email}</p>
//           <p>Total: {order.total}</p>
//           <p>Items:</p>
//           <ul>
//             {order.items.map((item) => (
//               <li key={item.partId}>
//                 {item.partName} - Qty: {item.quantity} - Price: {item.price}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }
function Admin() {
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   fetch(`${API}/api/orders`)
  //     .then((res) => res.json())
  //     .then((data) => setOrders(data))
  //     .catch((err) => console.error("Error fetching orders:", err));
  // }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // await fetch(`${API}/api/orders/${orderId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ status: newStatus }),
      // });

      // Update the status in local state without refetching all orders
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <p><b>Email:</b> {order.email}</p>
          <p><b>Total:</b> {order.total}</p>

          <p><b>Status:</b></p>
          <select
            value={order.status || "Pending"}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            style={{ padding: "5px", borderRadius: "4px", marginBottom: "10px" }}
          >
            <option value="Pending">Pending</option>
            <option value="Dispatched">Dispatched</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>

          {order.estimatedDelivery && (
            <p><b>Estimated Delivery:</b> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
          )}

          <p><b>Items:</b></p>
          <ul>
            {order.items.map((item) => (
              <li key={item.partId}>
                {item.partName} — Qty: {item.quantity} — Price: {item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;

