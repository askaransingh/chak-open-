

// import { useEffect, useState } from "react";

// export default function InvoiceHistoryPage() {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchInvoices = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:6003/admin/invoice-history");
//       const data = await res.json();
//       setInvoices(Array.isArray(data) ? data : []);
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to fetch invoices:", err);
//       setInvoices([]);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   if (loading) return <p>Loading invoices...</p>;
//   if (invoices.length === 0) return <p>No invoices found</p>;

//   const payMechanic = async (invoiceId) => {
//     if (!window.confirm("Pay mechanic now?")) return;

//     const res = await fetch("http://localhost:6003/admin/pay-mechanic", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ invoiceId })
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("Mechanic paid successfully");
//       fetchInvoices();
//     } else {
//       alert(data.error || "Payment failed");
//     }
//   };

//   return (
//     <>
//       <h2>All Invoices</h2>

//       {invoices.map(inv => (
//         <div
//           key={inv._id}
//           style={{ border: "1px solid gray", margin: "10px 0", padding: 10 }}
//         >
//           <p><b>Invoice ID:</b> {inv.invoiceId || inv._id}</p>
//           <p><b>Job ID:</b> {inv.job?._id}</p>
//           <p><b>Customer:</b> {inv.job?.customerName}</p>
//           <p><b>Customer Email:</b> {inv.job?.customerEmail}</p>
//           <p><b>Mechanic:</b> {inv.job?.mechanic?.name}</p>
//           <p><b>Amount:</b> ₹{inv.amount}</p>
//           <p><b>Invoice Status:</b> {inv.status}</p>

//           {/* ✅ Paid / Not Paid Status */}
//           {inv.isMechanicPaid ? (
//             <p style={{ color: "green" }}>✅ Mechanic Paid</p>
//           ) : (
//             <p style={{ color: "red" }}>❌ Mechanic Not Paid</p>
//           )}

//           {/* ✅ Pay Button */}
//           <button
//             onClick={() => payMechanic(inv._id)}
//             disabled={inv.isMechanicPaid}
//             style={{
//               opacity: inv.isMechanicPaid ? 0.5 : 1,
//               cursor: inv.isMechanicPaid ? "not-allowed" : "pointer"
//             }}
//           >
//             💸 Pay Mechanic
//           </button>
//         </div>
//       ))}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const CACHE_KEY = "admin_invoice_history_cache";

export default function InvoiceHistoryPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
   const API = process.env.REACT_APP_API_BASE_URL;
  /* ================= FETCH ================= */
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/admin/invoice-history`);
      const data = await res.json();

      const safeData = Array.isArray(data) ? data : [];
      setInvoices(safeData);
      localStorage.setItem(CACHE_KEY, JSON.stringify(safeData));
    } catch (err) {
      console.error("Fetch failed, loading cache");
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) setInvoices(JSON.parse(cached));
      else setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  /* ================= PAY MECHANIC ================= */
  const payMechanic = async (invoiceId) => {
    if (!window.confirm("Pay mechanic now?")) return;

    try {
      const res = await fetch(`${API}/admin/pay-mechanic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Mechanic paid successfully");
        fetchInvoices();
      } else {
        alert(data.error || "Payment failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-2xl font-bold text-black mb-6">
            📄 Invoice History
          </h1>

          {loading && (
            <p className="text-gray-500">Loading invoices...</p>
          )}

          {!loading && invoices.length === 0 && (
            <p className="text-gray-500">No invoices found</p>
          )}

          {/* INVOICE LIST */}
          <div className="grid gap-4 md:grid-cols-2">
            {invoices.map((inv) => (
              <div
                key={inv._id}
                className="bg-white rounded shadow border border-gray-200 p-5 flex flex-col justify-between"
              >
                {/* TOP */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Invoice ID
                  </p>
                  <p className="font-semibold break-all">
                    {inv.invoiceId || inv._id}
                  </p>

                  <div className="mt-3 space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Job ID:</span>{" "}
                      {inv.job?._id || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Customer:</span>{" "}
                      {inv.job?.customerName || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {inv.job?.customerEmail || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Mechanic:</span>{" "}
                      {inv.job?.mechanic?.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Amount:</span>{" "}
                      <span className="text-black font-semibold">
                        ₹{inv.amount}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Invoice Status:</span>{" "}
                      {inv.status}
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="mt-4 flex items-center justify-between">
                  {inv.isMechanicPaid ? (
                    <span className="text-green-600 font-semibold">
                      ✅ Mechanic Paid
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      ❌ Mechanic Not Paid
                    </span>
                  )}

                  <button
                    onClick={() => payMechanic(inv._id)}
                    disabled={inv.isMechanicPaid}
                    className={`px-4 py-2 rounded text-white transition
                      ${
                        inv.isMechanicPaid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                  >
                    💸 Pay Mechanic
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}