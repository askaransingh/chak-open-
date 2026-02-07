

import { useState, useEffect } from "react";

const CACHE_KEY = "customer_problem_draft";

export default function CustomerProblem() {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    problem: "",
    address: {
      street: "",
      city: ""
    }
  });

  const [loading, setLoading] = useState(false);
   const API = process.env.REACT_APP_API_BASE_URL;
  // 🔴 Load cached form
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      setForm(JSON.parse(cached));
    }
  }, []);

  // 🩶 Save to cache on change
  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(form));
  }, [form]);

  const submit = async () => {
    if (!form.customerName || !form.customerEmail || !form.problem) {
      return alert("Please fill all required fields");
    }
// https://newb-1.onrender.com
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/customer/create-job`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );

      // if (!res.ok) throw new Error("Submission failed");

      alert("✅ Problem submitted successfully");
      localStorage.removeItem(CACHE_KEY);

      // Reset form
      setForm({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        problem: "",
        address: { street: "", city: "" }
      });

    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white border border-gray-300 rounded-lg shadow-lg p-6">

        {/* Header */}
        <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-red-600 pb-2">
          🛠️ Report a Problem
        </h2>

        {/* Form */}
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name *"
            value={form.customerName}
            onChange={e => setForm({ ...form, customerName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-black"
          />

          <input
            type="email"
            placeholder="Email *"
            value={form.customerEmail}
            onChange={e => setForm({ ...form, customerEmail: e.target.value })}
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-black"
          />

          <input
            type="tel"
            placeholder="Phone"
            value={form.customerPhone}
            onChange={e => setForm({ ...form, customerPhone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-black"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Street"
              value={form.address.street}
              onChange={e =>
                setForm({
                  ...form,
                  address: { ...form.address, street: e.target.value }
                })
              }
              className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-black"
            />

            <input
              type="text"
              placeholder="City"
              value={form.address.city}
              onChange={e =>
                setForm({
                  ...form,
                  address: { ...form.address, city: e.target.value }
                })
              }
              className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-black"
            />
          </div>

          <textarea
            rows="4"
            placeholder="Describe your problem *"
            value={form.problem}
            onChange={e => setForm({ ...form, problem: e.target.value })}
            className="w-full px-3 py-2 border border-gray-400 rounded resize-none focus:outline-none focus:border-black"
          />

          {/* Submit */}
          <button
            onClick={submit}
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
            `}
          >
            {loading ? "Submitting..." : "Submit Problem"}
          </button>

        </div>
      </div>
    </div>
  );
}