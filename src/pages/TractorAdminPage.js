
// import React, { useEffect, useState } from "react";
// import AdminNavbar from "./AdminNavbar";

// export default function AdminPage() {

//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [newCatName, setNewCatName] = useState("");
//     const [parts, setParts] = useState([]);
//     const [editPartId, setEditPartId] = useState(null);

    
//     const [partForm, setPartForm] = useState({
//         partName: "",
//         manufacturer: "",
//         partType: "",
//         brand: "",
//         oemNumber: "",
//         partNumber: "",
//         price: 0,
//         msrp: "",
//         currency: "INR",
//         stock: 0,
//         year: "",
//         make: "",
//         model: "",
//         description: "",
//         images: []
//     });

//     useEffect(() => { loadCategories(); }, []);
//     useEffect(() => {
//         if (selectedCategory) loadParts(selectedCategory._id);
//         else setParts([]);
//     }, [selectedCategory]);

//     async function loadCategories() {
//         const res = await fetch("http://localhost:6003/api/tractor-categories");
//         const data = await res.json();
//         setCategories(data);
//         if (data.length && !selectedCategory) setSelectedCategory(data[0]);
//     }

//     async function createCategory() {
//         if (!newCatName.trim()) return alert("Name required");
//         const res = await fetch("http://localhost:6003/api/tractor-categories", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name: newCatName })
//         });
//         if (!res.ok) return alert("Failed");
//         setNewCatName("");
//         await loadCategories();
//     }

//     async function updateCategory(catId) {
//         const newName = prompt("New category name?");
//         if (!newName) return;
//         const res = await fetch(`http://localhost:6003/api/tractor-categories/${catId}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name: newName })
//         });
//         if (!res.ok) return alert("Failed");
//         await loadCategories();
//     }

//     async function deleteCategory(catId) {
//         if (!window.confirm("Are you sure you want to delete this category?")) return;
//         const res = await fetch(`http://localhost:6003/api/tractor-categories/${catId}`, { method: "DELETE" });
//         if (!res.ok) return alert("Failed");
//         setSelectedCategory(null);
//         await loadCategories();
//     }

//     async function loadParts(catId) {
//         const res = await fetch(`http://localhost:6003/api/tractor-parts?category=${catId}`);
//         const data = await res.json();
//         setParts(data);
//     }


//     async function deletePart(partId) {
//         if (!window.confirm("Are you sure you want to delete this part?")) return;
//         const res = await fetch(`http://localhost:6003/api/tractor-parts/${partId}`, { method: "DELETE" });
//         if (!res.ok) return alert("Failed to delete part");
//         await loadParts(selectedCategory._id);
//     }
// function startEditPart(part) {
//   setPartForm({
//     partName: part.partName || "",
//     manufacturer: part.manufacturer || "",
//     partType: part.partType || "",
//     brand: part.brand || "",
//     oemNumber: part.oemNumber || "",
//     partNumber: part.partNumber || "",
//     price: part.price || 0,
//     msrp: part.msrp || "",
//     currency: part.currency || "INR",
//     stock: part.stock || 0,
//     year: part.year || "",
//     make: part.make || "",
//     model: part.model || "",
//     description: part.description || "",
//     images: [], // ✅ user must reselect images
//   });

//   setEditPartId(part._id);
// }
 
// async function handlePartCreateOrUpdate(e) {
//   e.preventDefault();

//   if (!selectedCategory) {
//     alert("Select category first");
//     return;
//   }

//   const formData = new FormData();

//   Object.entries(partForm).forEach(([key, value]) => {
//     if (key === "images") {
//       if (value && value.length) {
//         for (let file of value) {
//           formData.append("images", file);
//         }
//       }
//     } else {
//       formData.append(key, value);
//     }
//   });

//   formData.append("category", selectedCategory._id);

//   const method = editPartId ? "PUT" : "POST";
//   const url = editPartId
//     ? `http://localhost:6003/api/tractor-parts/${editPartId}`
//     : "http://localhost:6003/api/tractor-parts";

//   const res = await fetch(url, {
//     method,
//     body: formData, // ✅ DO NOT set Content-Type
//   });

//   if (!res.ok) {
//     const err = await res.text();
//     console.error(err);
//     return alert("Failed to save part");
//   }

