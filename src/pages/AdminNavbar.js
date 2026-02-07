


// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./AdminNavbar.css"; // ✅ Import CSS file

// const AdminNavbar = () => {
//   const location = useLocation();

//   const navLinks = [
//     { path: "/admins", label: "Truck Admin" },
//     { path: "/tractor-category-admin", label: "Tractor Admin" },
//     { path: "/PickupAdmin", label: "Pickup Admin" },
//     { path: "/admin/orders", label: "Orders" },
//     { path: "/invoice", label: "Invoice" },
//     { path: "/admin-users", label: "users" },
//   ];

//   return (
//     <nav className="admin-navbar" style={{margin: "20px"}}>
//       {/* Logo / Brand */}
//       <div className="brand">FairDealTruckParts Admin</div>

//       {/* Navigation Links */}
//       <div className="nav-links">
//         {navLinks.map((link) => (
//           <Link
//             key={link.path}
//             to={link.path}
//             className={location.pathname === link.path ? "active" : ""}
//           >
//             {link.label}
//           </Link>
//         ))}
//       </div>

//       {/* Logout Button */}
//       <button
//         onClick={() => {
//           localStorage.removeItem("adminToken");
//           window.location.href = "/login";
//         }}
//         className="logout-btn"
//       >
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default AdminNavbar;


// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./AdminNavbar.css";

// const AdminNavbar = () => {
//   const location = useLocation();

//   const navLinks = [
//     { path: "/AdminDashboard", label: "Dashboard" },
//     { path: "/AdminDrivers", label: "Drivers" },
//     { path: "/AssignJob", label: "Assign Job" },

//     { path: "/admins", label: "Truck Admin" },
//     { path: "/tractor-category-admin", label: "Tractor Admin" },
//     { path: "/PickupAdmin", label: "Pickup Admin" },
//     { path: "/admin/orders", label: "Orders" },
//     { path: "/invoice", label: "Invoice" },
//     { path: "/admin-users", label: "Users" },
//     { path: "/admin/completed-jobs", label: "Completed Jobs" },
//     { path: "/invoice-history", label: "Invoice History" },
//     { path: "/AdminDeliveredOrders", label: "Delivered Orders" },
//     // /AdminAllOrders
//     { path: "/AdminAllOrders", label: "All Orders" }
//   ];

//   return (
//     <nav className="admin-navbar" style={{ margin: "20px" }}>
//       {/* Brand */}
//       <div className="brand">FairDealTruckParts Admin</div>

//       {/* Links */}
//       <div className="nav-links">
//         {navLinks.map((link) => (
//           <Link
//             key={link.path}
//             to={link.path}
//             className={location.pathname === link.path ? "active" : ""}
//           >
//             {link.label}
//           </Link>
//         ))}
//       </div>

//       {/* Logout */}
//       <button
//         onClick={() => {
//           localStorage.removeItem("adminToken");
//           window.location.href = "/login";
//         }}
//         className="logout-btn"
//       >
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default AdminNavbar;

import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_CACHE_KEY = "admin_last_route";
const API = process.env.REACT_APP_API_BASE_URL;
const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: "/AdminDashboard", label: "Dashboard" },
    { path: "/AdminDrivers", label: "Drivers" },
    { path: "/AssignJob", label: "Assign Job" },
    { path: "/admins", label: "Truck Admin" },
    { path: "/tractor-category-admin", label: "Tractor Admin" },
    { path: "/PickupAdmin", label: "Pickup Admin" },
    { path: "/admin/orders", label: "Orders" },
    { path: "/invoice", label: "Invoice" },
    { path: "/invoice-history", label: "Invoice History" },
    { path: "/admin-users", label: "Users" },
    { path: "/admin/completed-jobs", label: "Completed Jobs" },
    { path: "/AdminDeliveredOrders", label: "Delivered Orders" },
    { path: "/AdminAllOrders", label: "All Orders" },
  ];

  /* ================= CACHE ACTIVE ROUTE ================= */
  useEffect(() => {
    localStorage.setItem(NAV_CACHE_KEY, location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const cached = localStorage.getItem(NAV_CACHE_KEY);
    if (cached && cached !== location.pathname) {
      navigate(cached, { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem(NAV_CACHE_KEY);
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">

        {/* BRAND */}
        <div className="text-lg font-bold text-white tracking-wide">
          FairDeal<span className="text-red-600">Admin</span>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* NAV LINKS */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap px-4 py-2 rounded text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-red-600 text-white shadow"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default AdminNavbar;