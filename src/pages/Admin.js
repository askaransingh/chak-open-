

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
    year: "",
    make: "",
    model: "",
    brand: "",
    manufacturer: "",
    partType: "",
    oemNumber: "",
    partNumber: "",
    price: "",
    msrp: "",
    currency: "INR",
    stock: "",
    description: "",
    images: [],
  });

  /* -------------------- CACHE KEYS -------------------- */
  const CAT_CACHE = "admin_categories_cache";
  const PART_CACHE = (id) => `admin_parts_${id}`;

  /* -------------------- LOAD CATEGORIES -------------------- */
  useEffect(() => {
    loadCategories();
  }, []);
// https://newb-1.onrender.com
  async function loadCategories() {
    try {
      const res = await fetch(`${API}/api/categories`);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
      localStorage.setItem(CAT_CACHE, JSON.stringify(data));

      if (data.length && !selectedCategory) {
        setSelectedCategory(data[0]);
      }
    } catch {
      const cached = localStorage.getItem(CAT_CACHE);
      if (cached) setCategories(JSON.parse(cached));
    }
  }

  /* -------------------- LOAD PARTS -------------------- */
  useEffect(() => {
    if (selectedCategory) loadParts(selectedCategory._id);
    else setParts([]);
  }, [selectedCategory]);

  async function loadParts(catId) {
    try {
      const res = await fetch(`${API}/api/parts?category=${catId}`);
      const data = await res.json();
      setParts(Array.isArray(data) ? data : []);
      localStorage.setItem(PART_CACHE(catId), JSON.stringify(data));
    } catch {
      const cached = localStorage.getItem(PART_CACHE(catId));
      if (cached) setParts(JSON.parse(cached));
    }
  }

  /* -------------------- CATEGORY CRUD -------------------- */
  async function createCategory() {
    if (!newCatName.trim()) return alert("Category name required");
    await fetch(`${API}/api/categories`, {
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
    await fetch(`${API}/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    loadCategories();
  }

  async function deleteCategory(id) {
    if (!window.confirm("Delete this category?")) return;
    await fetch(`${API}/api/categories/${id}`, { method: "DELETE" });
    setSelectedCategory(null);
    loadCategories();
  }

  /* -------------------- PART CREATE / UPDATE -------------------- */
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
      ? `${API}/api/parts/${editPartId}`
      : `${API}/api/parts`;

    await fetch(url, { method: editPartId ? "PUT" : "POST", body: fd });

    alert(editPartId ? "Part updated" : "Part created");
    setEditPartId(null);
    setPartForm({
      partName: "",
      year: "",
      make: "",
      model: "",
      brand: "",
      manufacturer: "",
      partType: "",
      oemNumber: "",
      partNumber: "",
      price: "",
      msrp: "",
      currency: "INR",
      stock: "",
      description: "",
      images: [],
    });
    loadParts(selectedCategory._id);
  }

  function startEdit(part) {
    setEditPartId(part._id);
    setPartForm({ ...part, images: [] });
  }

  async function deletePart(id) {
    if (!window.confirm("Delete this part?")) return;
    await fetch(`${API}/api/parts/${id}`, { method: "DELETE" });
    loadParts(selectedCategory._id);
  }

  /* -------------------- UI -------------------- */
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-full md:w-72 bg-white border-r border-gray-300 p-4">
          <h2 className="text-xl font-bold text-red-600 mb-4">Categories</h2>

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
                className={`p-2 rounded cursor-pointer flex justify-between items-center ${
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
          <h2 className="text-2xl font-bold mb-4 text-black">
            {editPartId ? "Edit Part" : "Create Part"} —{" "}
            <span className="text-red-600">{selectedCategory?.name}</span>
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
              onChange={(e) => setPartForm({ ...partForm, price: e.target.value })}
              className="border px-2 py-1 rounded"
            />

            <input
              type="number"
              placeholder="Stock"
              value={partForm.stock}
              onChange={(e) => setPartForm({ ...partForm, stock: e.target.value })}
              className="border px-2 py-1 rounded"
            />

            <input
              type="file"
              multiple
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {parts.map((p) => (
              <div key={p._id} className="bg-white border rounded p-3 shadow">
                <h4 className="font-bold">{p.partName}</h4>
                <p className="text-gray-600">{p.brand}</p>
                <p className="text-red-600 font-semibold">
                  ₹{p.price} • Stock {p.stock}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="flex-1 bg-black text-white rounded py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePart(p._id)}
                    className="flex-1 bg-red-600 text-white rounded py-1"
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