//   alert(editPartId ? "Part updated successfully" : "Part created successfully");

//   setPartForm({
//     partName: "",
//     manufacturer: "",
//     partType: "",
//     brand: "",
//     oemNumber: "",
//     partNumber: "",
//     price: 0,
//     msrp: "",
//     currency: "INR",
//     stock: 0,
//     year: "",
//     make: "",
//     model: "",
//     description: "",
//     images: [],
//   });

//   setEditPartId(null);
//   await loadParts(selectedCategory._id);
// }


//     return (
//         <>
//             <AdminNavbar />
//             <div style={{ display: "flex", gap: 18, padding: 20 }}>

//                 <aside style={{ width: 280, borderRight: "1px solid #eee", paddingRight: 12 }}>
//                     <h3>Categories</h3>
//                     <div style={{ display: "flex", gap: 8 }}>
//                         <input value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="New category name" />
//                         <button onClick={createCategory}>Create</button>
//                     </div>
//                     <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
//                         {categories.map(cat => (
//                             <li key={cat._id} style={{
//                                 padding: 8,
//                                 background: selectedCategory?._id === cat._id ? "#eef" : "transparent",
//                                 borderRadius: 6,
//                                 marginBottom: 6,
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center"
//                             }}>
//                                 <div onClick={() => setSelectedCategory(cat)} style={{ cursor: "pointer" }}>{cat.name}</div>
//                                 <div>
//                                     <button onClick={() => updateCategory(cat._id)} style={{ marginRight: 6 }}>Edit</button>
//                                     <button onClick={() => deleteCategory(cat._id)}>Del</button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </aside>

//                 <section style={{ flex: 1 }}>
//                     <h3>{editPartId ? "Edit Part" : "Create Part"} in {selectedCategory?.name || "—"}</h3>

//                     <form onSubmit={handlePartCreateOrUpdate} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
//                         <input required placeholder="Part Name" value={partForm.partName} onChange={e => setPartForm({ ...partForm, partName: e.target.value })} />
//                         <input placeholder="Manufacturer" value={partForm.manufacturer} onChange={e => setPartForm({ ...partForm, manufacturer: e.target.value })} />
//                         <input placeholder="Part Type" value={partForm.partType} onChange={e => setPartForm({ ...partForm, partType: e.target.value })} />
//                         <input required placeholder="Brand" value={partForm.brand} onChange={e => setPartForm({ ...partForm, brand: e.target.value })} />
//                         <input placeholder="OEM Number" value={partForm.oemNumber} onChange={e => setPartForm({ ...partForm, oemNumber: e.target.value })} />
//                         <input placeholder="Part Number" value={partForm.partNumber} onChange={e => setPartForm({ ...partForm, partNumber: e.target.value })} />
//                         <input type="number" required placeholder="Price" value={partForm.price} onChange={e => setPartForm({ ...partForm, price: Number(e.target.value) })} />
//                         <input type="number" placeholder="MSRP" value={partForm.msrp} onChange={e => setPartForm({ ...partForm, msrp: Number(e.target.value) })} />
//                         <input placeholder="Currency" value={partForm.currency} onChange={e => setPartForm({ ...partForm, currency: e.target.value })} />
//                         <input type="number" placeholder="Stock" value={partForm.stock} onChange={e => setPartForm({ ...partForm, stock: Number(e.target.value) })} />
//                         {/* <input placeholder="Image URLs (comma separated)" value={partForm.images} onChange={e => setPartForm({ ...partForm, images: e.target.value })} /> */}
//                         <input
//                             type="file"
//                             multiple
//                             accept="image/*"
//                             onChange={(e) =>
//                                 setPartForm({ ...partForm, images: e.target.files })
//                             }
//                         />
//                         <input
//                             placeholder="Year (e.g. 2021)"
//                             value={partForm.year}
//                             onChange={e => setPartForm({ ...partForm, year: e.target.value })}
//                         />

//                         <input
//                             placeholder="Make (e.g. Mahindra)"
//                             value={partForm.make}
//                             onChange={e => setPartForm({ ...partForm, make: e.target.value })}
//                         />

