

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupStep2() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Canada",
  });

  const [companyAddress, setCompanyAddress] = useState({
    companyName: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Canada",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.street || !address.city || !address.province || !address.postalCode) {
      alert("Please fill your personal address completely.");
      return;
    }

    if (!companyAddress.companyName || !companyAddress.street) {
      alert("Please fill company name and street.");
      return;
    }

    localStorage.setItem(
      "signupStep2",
      JSON.stringify({ address, companyAddress })
    );

    navigate("/SignupStep3");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-md p-6">

        {/* Header */}
        <h2 className="text-xl font-semibold text-black mb-1">
          Address Details
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Step 2 of 3
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Personal Address */}
          <h3 className="text-gray-700 font-semibold mb-2">🏠 Personal Address</h3>
          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Province"
            value={address.province}
            onChange={(e) => setAddress({ ...address, province: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />

          {/* Company Address */}
          <h3 className="text-gray-700 font-semibold mb-2 mt-4">🏢 Company Address</h3>
          <input
            type="text"
            placeholder="Company Name"
            value={companyAddress.companyName}
            onChange={(e) => setCompanyAddress({ ...companyAddress, companyName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Street"
            value={companyAddress.street}
            onChange={(e) => setCompanyAddress({ ...companyAddress, street: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="City"
            value={companyAddress.city}
            onChange={(e) => setCompanyAddress({ ...companyAddress, city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Province"
            value={companyAddress.province}
            onChange={(e) => setCompanyAddress({ ...companyAddress, province: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={companyAddress.postalCode}
            onChange={(e) => setCompanyAddress({ ...companyAddress, postalCode: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />

          {/* <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-sm hover:bg-gray-800 transition mt-2"
          >
            Continue
          </button> */}

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

        {/* Driver Signup */}
        <button
          onClick={() => navigate("/DriverSignup")}
          className="w-full py-2 border border-gray-400 text-black rounded-sm hover:bg-gray-100 transition"
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

export default SignupStep2;