

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function MechanicSignup() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     skills: "",
//     password: "",
//     agreedToTerms: false
//   });

//   const [files, setFiles] = useState({});

//   const submit = async () => {
//     if (!form.agreedToTerms) {
//       alert("You must agree to terms");
//       return;
//     }

//     // ✅ CREATE FormData HERE (VERY IMPORTANT)
//     const fd = new FormData();

//     Object.entries(form).forEach(([key, value]) => {
//       fd.append(key, value);
//     });

//     Object.entries(files).forEach(([key, file]) => {
//       if (file) fd.append(key, file);
//     });

//     const res = await fetch("http://localhost:6003/mechanic/signup", {
//       method: "POST",
//       body: fd
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert(data.message);
//       navigate("/MechanicLogin");
//     } else {
//       alert(data.error);
//     }
//   };

//   return (
//     <>
//       <h2>Mechanic Signup</h2>

//       <input
//         placeholder="Name"
//         onChange={e => setForm({ ...form, name: e.target.value })}
//       />

//       <input
//         placeholder="Email"
//         onChange={e => setForm({ ...form, email: e.target.value })}
//       />

//       <input
//         placeholder="Phone"
//         onChange={e => setForm({ ...form, phone: e.target.value })}
//       />

//       <input
//         placeholder="Skills"
//         onChange={e => setForm({ ...form, skills: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={e => setForm({ ...form, password: e.target.value })}
//       />

//       <h4>Upload Documents</h4>

//       <input type="file" onChange={e => setFiles({ ...files, journeyman: e.target.files[0] })} />
//       <input type="file" onChange={e => setFiles({ ...files, redSeal: e.target.files[0] })} />
//       <input type="file" onChange={e => setFiles({ ...files, insurance: e.target.files[0] })} />
//       <input type="file" onChange={e => setFiles({ ...files, businessInsurance: e.target.files[0] })} />
//       <input type="file" onChange={e => setFiles({ ...files, drivingLicense: e.target.files[0] })} />

//       <br />

//       <input
//         type="checkbox"
//         onChange={e => setForm({ ...form, agreedToTerms: e.target.checked })}
//       />

//       <label>I accept responsibility. Platform commission 10%.</label>

//       <br /><br />

//       <button onClick={submit}>Signup</button>

//       <p style={{ marginTop: 15 }}>
//         Already have an account?
//         <button style={{ marginLeft: 8 }} onClick={() => navigate("/MechanicLogin")}>
//           Login
//         </button>
//       </p>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MechanicSignup() {
  const navigate = useNavigate();
   const API = process.env.REACT_APP_API_BASE_URL;
  // ✅ Form state with caching
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("mechanicForm");
    return saved
      ? JSON.parse(saved)
      : { name: "", email: "", phone: "", skills: "", password: "", agreedToTerms: false };
  });

  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Cache form data in localStorage
  useEffect(() => {
    localStorage.setItem("mechanicForm", JSON.stringify(form));
  }, [form]);

  // const submit = async () => {
  //   if (!form.agreedToTerms) {
  //     alert("You must agree to terms");
  //     return;
  //   }

  //   setLoading(true);

  //   const fd = new FormData();
  //   Object.entries(form).forEach(([key, value]) => fd.append(key, value));
  //   Object.entries(files).forEach(([key, file]) => file && fd.append(key, file));

  //   try {
  //     const res = await fetch("http://localhost:6003/mechanic/signup", {
  //       method: "POST",
  //       body: fd,
  //     });
  //     const data = await res.json();

  //     if (res.ok) {
  //       alert(data.message);
  //       localStorage.removeItem("mechanicForm"); // Clear cached form
  //       navigate("/MechanicLogin");
  //     } else {
  //       alert(data.error);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Server error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const submit = async () => {
    // ✅ Validate all form fields
    const requiredFields = ["name", "email", "phone", "skills", "password"];
    for (let field of requiredFields) {
      if (!form[field]?.trim()) {
        alert(`Please fill in your ${field}`);
        return;
      }
    }

    // ✅ Validate all required files
    const requiredFiles = ["journeyman", "redSeal", "insurance", "businessInsurance", "drivingLicense"];
    for (let fileKey of requiredFiles) {
      if (!files[fileKey]) {
        alert(`Please upload your ${fileKey}`);
        return;
      }
    }

    // ✅ Validate checkbox
    if (!form.agreedToTerms) {
      alert("You must agree to the terms");
      return;
    }

    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    Object.entries(files).forEach(([key, file]) => file && fd.append(key, file));
// https://newb-1.onrender.com
    try {
      const res = await fetch(`${API}/mechanic/signup`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        localStorage.removeItem("mechanicForm"); // Clear cached form
        navigate("/MechanicLogin");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">🔧 Mechanic Signup</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Skills"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>

        {/* File Uploads */}
        <h4 className="mt-6 mb-2 font-semibold text-black">Upload Documents</h4>
        <div className="space-y-2">
          {["journeyman", "redSeal", "insurance", "businessInsurance", "drivingLicense"].map((doc) => (
            <input
              key={doc}
              type="file"
              onChange={(e) => setFiles({ ...files, [doc]: e.target.files[0] })}
              className="w-full text-gray-700 file:bg-red-600 file:text-white file:px-3 file:py-1 file:rounded hover:file:bg-red-700"
            />
          ))}
        </div>

        {/* Terms Checkbox */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.agreedToTerms}
            onChange={(e) => setForm({ ...form, agreedToTerms: e.target.checked })}
            className="w-4 h-4 accent-red-600"
          />
          {/* <label className="text-gray-700">I accept responsibility. Platform commission 10%.</label> */}
          <label className="text-gray-700">
            I acknowledge that I am fully responsible for all work performed for my customers. Platform commission 10%.
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={submit}
          disabled={loading}
          className={`w-full mt-6 py-3 text-white font-semibold rounded transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-red-600"
            }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Already have an account */}
        <p className="text-center mt-4 text-gray-700">
          Already have an account?
          <button
            className="ml-2 text-red-600 hover:underline"
            onClick={() => navigate("/MechanicLogin")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}