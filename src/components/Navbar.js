

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logos from "../assets/logos.png";
import { FiPhoneCall, FiUser, FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const signupRef = useRef(null);

  /* ================= STATE ================= */
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignupCard, setShowSignupCard] = useState(false);

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [driver, setDriver] = useState(null);
  const [mechanic, setMechanic] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const CACHE_KEY = "navbar_search_cache_";
  const API = process.env.REACT_APP_API_BASE_URL;
  /* ================= ADMIN ================= */
  // useEffect(() => {
  //   setIsAdmin(localStorage.getItem("isAdmin") === "true");
  // }, []);

  useEffect(() => {
    const syncAdmin = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    syncAdmin(); // initial load
    window.addEventListener("storage", syncAdmin);

    return () => window.removeEventListener("storage", syncAdmin);
  }, []);

  /* ================= AUTH LOAD ================= */
  useEffect(() => {
    const loadAuth = () => {
      setUser(JSON.parse(localStorage.getItem("currentUser")));
      setDriver(JSON.parse(localStorage.getItem("driver")));
      setMechanic(JSON.parse(localStorage.getItem("mechanic")));
    };
    loadAuth();
    window.addEventListener("storage", loadAuth);
    return () => window.removeEventListener("storage", loadAuth);
  }, [location]);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handler = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setSuggestions([]);
        setLoading(false);
      }

      if (
        signupRef.current &&
        !signupRef.current.contains(e.target)
      ) {
        setShowSignupCard(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);



  function goToDashboard() {
    if (driver) navigate("/DriverDashboard");
    else if (mechanic) navigate("/MechanicDashboard");
    else navigate("/profile");
  }



  /* ================= HELPERS ================= */
  const isVIN = (v) => /^[A-HJ-NPR-Z0-9]{17}$/i.test(v);

  // function handleLogout() {
  //   localStorage.clear();
  //   setUser(null);
  //   setDriver(null);
  //   setMechanic(null);
  //   setIsAdmin(false);
  //   navigate("/");
  // }

  /* ================= SEARCH ================= */
  async function handleSearchInput(e) {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const cached = localStorage.getItem(CACHE_KEY + value);
    if (cached) {
      setSuggestions(JSON.parse(cached));
      return;
    }
    // https://newb-1.onrender.com
    setLoading(true);
    try {
      let results = [];
      if (isVIN(value)) {
        const res = await fetch(`${API}/api/decode-vin/${value}`);
        const json = await res.json();
        results = json.relevantParts || [];
      } else {
        const res = await fetch(
          `${API}/api/parts?search=${encodeURIComponent(value)}`
        );
        results = await res.json();
      }

      const sliced = results.slice(0, 8);
      setSuggestions(sliced);
      localStorage.setItem(CACHE_KEY + value, JSON.stringify(sliced));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(
      isVIN(search)
        ? `/catalog?vin=${search}`
        : `/catalog?search=${encodeURIComponent(search)}`
    );
    setSuggestions([]);
  }

  const displayName =
    user?.name || driver?.name || mechanic?.name;




  function handleLogout() {
    localStorage.clear();

    setUser(null);
    setDriver(null);
    setMechanic(null);
    setIsAdmin(false);

    window.dispatchEvent(new Event("storage")); // 🔥 ADD THIS
    navigate("/");
  }

  /* ================= UI ================= */
  return (
    <nav className="bg-white border-b shadow sticky top-0 z-50">
      {/* ================= TOP ================= */}
      {/* <div className="flex items-center justify-between px-4 py-3"> */}
      {/* <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3"> */}
      {/* <div className="px-4 py-3"> */}
      <div className="px-4 py-3">
        {/* TOP ROW */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <img src={logos} alt="logo" className="h-10" />
            <h2 className="text-xl font-bold whitespace-nowrap">
              FairDeal<span className="text-red-600">TruckParts</span>
            </h2>
          </div>

          {/* SEARCH — DESKTOP INLINE */}
          <div
            ref={searchRef}
            className="hidden md:block flex-1 relative"
          >
            <form onSubmit={handleSubmit}>
              <input
                value={search}
                onChange={handleSearchInput}
                placeholder="Search Part, Brand, OEM or VIN"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-600"
              />
            </form>

            {suggestions.length > 0 && (
              <div className="absolute w-full bg-white border rounded shadow-lg z-50">
                {suggestions.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => navigate(`/part/${p._id}`)}
                    className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={p.images?.[0] || "https://via.placeholder.com/40"}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{p.partName}</p>
                      <p className="text-xs text-gray-500">{p.brand}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-4">

            {/* PHONE */}
            <a
              href="tel:+919876543210"
              className="hidden md:flex items-center gap-1 text-gray-700"
            >
              <FiPhoneCall /> +91 98765 43210
            </a>

            {/* PROFILE / SIGNUP */}
            <div className="relative" ref={profileRef}>
              {displayName ? (
                <>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-1 font-medium text-gray-800 hover:text-red-600"
                  >
                    <FiUser />
                    {displayName.split(" ")[0]}
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
                      <button
                        onClick={goToDashboard}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* MOBILE SIGNUP */}
                  <div ref={signupRef} className="relative">
                  <button
                    className="md:hidden border px-3 py-1 rounded"
                    onClick={() => setShowSignupCard(!showSignupCard)}
                  >
                    Sign Up
                  </button>

                  {/* DESKTOP BUTTONS */}
                  {showSignupCard && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 md:hidden">
                      <button
                        onClick={() => navigate("/SignupStep1")}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        User Signup
                      </button>

                      <button
                        onClick={() => navigate("/DriverSignup")}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Driver Signup
                      </button>

                      <button
                        onClick={() => navigate("/MechanicSignup")}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Mechanic Signup
                      </button>
                    </div>
                  )}
                  </div>
                  <div className="hidden md:flex gap-3">
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded"
                      onClick={() => navigate("/SignupStep1")}
                    >
                      User
                    </button>
                    <button
                      className="bg-gray-800 text-white px-4 py-2 rounded"
                      onClick={() => navigate("/DriverSignup")}
                    >
                      Driver
                    </button>
                    <button
                      className="bg-black text-white px-4 py-2 rounded"
                      onClick={() => navigate("/MechanicSignup")}
                    >
                      Mechanic
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SEARCH — MOBILE BELOW */}
        <div ref={searchRef} className="mt-3 md:hidden relative">
          <form onSubmit={handleSubmit}>
            <input
              value={search}
              onChange={handleSearchInput}
              placeholder="Search Part, Brand, OEM or VIN"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-600"
            />
          </form>
        </div>
      </div>

      {/* </div> */}

      {/* ================= HORIZONTAL ROUTES ================= */}
      {/* <div className="overflow-x-auto whitespace-nowrap px-4 py-2 bg-gray-50 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/catalog">Parts for trucks</Link>
        <Link to="/tractor-category">Tractor Parts</Link>
        <Link to="/PickupCategory">Pickup Parts</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/my-orders">My Orders</Link>
        <Link to="/CustomerProblem">Raise a Problem</Link>
        {isAdmin && <Link to="/admin" className="text-red-600 font-bold">Admin</Link>}
      </div> */}


      <div className="overflow-x-auto whitespace-nowrap px-4 py-2 bg-gray-50 flex gap-4">

        <NavLink to="/" className={({ isActive }) => isActive ? "text-red-600 font-bold" : ""}>
          Home
        </NavLink>

        <NavLink to="/catalog" className={({ isActive }) => isActive ? "text-red-600 font-bold" : ""}>
          Parts for trucks
        </NavLink>

        <NavLink to="/tractor-category" className={({ isActive }) => isActive ? "text-red-600 font-bold" : ""}>
          Tractor Parts
        </NavLink>

        <NavLink to="/PickupCategory" className={({ isActive }) => isActive ? "text-red-600 font-bold" : ""}>
          Pickup Parts
        </NavLink>

        <NavLink to="/checkout" className={({ isActive }) => isActive ? "text-red-600 font-bold" : ""}>
          Checkout
        </NavLink>

        <NavLink to="/my-orders" className={({ isActive }) => isActive ? "text-red-600 font-bold" : ""}>
          My Orders
        </NavLink>

        <NavLink to="/CustomerProblem" className={({ isActive }) => isActive ? "text-red-600 font-bold" : ""}>
          Raise a Problem
        </NavLink>

        {isAdmin && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? "text-red-700 font-bold" : "text-red-600"}>
            Admin
          </NavLink>
        )}
      </div>
    </nav>
  );
}


