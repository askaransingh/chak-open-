
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";


// // export default function MechanicLogin() {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({});
// //   const [bank, setBank] = useState({});
// //   const [showBankForm, setShowBankForm] = useState(false);
// //   const [mechanicId, setMechanicId] = useState(null);

// //   const submitLogin = async () => {
// //     const res = await fetch("http://localhost:6003/mechanic/login", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(form)
// //     });

// //     const data = await res.json();

// //     if (!res.ok) {
// //       alert(data.error);
// //       return;
// //     }

// //     if (data.requireBankDetails) {
// //       setMechanicId(data.mechanic.id);
// //       setShowBankForm(true);
// //       return;
// //     }

// //     localStorage.setItem("mechanic", JSON.stringify(data.mechanic));
// //     navigate("/MechanicDashboard");
// //   };

// //   const submitBankDetails = async () => {
// //   const res = await fetch(
// //     `http://localhost:6003/mechanic/${mechanicId}/bank-details`,
// //     {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(bank)
// //     }
// //   );

// //   const data = await res.json();

// //   if (!res.ok) {
// //     alert("Failed to save bank details");
// //     return;
// //   }

// //   // ✅ STORE MECHANIC AFTER BANK DETAILS
// //   localStorage.setItem("mechanic", JSON.stringify(data.mechanic));

// //   alert("Bank details saved");
// //   navigate("/MechanicDashboard");
// // };

// //   return (
// //     <>
// //       {!showBankForm ? (
// //         <>
// //           <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
// //           <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
// //           <button onClick={submitLogin}>Login</button>
// //         </>
// //       ) : (
// //         <>
// //           <input placeholder="Account Holder Name" onChange={e => setBank({ ...bank, name: e.target.value })} />
// //           <input placeholder="Account Number" onChange={e => setBank({ ...bank, accountNumber: e.target.value })} />
// //           <input placeholder="IFSC" onChange={e => setBank({ ...bank, ifsc: e.target.value })} />
// //           <button onClick={submitBankDetails}>Save Bank Details</button>
// //         </>
// //       )}
// //     </>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function MechanicLogin() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [bank, setBank] = useState({
//     name: "",
//     accountNumber: "",
//     ifsc: "",
//   });

//   const [showBankForm, setShowBankForm] = useState(false);
//   const [mechanicId, setMechanicId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   /* ✅ Load cached login email */
//   useEffect(() => {
//     const cached = localStorage.getItem("mechanicLogin");
//     if (cached) setForm(JSON.parse(cached));
//   }, []);

//   /* ✅ Cache login email */
//   useEffect(() => {
//     localStorage.setItem(
//       "mechanicLogin",
//       JSON.stringify({ email: form.email })
//     );
//   }, [form.email]);

//   const submitLogin = async () => {
//     if (!form.email || !form.password) {
//       alert("Please fill all fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:6003/mechanic/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error);
//         return;
//       }

//       if (data.requireBankDetails) {
//         setMechanicId(data.mechanic.id);
//         setShowBankForm(true);
//         return;
//       }

//       localStorage.setItem("mechanic", JSON.stringify(data.mechanic));
//       navigate("/MechanicDashboard");
//     } catch (err) {
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitBankDetails = async () => {
//     if (!bank.name || !bank.accountNumber || !bank.ifsc) {
//       alert("Please fill all bank details");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(
//         `http://localhost:6003/mechanic/${mechanicId}/bank-details`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(bank),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert("Failed to save bank details");
//         return;
//       }

//       localStorage.setItem("mechanic", JSON.stringify(data.mechanic));
//       alert("Bank details saved successfully");
//       navigate("/MechanicDashboard");
//     } catch (err) {
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
//         <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
//           {showBankForm ? "🏦 Bank Details" : "🔧 Mechanic Login"}
//         </h2>

//         {!showBankForm ? (
//           <>
//             <input
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) =>
//                 setForm({ ...form, email: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               onChange={(e) =>
//                 setForm({ ...form, password: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
//             />

//             <button
//               onClick={submitLogin}
//               disabled={loading}
//               className={`w-full py-2 rounded text-white font-semibold transition
//                 ${
//                   loading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-black hover:bg-red-600"
//                 }`}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               placeholder="Account Holder Name"
//               onChange={(e) =>
//                 setBank({ ...bank, name: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded mb-3"
//             />

//             <input
//               placeholder="Account Number"
//               onChange={(e) =>
//                 setBank({ ...bank, accountNumber: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded mb-3"
//             />

//             <input
//               placeholder="IFSC Code"
//               onChange={(e) =>
//                 setBank({ ...bank, ifsc: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded mb-4"
//             />

//             <button
//               onClick={submitBankDetails}
//               disabled={loading}
//               className={`w-full py-2 rounded text-white font-semibold transition
//                 ${
//                   loading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-black hover:bg-red-600"
//                 }`}
//             >
//               {loading ? "Saving..." : "Save Bank Details"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MechanicLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const API = process.env.REACT_APP_API_BASE_URL;
  // ✅ Load cached email
  useEffect(() => {
    const cached = localStorage.getItem("mechanicLogin");
    if (cached) setForm(JSON.parse(cached));
  }, []);

  // ✅ Cache email on change
  useEffect(() => {
    localStorage.setItem("mechanicLogin", JSON.stringify({ email: form.email }));
  }, [form.email]);

  const submitLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
// https://newb-1.onrender.com
    setLoading(true);
    try {
      const res = await fetch(`${API}/mechanic/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("mechanic", JSON.stringify(data.mechanic));
      localStorage.removeItem("mechanicLogin");

      navigate("/MechanicDashboard");
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          🔧 Mechanic Login
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={submitLogin}
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-red-600"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-gray-600 mt-5 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-red-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/MechanicSignup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}