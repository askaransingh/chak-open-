// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function DriverSignup() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   const form = new FormData();
//   form.append("name", formData.name);
//   form.append("email", formData.email);
//   form.append("phone", formData.phone);
//   form.append("password", formData.password);

//   form.append("drivingLicense", e.target.drivingLicense.files[0]);
//   form.append("abstractPaper", e.target.abstractPaper.files[0]);
//   form.append("insurance", e.target.insurance.files[0]);

//   try {
//     const res = await fetch("http://localhost:6003/api/drivers/register", {
//       method: "POST",
//       body: form,
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("✅ Registered successfully! Wait for admin approval.");
//       navigate("/");
//     } else {
//       alert(data.message || "Registration failed");
//     }
//   } catch (err) {
//     alert("Server error");
//   }

//   setLoading(false);
// };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #007bff, #00d4ff)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           background: "#fff",
//           padding: "40px",
//           borderRadius: "12px",
//           width: "400px",
//           boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//           🚚 Driver Sign Up
//         </h2>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             required
//             value={formData.name}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Driving Licence</label>
//           <input type="file" name="drivingLicense" required />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Abstract Paper</label>
//           <input type="file" name="abstractPaper" required />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Insurance</label>
//           <input type="file" name="insurance" required />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: "10px",
//             background: loading ? "#aaa" : "#007bff",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             fontSize: "16px",
//             cursor: "pointer",
//           }}
//         >
//           {loading ? "Registering..." : "Sign Up"}
//         </button>

//         <p style={{ textAlign: "center", marginTop: "15px" }}>
//           Already registered?{" "}
//           <span
//             style={{ color: "#007bff", cursor: "pointer" }}
//             onClick={() => navigate("/DriverLogin")}
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   marginTop: "5px",
//   borderRadius: "5px",
//   border: "1px solid #ccc",
//   fontSize: "15px",
// };

// // export default DriverSignup;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const CACHE_KEY = "driver_signup_draft";

// export default function DriverSignup() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [files, setFiles] = useState({
//     drivingLicense: null,
//     abstractPaper: null,
//     insurance: null,
//   });

//   const [loading, setLoading] = useState(false);

//   /* 🔴 Load cached form */
//   useEffect(() => {
//     const cached = localStorage.getItem(CACHE_KEY);
//     if (cached) {
//       setFormData(JSON.parse(cached));
//     }
//   }, []);

//   /* 🩶 Save form to cache */
//   useEffect(() => {
//     localStorage.setItem(CACHE_KEY, JSON.stringify(formData));
//   }, [formData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFiles({ ...files, [e.target.name]: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!files.drivingLicense || !files.abstractPaper || !files.insurance) {
//       return alert("Please upload all required documents");
//     }

//     setLoading(true);

//     const form = new FormData();
//     Object.entries(formData).forEach(([key, value]) =>
//       form.append(key, value)
//     );
//     Object.entries(files).forEach(([key, value]) =>
//       form.append(key, value)
//     );

//     try {
//       const res = await fetch(
//         "http://localhost:6003/api/drivers/register",
//         {
//           method: "POST",
//           body: form,
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       alert("✅ Registered successfully! Await admin approval.");
//       localStorage.removeItem(CACHE_KEY);
//       navigate("/");

//     } catch (err) {
//       alert(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg p-6"
//       >
//         {/* Header */}
//         <h2 className="text-2xl font-bold text-black text-center mb-6 border-b-2 border-red-600 pb-2">
//           🚚 Driver Registration
//         </h2>

//         {/* Inputs */}
//         <div className="space-y-4">

//           <input
//             name="name"
//             placeholder="Full Name"
//             required
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-black"
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-black"
//           />

//           <input
//             name="phone"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-black"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-black"
//           />

//           {/* File uploads */}
//           <div className="space-y-3 text-sm text-gray-700">