//                         <input
//                             placeholder="Model (e.g. 275 DI)"
//                             value={partForm.model}
//                             onChange={e => setPartForm({ ...partForm, model: e.target.value })}
//                         />
//                         <textarea placeholder="Description" value={partForm.description} onChange={e => setPartForm({ ...partForm, description: e.target.value })} style={{ gridColumn: "1 / -1" }} />
//                         <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between" }}>
//                             <button type="submit">{editPartId ? "Update Part" : "Create Part"}</button>
//                             {editPartId && <button type="button" onClick={() => { setEditPartId(null); setPartForm({ partName: "", brand: "", price: 0, currency: "INR", stock: 0, description: "" }); }}>Cancel</button>}
//                         </div>
//                     </form>

//                     {/* Parts list */}
//                     <div>
//                         {parts.length === 0 && <p>No parts in this category.</p>}
//                         {parts.map(p => (
//                             <div key={p._id} style={{ border: "1px solid #eee", padding: 12, marginBottom: 8, borderRadius: 6 }}>
//                                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                                     <div>
//                                         <strong>{p.partName}</strong> • <small>{p.brand}</small>
//                                         <div style={{ color: "#666" }}>{p.price} {p.currency} • Stock: {p.stock}</div>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => startEditPart(p)} style={{ marginRight: 8 }}>Edit</button>
//                                         <button onClick={() => deletePart(p._id)} style={{ color: "red" }}>Delete</button>
//                                     </div>
//                                 </div>
//                                 <div style={{ marginTop: 8 }}>{p.description}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             </div>
//         </>
//     );
// }

import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCatName, setNewCatName] = useState("");
  const [parts, setParts] = useState([]);
  const [editPartId, setEditPartId] = useState(null);
   const API = process.env.REACT_APP_API_BASE_URL;
  const [partForm, setPartForm] = useState({
    partName: "",
    manufacturer: "",
    partType: "",
    brand: "",
    oemNumber: "",
    partNumber: "",
    price: "",
    msrp: "",
    currency: "INR",
    stock: "",
    year: "",
    make: "",
    model: "",
    description: "",
    images: [],
  });

  /* ---------------- CACHE KEYS ---------------- */
  const CAT_CACHE = "tractor_categories_cache";
  const PART_CACHE = (id) => `tractor_parts_${id}`;

  /* ---------------- LOAD CATEGORIES ---------------- */
  useEffect(() => {
    loadCategories();
  }, []);
