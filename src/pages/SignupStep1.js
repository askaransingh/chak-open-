
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupStep1() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
   const API = process.env.REACT_APP_API_BASE_URL;
  const handleNext = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      alert("Please fill name, email and password.");
      return;
    }
    localStorage.setItem("signupStep1", JSON.stringify(form));
    navigate("/SignupStep2");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-md p-6">

        {/* Header */}
        <h2 className="text-xl font-semibold text-black mb-1">
          Create account
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Step 1 of 2
        </p>

        {/* Form */}
        <form onSubmit={handleNext} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm
                         focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm
                         focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm
                         focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm
                         focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "black" }}
            className="w-full text-white py-2 rounded-sm hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Driver */}
        <button
          onClick={() => navigate("/DriverSignup")}
          className="w-full py-2 border border-gray-400 text-black rounded-sm
                     hover:bg-gray-100 transition"
        >
          Sign up as Driver
        </button>

        {/* Login */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-red-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupStep1;