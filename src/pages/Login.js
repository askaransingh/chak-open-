// // // import React, { useState } from "react";
// // // import { loginUser } from "../api";
// // // import "./Login.css";
// // // import { Navigate } from "react-router-dom";

// // // function Login() {
// // //   const [form, setForm] = useState({ email: "", password: "" });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const res = await loginUser(form);
// // //     if (res.user) alert("Login successful!");
// // //     else alert(res.error || "Login failed");
// // //      Navigate("/");
// // //   };

// // //   return (
// // //     <div className="login-container">
// // //       <h2>Login</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         <input type="email" placeholder="Email" required
// // //           onChange={(e) => setForm({ ...form, email: e.target.value })} />
// // //         <input type="password" placeholder="Password" required
// // //           onChange={(e) => setForm({ ...form, password: e.target.value })} />
// // //         <button type="submit">Login</button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default Login;
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom"; // ✅ useNavigate, not Navigate
// // import { loginUser } from "../api";


// // function Login() {
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const navigate = useNavigate(); // ✅ Hook for navigation

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const res = await loginUser(form);

// //     if (res.user) {
// //       alert("Login successful!");

// //       // ✅ Save user info in localStorage for Navbar
// //       localStorage.setItem("signupStep1", JSON.stringify(res.user));

// //       window.dispatchEvent(new Event("storage"));

// //       // ✅ Navigate to homepage
// //       navigate("/");
// //     } else {
// //       alert(res.error || "Login failed");
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <h2>Login</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           required
// //           onChange={(e) => setForm({ ...form, email: e.target.value })}
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           required
// //           onChange={(e) => setForm({ ...form, password: e.target.value })}
// //         />
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Login;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Pre-fill form from cache if exists
//   useEffect(() => {
//     const cachedEmail = localStorage.getItem("cachedEmail");
//     if (cachedEmail) {
//       setForm((prev) => ({ ...prev, email: cachedEmail }));
//     }
//   }, []);



//   const ADMIN_SECRET = "ADMIN@123";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await loginUser(form);

//       if (res.user) {
//         alert("✅ Login successful!");

//         localStorage.setItem("signupStep1", JSON.stringify(res.user));
//         localStorage.setItem("cachedEmail", form.email);

//         // 🔐 Admin unlock logic
//         if (form.password === ADMIN_SECRET) {
//           localStorage.setItem("isAdmin", "true");
//         } else {
//           localStorage.removeItem("isAdmin");
//         }

//         window.dispatchEvent(new Event("storage"));
//         navigate("/");
//       } else {
//         alert(res.error || "❌ Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Server error");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-200">
//         <h2 className="text-2xl font-bold text-center text-black mb-6">🔑 Login</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               required
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               required
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded text-white font-semibold transition
//               ${loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-black hover:bg-red-600"
//               }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* Extra Links */}
//         <p className="text-center text-gray-600 mt-4 text-sm">
//           Don't have an account?{" "}
//           <span
//             className="text-red-600 font-semibold cursor-pointer hover:underline"
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ================= ADMIN CREDS ================= */
  const ADMIN_EMAIL = "admin@fairdealtruckpartsj.com";
  const ADMIN_SECRET = "ADMIN@j123";
  const API = process.env.REACT_APP_API_BASE_URL;
  /* ================= PREFILL EMAIL ================= */
  useEffect(() => {
    const cachedEmail = localStorage.getItem("cachedEmail");
    if (cachedEmail) {
      setForm((prev) => ({ ...prev, email: cachedEmail }));
    }
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      const res = await loginUser(form);

      if (!res.user) {
        alert(res.error || "❌ Login failed");
        return;
      }

      const user = res.user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("✅ Login successful!");

      // localStorage.setItem("currentUser", JSON.stringify(res.user));
      localStorage.setItem("cachedEmail", form.email);

      /* ================= ADMIN CHECK ================= */
      if (
        form.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
        form.password === ADMIN_SECRET
      ) {
        localStorage.setItem("isAdmin", "true");
      } else {
        localStorage.removeItem("isAdmin");
      }

      /* 🔄 Notify Navbar */
      window.dispatchEvent(new Event("storage"));

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border">
        <h2 className="text-2xl font-bold text-center mb-6">
          🔑 Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full p-3 border rounded focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full p-3 border rounded focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white font-semibold
              ${loading
                ? "bg-gray-400"
                : "bg-black hover:bg-red-600"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* SIGNUP LINK */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/SignupStep1")}
            className="text-red-600 font-semibold cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}