// https://newb-1.onrender.com
  async function loadCategories() {
    try {
      const res = await fetch(`${API}/api/tractor-categories`);
      const data = await res.json();
      const safe = Array.isArray(data) ? data : [];
      setCategories(safe);
      localStorage.setItem(CAT_CACHE, JSON.stringify(safe));
      if (safe.length && !selectedCategory) setSelectedCategory(safe[0]);
    } catch {
      const cached = localStorage.getItem(CAT_CACHE);
      if (cached) setCategories(JSON.parse(cached));
    }
  }

  /* ---------------- LOAD PARTS ---------------- */
  useEffect(() => {
    if (selectedCategory) loadParts(selectedCategory._id);
    else setParts([]);
  }, [selectedCategory]);

  async function loadParts(catId) {
    try {
      const res = await fetch(
        `${API}/api/tractor-parts?category=${catId}`
      );
      const data = await res.json();
      const safe = Array.isArray(data) ? data : [];
      setParts(safe);
      localStorage.setItem(PART_CACHE(catId), JSON.stringify(safe));
    } catch {
      const cached = localStorage.getItem(PART_CACHE(catId));
      if (cached) setParts(JSON.parse(cached));
    }
  }

  /* ---------------- CATEGORY CRUD ---------------- */
  async function createCategory() {
    if (!newCatName.trim()) return alert("Category name required");
    await fetch(`${API}/api/tractor-categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCatName }),
    });
    setNewCatName("");
    loadCategories();
  }

  async function updateCategory(id) {
    const name = prompt("New category name?");
    if (!name) return;
    await fetch(`${API}/api/tractor-categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    loadCategories();
  }

  async function deleteCategory(id) {
    if (!window.confirm("Delete this category?")) return;
    await fetch(`${API}/api/tractor-categories/${id}`, {
      method: "DELETE",
    });
    setSelectedCategory(null);
    loadCategories();
  }

  /* ---------------- PART CRUD ---------------- */
  function startEditPart(part) {
    setEditPartId(part._id);
    setPartForm({ ...part, images: [] });
  }

  async function deletePart(id) {
    if (!window.confirm("Delete this part?")) return;
    await fetch(`${API}/api/tractor-parts/${id}`, {
      method: "DELETE",
    });
    loadParts(selectedCategory._id);
  }

  async function handlePartSubmit(e) {
    e.preventDefault();
    if (!selectedCategory) return alert("Select category first");

    const fd = new FormData();
    Object.entries(partForm).forEach(([k, v]) => {
      if (k === "images") {
        Array.from(v).forEach((f) => fd.append("images", f));
      } else {
        fd.append(k, v);
      }
    });
    fd.append("category", selectedCategory._id);

    const url = editPartId
      ? `${API}/api/tractor-parts/${editPartId}`
      : `${API}/api/tractor-parts`;

    await fetch(url, { method: editPartId ? "PUT" : "POST", body: fd });

    alert(editPartId ? "Part updated" : "Part created");
    setEditPartId(null);
    setPartForm({
      partName: "",
      manufacturer: "",
      partType: "",
      brand: "",
      oemNumber: "",
      partNumber: "",
      price: "",
      msrp: "",
      currency: "INR",
      stock: "",
      year: "",
      make: "",
      model: "",
      description: "",
      images: [],
    });
    loadParts(selectedCategory._id);
  }

  /* ---------------- UI ---------------- */
  return (
    <>
      <AdminNavbar />

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-full md:w-72 bg-white border-r p-4">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Tractor Categories
          </h2>

          <div className="flex gap-2 mb-4">
            <input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="New category"
              className="flex-1 border px-2 py-1 rounded"
            />
            <button
              onClick={createCategory}
              className="bg-black text-white px-3 rounded hover:bg-gray-800"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {categories.map((c) => (
              <li
                key={c._id}
                className={`p-2 rounded flex justify-between cursor-pointer ${
                  selectedCategory?._id === c._id
                    ? "bg-red-100 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <span onClick={() => setSelectedCategory(c)}>{c.name}</span>
                <div className="flex gap-1">
                  <button onClick={() => updateCategory(c._id)}>✏️</button>
                  <button onClick={() => deleteCategory(c._id)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-bold mb-4">
            {editPartId ? "Edit Part" : "Create Part"}{" "}
            <span className="text-red-600">
              {selectedCategory?.name}
            </span>
          </h2>

          {/* Form */}
          <form
            onSubmit={handlePartSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-4 rounded border mb-6"
          >
            {[
              "partName",
              "brand",
              "manufacturer",
              "partType",
              "oemNumber",
              "partNumber",
              "year",
              "make",
              "model",
            ].map((f) => (
              <input
                key={f}
                placeholder={f}
                value={partForm[f]}
                onChange={(e) =>
                  setPartForm({ ...partForm, [f]: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
            ))}

            <input
              type="number"
              placeholder="Price"
              value={partForm.price}
              onChange={(e) =>
                setPartForm({ ...partForm, price: e.target.value })
              }
              className="border px-2 py-1 rounded"
            />

            <input
              type="number"
              placeholder="Stock"
              value={partForm.stock}
              onChange={(e) =>
                setPartForm({ ...partForm, stock: e.target.value })
              }
              className="border px-2 py-1 rounded"
            />

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setPartForm({ ...partForm, images: e.target.files })
              }
              className="md:col-span-2"
            />

            <textarea
              placeholder="Description"
              value={partForm.description}
              onChange={(e) =>
                setPartForm({ ...partForm, description: e.target.value })
              }
              className="md:col-span-2 border px-2 py-1 rounded"
            />

            <button className="md:col-span-2 bg-red-600 text-white py-2 rounded hover:bg-red-700">
              {editPartId ? "Update Part" : "Create Part"}
            </button>
          </form>

          {/* Parts List */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parts.map((p) => (
              <div
                key={p._id}
                className="bg-white border rounded p-3 shadow"
              >
                <h4 className="font-bold">{p.partName}</h4>
                <p className="text-gray-600">{p.brand}</p>
                <p className="text-red-600 font-semibold">
                  ₹{p.price} • Stock {p.stock}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => startEditPart(p)}
                    className="flex-1 bg-black text-white rounded py-1 hover:bg-gray-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePart(p._id)}
                    className="flex-1 bg-red-600 text-white rounded py-1 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}