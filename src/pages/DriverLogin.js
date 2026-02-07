// import React, { useState } from "react";

// function DriverLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:6003/api/drivers/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("driver", JSON.stringify(data.driver));
//       window.location.href = "/DriverDashboard";
//     } else {
//       setMessage(data.message || "Login failed");
//     }
//   };

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>Driver Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         /><br />
//         <input
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         /><br />
//         <button type="submit">Login</button>
//       </form>
//       {message && <p style={{ color: "red" }}>{message}</p>}
//     </div>
//   );
// }

// export default DriverLogin;
// https://newb-1.onrender.com
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DriverLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
   const API = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  // ✅ Load cached email if available
  useEffect(() => {
    const cachedEmail = localStorage.getItem("driverEmail");
    if (cachedEmail) setEmail(cachedEmail);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API}/api/drivers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // ✅ Cache driver info
        localStorage.setItem("driver", JSON.stringify(data.driver));
        localStorage.setItem("driverEmail", email);

        // Redirect to dashboard
        navigate("/DriverDashboard");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
          🚚 Driver Login
        </h2>

        {message && (
          <p className="text-red-600 font-semibold mb-4 text-center">{message}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-red-600"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Not registered yet?{" "}
          <span
            className="text-red-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/DriverSignup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default DriverLogin;