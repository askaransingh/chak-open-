

// src/pages/CategoryPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [search, setSearch] = useState("");
  const [vin, setVin] = useState("");
  const [loadingParts, setLoadingParts] = useState(false);
  const [vinMode, setVinMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const CACHE_KEY = "category_parts_cache";
  const API = process.env.REACT_APP_API_BASE_URL;
  const [cart, setCart] = useState(() => {
    if (location.state?.cart?.length > 0) return location.state.cart;
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const key = user ? `cart_${user.email}` : "cart_guest";
    return JSON.parse(localStorage.getItem(key)) || [];
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const key = user ? `cart_${user.email}` : "cart_guest";
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);

    fetchCategoriesAndParts();
  }, []);
  // https://newb-1.onrender.com
  async function fetchCategoriesAndParts() {
    setLoadingParts(true);
    try {
      const catRes = await fetch(`${API}/api/categories`);
      const categoriesData = await catRes.json();
      const partsRes = await fetch(`${API}/api/parts`);
      const partsData = await partsRes.json();

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



  useEffect(() => {
    if (vinMode) {
      // VIN mode: skip category and search filters
      return;
    }

    if (!selectedCat) return;

    let data = parts.filter(
      (p) => p.category === selectedCat._id || p.category?._id === selectedCat._id
    );

    const term = search.toLowerCase().trim();
    if (term) {
      data = data.filter(
        (p) =>
          p.partName?.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term) ||
          p.partNumber?.toLowerCase().includes(term) ||
          p.oemNumber?.toLowerCase().includes(term)
      );
    }

    setFilteredParts(data);
    setCurrentPage(1);
  }, [selectedCat, search, parts, vinMode]);

  const handleAddToCart = (part) => {
    const existing = cart.find((i) => i._id === part._id);
    const updated = existing
      ? cart.map((i) => (i._id === part._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i))
      : [...cart, { ...part, quantity: 1 }];
    setCart(updated);
  };

  const handleGoToCheckout = () => navigate("/checkout", { state: { cart } });




  const handleVinDecode = async () => {
    if (!vin) return alert("Enter VIN");
    try {
      const res = await fetch(`${API}/decode-vin/${vin}`);
      const json = await res.json();
      const vinParts = Array.isArray(json.relevantParts) ? json.relevantParts : [];

      setVinMode(true);           // VIN mode ON
      setSelectedCat(null);       // clear category
      setSearch("");              // clear search
      setPriceFilter({ min: "", max: "" }); // reset price

      setFilteredParts(vinParts);  // directly set filtered parts
    } catch (err) {
      console.error(err);
      alert("VIN decode failed");
    }
  };

  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const applyPriceFilter = () => {
    const min = parseFloat(priceFilter.min) || 0;
    const max = parseFloat(priceFilter.max) || Infinity;
    const filtered = parts.filter((p) => Number(p.price) >= min && Number(p.price) <= max);
    setFilteredParts(filtered);
    setCurrentPage(1);
  };

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const safeFilteredParts = Array.isArray(filteredParts) ? filteredParts : [];
  const paginatedParts = safeFilteredParts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(safeFilteredParts.length / itemsPerPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Clear manual search
  const clearSearch = () => {
    setSearch("");
    setSelectedCat(null);
    setPriceFilter({ min: "", max: "" });
    setVin("");          // clear VIN too if needed
    setCurrentPage(1);
    // Restore full parts
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      setParts(parsed.parts || []);
      setFilteredParts(parsed.parts || []);
      if (parsed.categories?.length) setSelectedCat(parsed.categories[0]);
    }
  };

  // Clear VIN input
  const clearVinSearch = () => {
    setVin("");
    setVinMode(false);
    setSelectedCat(null);
    setSearch("");
    setPriceFilter({ min: "", max: "" });
    setCurrentPage(1);

    // restore full parts
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      setParts(parsed.parts || []);
      setFilteredParts(parsed.parts || []);
      if (parsed.categories?.length) setSelectedCat(parsed.categories[0]);
    }
  };

  return (
    // <div className="min-h-screen bg-gray-50">
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}

      <div className="md:hidden p-2 flex justify-between items-center bg-red-600 text-white">
        <h3 className="font-bold">Categories</h3>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white font-bold text-xl"
        >
          {sidebarOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* <div className="flex"> */}
      <div className="flex w-full">

        {/* Sidebar */}


        {/* <aside
          className={`bg-gray-100 p-4 md:sticky md:top-0 h-auto md:h-screen overflow-y-auto transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-20 w-64`}
        > */}
        {/* <aside
          className={`
    bg-gray-100 p-4
    fixed md:sticky top-39 left-0
    h-screen overflow-y-auto
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
            {categories.map((cat) => (
              <li
                key={cat._id}
                className={`p-2 rounded cursor-pointer ${selectedCat?._id === cat._id
                  ? "bg-red-100 font-semibold"
                  : "hover:bg-gray-200"
                  }`}
                onClick={() => {
                  setSelectedCat(cat);
                  setSidebarOpen(false);
                }}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Overlay (mobile only) */}
        {/* {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )} */}
        {/* REMOVE THIS BLOCK COMPLETELY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-10 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* MAIN CONTENT */}
        {/* <main className="flex-1 p-4"> */}
        <main className="flex-1 p-4 w-full">

          {/* Search + Checkout */}
          <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">

            <div className="relative w-full md:w-1/2">
              <input
                placeholder="Search parts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 pr-8 border border-gray-400 rounded w-full"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  ✖
                </button>
              )}
            </div>

            <button
              onClick={handleGoToCheckout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Checkout ({cart.reduce((s, i) => s + (i.quantity || 1), 0)})
            </button>
          </div>

          {/* VIN + Price filter */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 flex-1">
              {/* <input
                placeholder="Enter VIN to decode"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                className="p-2 border border-gray-400 rounded w-full md:w-2/3"
              /> */}
              <div className="relative w-full md:w-2/3">
                <input
                  placeholder="Enter VIN to decode"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  className="p-2 pr-8 border border-gray-400 rounded w-full"
                />
                {vin && (
                  <button
                    onClick={clearVinSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    ✖
                  </button>
                )}
              </div>

              <button
                onClick={handleVinDecode}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
              >
                Decode VIN
              </button>
            </div>

            <div className="flex gap-2 flex-1 md:justify-end">
              <input
                type="number"
                placeholder="Min"
                value={priceFilter.min}
                onChange={(e) =>
                  setPriceFilter({ ...priceFilter, min: e.target.value })
                }
                className="p-2 border border-gray-400 rounded w-24"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceFilter.max}
                onChange={(e) =>
                  setPriceFilter({ ...priceFilter, max: e.target.value })
                }
                className="p-2 border border-gray-400 rounded w-24"
              />
              <button
                onClick={applyPriceFilter}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Parts grid */}
          {loadingParts ? (
            <p className="text-gray-700">Loading parts…</p>
          ) : paginatedParts.length === 0 ? (
            <p className="text-gray-700 text-center mt-10">
              ❌ No matching parts found
            </p>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {paginatedParts.map((p) => (
                <div
                  key={p._id}
                  className="border border-gray-300 rounded p-2 bg-white flex flex-col hover:shadow-lg transition-shadow"
                >
                  <div className="w-full h-40 flex justify-center items-center bg-gray-200">
                    {/* https://newb-1.onrender.com */}
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
                      onClick={() => navigate(`/part/${p._id}`)}
                      className="flex-1 bg-black text-white rounded py-1 hover:bg-gray-900"
                    >
                      View Details
                    </button>

                    <button
                      disabled={cart.some((i) => i._id === p._id)}
                      onClick={() => handleAddToCart(p)}
                      className={`flex-1 rounded py-1 ${cart.some((i) => i._id === p._id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                    >
                      {cart.some((i) => i._id === p._id)
                        ? "Added"
                        : "Add to Cart"}
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
    </div>
  );
}