//             <label className="block">
//               Driving Licence
//               <input
//                 type="file"
//                 name="drivingLicense"
//                 required
//                 onChange={handleFileChange}
//                 className="mt-1 block w-full text-sm"
//               />
//             </label>

//             <label className="block">
//               Abstract Paper
//               <input
//                 type="file"
//                 name="abstractPaper"
//                 required
//                 onChange={handleFileChange}
//                 className="mt-1 block w-full text-sm"
//               />
//             </label>

//             <label className="block">
//               Insurance Document
//               <input
//                 type="file"
//                 name="insurance"
//                 required
//                 onChange={handleFileChange}
//                 className="mt-1 block w-full text-sm"
//               />
//             </label>

//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded text-white font-semibold transition
//               ${loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-red-600 hover:bg-red-700"
//               }`}
//           >
//             {loading ? "Registering..." : "Sign Up"}
//           </button>

//           {/* Footer */}
//           <p className="text-center text-sm text-gray-700">
//             Already registered?{" "}
//             <span
//               className="text-red-600 font-semibold cursor-pointer hover:underline"
//               onClick={() => navigate("/DriverLogin")}
//             >
//               Login
//             </span>
//           </p>

//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CACHE_KEY = "driver_signup_draft";

export default function DriverSignup() {
  const navigate = useNavigate();
   const API = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [files, setFiles] = useState({
    drivingLicense: null,
    abstractPaper: null,
    insurance: null,
  });

  const [loading, setLoading] = useState(false);

  /* 🔴 Load cached form */
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      setFormData(JSON.parse(cached));
    }
  }, []);

  /* 🩶 Save form to cache */
  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.drivingLicense || !files.abstractPaper || !files.insurance) {
      return alert("Please upload all required documents");
    }

    setLoading(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      form.append(key, value)
    );
    Object.entries(files).forEach(([key, value]) =>
      form.append(key, value)
    );
// https://newb-1.onrender.com
    try {
      const res = await fetch(
        `${API}/api/drivers/register`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("✅ Registered successfully! Await admin approval.");
      localStorage.removeItem(CACHE_KEY);
      navigate("/");

    } catch (err) {
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg p-6"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-black text-center mb-6 border-b-2 border-red-600 pb-2">
          🚚 Driver Registration
        </h2>

        {/* Inputs */}
        <div className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-black"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-black"
          />

          {/* File uploads */}
          <div className="space-y-3 text-sm text-gray-700">

            <label className="block">
              Driving Licence
              <input
                type="file"
                name="drivingLicense"
                required
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm"
              />
            </label>

            <label className="block">
              Abstract Paper
              <input
                type="file"
                name="abstractPaper"
                required
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm"
              />
            </label>

            <label className="block">
              Insurance Document
              <input
                type="file"
                name="insurance"
                required
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm"
              />
            </label>

          </div>

          {/* Submit */}

          {/* <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "black" }}
    //         className={`w-full py-2 rounded text-white font-semibold transition
    // focus:outline-none focus:ring-0 active:outline-none
    // ${loading
    //             ? "bg-gray-400 cursor-not-allowed"
    //             : "bg-black hover:bg-gray-900"
    //           }`}
            className="w-full text-white py-2 rounded-sm hover:bg-gray-800 transition"

          >
            {loading ? "Registering..." : "Sign Up"}
          </button> */}
          {/* <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-sm text-white font-semibold transition
    focus:outline-none focus:ring-0 active:outline-none
    ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-red-600"
              }`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button> */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-sm text-white font-semibold
    bg-black
    hover:bg-red-600
    active:bg-black
    focus:bg-black
    focus:outline-none
    focus:ring-0
    active:outline-none
    transition
    ${loading ? "opacity-60 cursor-not-allowed" : ""}
  `}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-700">
            Already registered?{" "}
            <span
              className="text-red-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/DriverLogin")}
            >
              Login
            </span>
          </p>

        </div>
      </form>
    </div>
  );
}