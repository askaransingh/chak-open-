// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signupUser } from "../api";
// // import "./Signup3.css";

// function SignupStep3() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [billingAddress, setBillingAddress] = useState({
//     street: "",
//     city: "",
//     province: "",
//     postalCode: "",
//     country: "Canada",
//   });

//   const [shippingAddress, setShippingAddress] = useState({
//     street: "",
//     city: "",
//     province: "",
//     postalCode: "",
//     country: "Canada",
//   });

//   const [sameAsBilling, setSameAsBilling] = useState(false);
//   const [phone, setPhone] = useState("");


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const step1 = JSON.parse(localStorage.getItem("signupStep1"));
//     const step2 = JSON.parse(localStorage.getItem("signupStep2"));

//     if (!step1 || !step2) {
//       alert("Please complete previous steps first!");
//       return navigate("/SignupStep1");
//     }

//     const finalShipping = sameAsBilling ? billingAddress : shippingAddress;

//     const payload = {
//       ...step1,
//       ...step2,
//       phone,                 // ✅ added
//       billingAddress,
//       shippingAddress: finalShipping,
//     };

//     setLoading(true);
//     try {
//       const res = await signupUser(payload);
//       const { status, body } = res;

//       if (status >= 200 && status < 300 && body.user) {
//         localStorage.removeItem("signupStep1");
//         localStorage.removeItem("signupStep2");
//         localStorage.setItem("currentUser", JSON.stringify(body.user));

//         alert("Signup successful!");
//         navigate("/");
//       } else {
//         alert(body.error || "Signup failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup3-container">
//       <h2>Billing & Shipping Address</h2>

//       <form onSubmit={handleSubmit}>
//         <h3>💳 Billing Address</h3>
//         <input placeholder="Street" required onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })} />
//         <input placeholder="City" required onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })} />
//         <input placeholder="Province" required onChange={(e) => setBillingAddress({ ...billingAddress, province: e.target.value })} />
//         <input placeholder="Postal Code" required onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })} />

//         <label>
//           <input
//             type="checkbox"
//             checked={sameAsBilling}
//             onChange={() => setSameAsBilling(!sameAsBilling)}
//           />
//           Shipping address same as billing
//         </label>

//         {!sameAsBilling && (
//           <>
//             <h3>🚚 Shipping Address</h3>
//             <input placeholder="Street" required onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} />
//             <input placeholder="City" required onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
//             <input placeholder="Province" required onChange={(e) => setShippingAddress({ ...shippingAddress, province: e.target.value })} />
//             <input placeholder="Postal Code" required onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} />
//           </>
//         )}
//         <h3>📞 Contact Details</h3>
//         <input
//           type="tel"
//           placeholder="Phone Number"
//           required
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Creating Account..." : "Finish Signup"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignupStep3;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api";

function SignupStep3() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Canada",
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Canada",
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const step1 = JSON.parse(localStorage.getItem("signupStep1"));
    const step2 = JSON.parse(localStorage.getItem("signupStep2"));

    if (!step1 || !step2) {
      alert("Please complete previous steps first!");
      return navigate("/SignupStep1");
    }

    const finalShipping = sameAsBilling ? billingAddress : shippingAddress;

    const payload = {  
      ...step1,
      ...step2,
      phone,
      billingAddress,
      shippingAddress: finalShipping,
    };

    setLoading(true);
    try {
      const res = await signupUser(payload);
      const { status, body } = res;

      if (status >= 200 && status < 300 && body.user) {
        localStorage.removeItem("signupStep1");
        localStorage.removeItem("signupStep2");
        localStorage.setItem("currentUser", JSON.stringify(body.user));

        alert("Signup successful!");
        navigate("/");
      } else {
        alert(body.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-md p-6">

        {/* Header */}
        <h2 className="text-xl font-semibold text-black mb-1">
          Billing & Shipping Address
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Step 3 of 3
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Billing Address */}
          <h3 className="text-gray-700 font-semibold mb-2">💳 Billing Address</h3>
          <input
            type="text"
            placeholder="Street"
            value={billingAddress.street}
            onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="City"
            value={billingAddress.city}
            onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Province"
            value={billingAddress.province}
            onChange={(e) => setBillingAddress({ ...billingAddress, province: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={billingAddress.postalCode}
            onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />

          {/* Shipping Address Checkbox */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={() => setSameAsBilling(!sameAsBilling)}
              className="rounded border-gray-300"
            />
            <span className="text-gray-700">Shipping address same as billing</span>
          </label>

          {/* Shipping Address */}
          {!sameAsBilling && (
            <>
              <h3 className="text-gray-700 font-semibold mb-2 mt-4">🚚 Shipping Address</h3>
              <input
                type="text"
                placeholder="Street"
                value={shippingAddress.street}
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="Province"
                value={shippingAddress.province}
                onChange={(e) => setShippingAddress({ ...shippingAddress, province: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
              />
            </>
          )}

          {/* Phone */}
          <h3 className="text-gray-700 font-semibold mb-2 mt-4">📞 Contact Details</h3>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={loading}
              style={{ backgroundColor: "black" }}
            className="w-full text-white py-2 rounded-sm hover:bg-gray-800 transition"
            // className="w-full bg-black text-white py-2 rounded-sm hover:bg-gray-800 transition mt-2"
          >
            {loading ? "Creating Account..." : "Finish Signup"}
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

export default SignupStep3;