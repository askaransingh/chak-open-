

// // // // import { useParams } from "react-router-dom";
// // // // import { useEffect, useState } from "react";

// // // // export default function InvoicePage() {
// // // //   const { jobId } = useParams();

// // // //   const [order, setOrder] = useState(null);
// // // //   const [amount, setAmount] = useState("");
// // // //   const [description, setDescription] = useState("");
// // // //   const [address, setAddress] = useState({});
// // // //   const [invoiceHistory, setInvoiceHistory] = useState([]);

// // // //   // 🔹 Fetch job
// // // //   const fetchJob = async () => {
// // // //     const res = await fetch(`http://localhost:6003/admin/jobs/${jobId}`);
// // // //     const data = await res.json();
// // // //     setOrder(data);
// // // //   };

// // // //   // 🔹 Fetch invoice history
// // // //   const fetchInvoiceHistory = async () => {
// // // //     const res = await fetch("http://localhost:6003/admin/invoice-history");
// // // //     const data = await res.json();
// // // //     setInvoiceHistory(Array.isArray(data) ? data : []);
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchJob();
// // // //     fetchInvoiceHistory();
// // // //   }, [jobId]);

// // // //   // 🔹 Auto-fill form
// // // //   useEffect(() => {
// // // //     if (!order) return;

// // // //     setAmount(order.amount || "");
// // // //     setDescription(
// // // //       `Mechanic: ${order.mechanic?.name || "N/A"}\n
// // // // Work Done:\n${order.mechanicNote || "No notes provided"}\n
// // // // Problem:\n${order.problem || ""}`
// // // //     );
// // // //     setAddress(order.serviceAddress || {});
// // // //   }, [order]);

// // // //   // 🔹 Send invoice
// // // //   const sendInvoice = async () => {
// // // //     if (!amount || Number(amount) <= 0) {
// // // //       alert("Amount must be greater than 0");
// // // //       return;
// // // //     }

// // // //     await fetch("http://localhost:6003/admin/send-invoice", {
// // // //       method: "POST",
// // // //       headers: { "Content-Type": "application/json" },
// // // //       body: JSON.stringify({
// // // //         jobId: order._id,
// // // //         amount: Number(amount),
// // // //         description
// // // //       })
// // // //     });

// // // //     alert("Invoice sent to customer");

// // // //     fetchJob();
// // // //     fetchInvoiceHistory();
// // // //   };

// // // //   // 🔹 Pay mechanic
// // // //   const payMechanic = async (invoiceId) => {
// // // //     await fetch("http://localhost:6003/admin/pay-mechanic", {
// // // //       method: "POST",
// // // //       headers: { "Content-Type": "application/json" },
// // // //       body: JSON.stringify({ invoiceId })
// // // //     });

// // // //     alert("Mechanic paid successfully");
// // // //     fetchInvoiceHistory();
// // // //   };

// // // //   if (!order) return <p>Loading...</p>;

// // // //   // ✅ SAFELY FILTER invoices for this job
// // // //   const jobInvoices = invoiceHistory.filter(
// // // //     inv => inv?.job && String(inv.job._id) === String(jobId)
// // // //   );

// // // //   return (
// // // //     <>
// // // //       <h2>Create Invoice</h2>

// // // //       <p><b>Customer:</b> {order.customerName}</p>
// // // //       <p><b>Email:</b> {order.customerEmail}</p>
// // // //       <p><b>Mechanic:</b> {order.mechanic?.name}</p>

// // // //       <input
// // // //         value={amount}
// // // //         onChange={e => setAmount(e.target.value)}
// // // //         placeholder="Amount"
// // // //       />

// // // //       <textarea
// // // //         value={description}
// // // //         onChange={e => setDescription(e.target.value)}
// // // //         rows={6}
// // // //       />

// // // //       <h3>Billing Address</h3>
// // // //       <input value={address.street || ""} readOnly />
// // // //       <input value={address.city || ""} readOnly />
// // // //       <input value={address.province || ""} readOnly />
// // // //       <input value={address.postalCode || ""} readOnly />

// // // //       {/* ✅ Show send button only if NO invoice exists */}
// // // //       {jobInvoices.length === 0 && (
// // // //         <button onClick={sendInvoice}>Send Invoice</button>
// // // //       )}

// // // //       <hr />
// // // //       <h2>Invoice History</h2>

// // // //       {jobInvoices.length === 0 && <p>No invoices yet</p>}

// // // //       {jobInvoices.map(inv => (
// // // //         <div
// // // //           key={inv._id}
// // // //           style={{ border: "1px solid gray", margin: "10px 0", padding: 10 }}
// // // //         >
// // // //           <p><b>Amount:</b> ₹{inv.amount}</p>
// // // //           <p><b>Status:</b> {inv.status}</p>

// // // //           {inv.status === "Paid" && !inv.isMechanicPaid && (
// // // //             <button onClick={() => payMechanic(inv._id)}>
// // // //               Pay Mechanic
// // // //             </button>
// // // //           )}

// // // //           {inv.isMechanicPaid && (
// // // //             <p style={{ color: "green" }}>✅ Mechanic Paid</p>
// // // //           )}
// // // //         </div>
// // // //       ))}
// // // //     </>
// // // //   );


// // // // }

// // // import { useParams } from "react-router-dom";
// // // import { useEffect, useState } from "react";

// // // export default function InvoicePage() {
// // //   const { jobId } = useParams();

// // //   const [order, setOrder] = useState(null);
// // //   const [amount, setAmount] = useState("");
// // //   const [description, setDescription] = useState("");
// // //   const [address, setAddress] = useState({});
// // //   const [invoiceHistory, setInvoiceHistory] = useState([]);
// // //   const [loadingInvoices, setLoadingInvoices] = useState(true);

// // //   // 🔹 Fetch job
// // //   const fetchJob = async () => {
// // //     try {
// // //       const res = await fetch(`http://localhost:6003/admin/jobs/${jobId}`);
// // //       const data = await res.json();
// // //       setOrder(data);
// // //     } catch (err) {
// // //       console.error("Failed to fetch job:", err);
// // //     }
// // //   };

// // //   // 🔹 Fetch invoice history
// // //   const fetchInvoiceHistory = async () => {
// // //     try {
// // //       setLoadingInvoices(true);
// // //       const res = await fetch("http://localhost:6003/admin/invoice-history");
// // //       const data = await res.json();
// // //       setInvoiceHistory(Array.isArray(data) ? data : []);
// // //       setLoadingInvoices(false);
// // //     } catch (err) {
// // //       console.error("Failed to fetch invoices:", err);
// // //       setInvoiceHistory([]);
// // //       setLoadingInvoices(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchJob();
// // //     fetchInvoiceHistory();
// // //   }, [jobId]);

// // //   // 🔹 Auto-fill form
// // //   useEffect(() => {
// // //     if (!order) return;

// // //     setAmount(order.amount || "");
// // //     setDescription(
// // //       `Mechanic: ${order.mechanic?.name || "N/A"}\n
// // // Work Done:\n${order.mechanicNote || "No notes provided"}\n
// // // Problem:\n${order.problem || ""}`
// // //     );
// // //     setAddress(order.serviceAddress || {});
// // //   }, [order]);

// // //   // 🔹 Send invoice
// // //   const sendInvoice = async () => {
// // //     if (!amount || Number(amount) <= 0) {
// // //       alert("Amount must be greater than 0");
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch("http://localhost:6003/admin/send-invoice", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           jobId: order._id,
// // //           amount: Number(amount),
// // //           description
// // //         })
// // //       });
// // //       const data = await res.json();
// // //       if (res.ok) {
// // //         alert("Invoice sent successfully");
// // //         fetchJob();
// // //         fetchInvoiceHistory();
// // //       } else {
// // //         alert("Failed to send invoice: " + data.error);
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to send invoice");
// // //     }
// // //   };

// // //   // 🔹 Pay mechanic
// // //   const payMechanic = async (invoiceId) => {
// // //     try {
// // //       const res = await fetch("http://localhost:6003/admin/pay-mechanic", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ invoiceId })
// // //       });
// // //       const data = await res.json();
// // //       if (res.ok) {
// // //         alert("Mechanic paid successfully");
// // //         fetchInvoiceHistory();
// // //       } else {
// // //         alert("Failed to pay mechanic: " + data.error);
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to pay mechanic");
// // //     }
// // //   };

// // //   if (!order) return <p>Loading job...</p>;

// // //   // ✅ Filter invoices safely
// // //   const jobInvoices = invoiceHistory.filter(
// // //     inv => inv?.job && String(inv.job._id) === String(jobId)
// // //   );

// // //   return (
// // //     <>
// // //       <h2>Create Invoice</h2>

// // //       <p><b>Customer:</b> {order.customerName}</p>
// // //       <p><b>Email:</b> {order.customerEmail}</p>
// // //       <p><b>Mechanic:</b> {order.mechanic?.name}</p>

// // //       <input
// // //         value={amount}
// // //         onChange={e => setAmount(e.target.value)}
// // //         placeholder="Amount"
// // //       />

// // //       <textarea
// // //         value={description}
// // //         onChange={e => setDescription(e.target.value)}
// // //         rows={6}
// // //       />

// // //       <h3>Billing Address</h3>
// // //       <input value={address.street || ""} readOnly />
// // //       <input value={address.city || ""} readOnly />
// // //       <input value={address.province || ""} readOnly />
// // //       <input value={address.postalCode || ""} readOnly />

// // //       {/* ✅ Show send button only if no invoice exists */}
// // //       {jobInvoices.length === 0 && (
// // //         <button onClick={sendInvoice}>Send Invoice</button>
// // //       )}

// // //       <hr />
// // //       <h2>Invoice History</h2>

// // //       {loadingInvoices && <p>Loading invoices...</p>}
// // //       {!loadingInvoices && jobInvoices.length === 0 && <p>No invoices yet</p>}

// // //       {jobInvoices.map(inv => (
// // //         <div
// // //           key={inv._id}
// // //           style={{ border: "1px solid gray", margin: "10px 0", padding: 10 }}
// // //         >
// // //           <p><b>Amount:</b> ₹{inv.amount}</p>
// // //           <p><b>Status:</b> {inv.status}</p>

// // //           {inv.status === "Paid" && !inv.isMechanicPaid && (
// // //             <button onClick={() => payMechanic(inv._id)}>
// // //               Pay Mechanic
// // //             </button>
// // //           )}

// // //           {inv.isMechanicPaid && (
// // //             <p style={{ color: "green" }}>✅ Mechanic Paid</p>
// // //           )}
// // //         </div>
// // //       ))}
// // //     </>
// // //   );
// // // }

// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";

// // export default function InvoicePage() {
// //   const { jobId } = useParams();

// //   const [order, setOrder] = useState(null);
// //   const [amount, setAmount] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [address, setAddress] = useState({});
// //   const [invoiceHistory, setInvoiceHistory] = useState([]);
// //   const [loadingInvoices, setLoadingInvoices] = useState(true);

// //   // Fetch job
// //   const fetchJob = async () => {
// //     try {
// //       const res = await fetch(`http://localhost:6003/admin/jobs/${jobId}`);
// //       const data = await res.json();
// //       setOrder(data);
// //     } catch (err) {
// //       console.error("Failed to fetch job:", err);
// //     }
// //   };

// //   // Fetch invoice history for this job
// //   const fetchInvoiceHistory = async () => {
// //     try {
// //       setLoadingInvoices(true);
// //       const res = await fetch("http://localhost:6003/admin/invoice-history");
// //       const data = await res.json();
// //       setInvoiceHistory(Array.isArray(data) ? data : []);
// //       setLoadingInvoices(false);
// //     } catch (err) {
// //       console.error("Failed to fetch invoices:", err);
// //       setInvoiceHistory([]);
// //       setLoadingInvoices(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchJob();
// //     fetchInvoiceHistory();
// //   }, [jobId]);

// //   // Auto-fill form
// //   useEffect(() => {
// //     if (!order) return;
// //     setAmount(order.amount || "");
// //     setDescription(
// //       `Mechanic: ${order.mechanic?.name || "N/A"}\n
// // Work Done:\n${order.mechanicNote || "No notes provided"}\n
// // Problem:\n${order.problem || ""}`
// //     );
// //     setAddress(order.serviceAddress || {});
// //   }, [order]);

// //   // Send invoice
// //   const sendInvoice = async () => {
// //     if (!amount || Number(amount) <= 0) {
// //       alert("Amount must be greater than 0");
// //       return;
// //     }
// //     try {
// //       const res = await fetch("http://localhost:6003/admin/send-invoice", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           jobId: order._id,
// //           amount: Number(amount),
// //           description
// //         })
// //       });
// //       const data = await res.json();
// //       if (res.ok) {
// //         alert("Invoice sent successfully");
// //         fetchInvoiceHistory();
// //       } else {
// //         alert("Failed to send invoice: " + data.error);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to send invoice");
// //     }
// //   };

// //   if (!order) return <p>Loading job...</p>;

// //   // Filter invoices for this job
// //   const jobInvoices = invoiceHistory.filter(
// //     inv => inv?.job && String(inv.job._id) === String(jobId)
// //   );

// //   return (
// //     <>
// //       <h2>Create Invoice</h2>

// //       <p><b>Customer:</b> {order.customerName}</p>
// //       <p><b>Email:</b> {order.customerEmail}</p>
// //       <p><b>Mechanic:</b> {order.mechanic?.name}</p>

// //       <input
// //         value={amount}
// //         onChange={e => setAmount(e.target.value)}
// //         placeholder="Amount"
// //       />

// //       <textarea
// //         value={description}
// //         onChange={e => setDescription(e.target.value)}
// //         rows={6}
// //       />

// //       <h3>Billing Address</h3>
// //       <input value={address.street || ""} readOnly />
// //       <input value={address.city || ""} readOnly />
// //       <input value={address.province || ""} readOnly />
// //       <input value={address.postalCode || ""} readOnly />

// //       {jobInvoices.length === 0 && (
// //         <button onClick={sendInvoice}>Send Invoice</button>
// //       )}

// //       <hr />
// //       <h2>Invoice History for this Job</h2>
// //       {loadingInvoices && <p>Loading invoices...</p>}
// //       {!loadingInvoices && jobInvoices.length === 0 && <p>No invoices yet</p>}

// //       {jobInvoices.map(inv => (
// //         <div
// //           key={inv._id}
// //           style={{ border: "1px solid gray", margin: "10px 0", padding: 10 }}
// //         >
// //           <p><b>Amount:</b> ₹{inv.amount}</p>
// //           <p><b>Status:</b> {inv.status}</p>
// //         </div>
// //       ))}
// //     </>
// //   );
// // }

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function InvoicePage() {
//   const { jobId } = useParams();

//   const [order, setOrder] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [address, setAddress] = useState({});

//   // Fetch job
//   const fetchJob = async () => {
//     try {
//       const res = await fetch(`http://localhost:6003/admin/jobs/${jobId}`);
//       const data = await res.json();
//       setOrder(data);
//     } catch (err) {
//       console.error("Failed to fetch job:", err);
//     }
//   };

//   useEffect(() => {
//     fetchJob();
//   }, [jobId]);

//   // Auto-fill form
//   useEffect(() => {
//     if (!order) return;
//     setAmount(order.amount || "");
//     setDescription(
//       `Mechanic: ${order.mechanic?.name || "N/A"}\n
// Work Done:\n${order.mechanicNote || "No notes provided"}\n
// Problem:\n${order.problem || ""}`
//     );
//     setAddress(order.serviceAddress || {});
//   }, [order]);

//   // Send invoice
//   const sendInvoice = async () => {
//     if (!amount || Number(amount) <= 0) {
//       alert("Amount must be greater than 0");
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:6003/admin/send-invoice", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           jobId: order._id,
//           amount: Number(amount),
//           description
//         })
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert("Invoice sent successfully");
//       } else {
//         alert("Failed to send invoice: " + data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send invoice");
//     }
//   };

//   if (!order) return <p>Loading job...</p>;

//   return (
//     <>
//       <h2>Create Invoice</h2>

//       <p><b>Customer:</b> {order.customerName}</p>
//       <p><b>Email:</b> {order.customerEmail}</p>
//       <p><b>Mechanic:</b> {order.mechanic?.name}</p>

//       <input
//         value={amount}
//         onChange={e => setAmount(e.target.value)}
//         placeholder="Amount"
//       />

//       <textarea
//         value={description}
//         onChange={e => setDescription(e.target.value)}
//         rows={6}
//       />

//       <h3>Billing Address</h3>
//       <input value={address.street || ""} readOnly />
//       <input value={address.city || ""} readOnly />
//       <input value={address.province || ""} readOnly />
//       <input value={address.postalCode || ""} readOnly />

//       <button onClick={sendInvoice}>Send Invoice</button>
//     </>
//   );
// }

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const JOB_CACHE_KEY = "admin_invoice_job_cache";
const DRAFT_CACHE_KEY = "admin_invoice_draft_cache";

export default function InvoicePage() {
  const { jobId } = useParams();

  const [order, setOrder] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true);
  const API = process.env.REACT_APP_API_BASE_URL;
  /* ================= FETCH JOB ================= */
  const fetchJob = async () => {
    try {
      const res = await fetch(`${API}/admin/jobs/${jobId}`);
      const data = await res.json();
      setOrder(data);
      localStorage.setItem(JOB_CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Fetch failed, loading cache");
      const cached = localStorage.getItem(JOB_CACHE_KEY);
      if (cached) setOrder(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  /* ================= AUTO FILL ================= */
  useEffect(() => {
    if (!order) return;

    setAmount(order.amount || "");
    setDescription(
`Mechanic: ${order.mechanic?.name || "N/A"}

Work Done:
${order.mechanicNote || "No notes provided"}

Problem:
${order.problem || "N/A"}`
    );
    setAddress(order.serviceAddress || {});
  }, [order]);

  /* ================= CACHE DRAFT ================= */
  useEffect(() => {
    if (!order) return;
    localStorage.setItem(
      DRAFT_CACHE_KEY,
      JSON.stringify({ amount, description })
    );
  }, [amount, description, order]);

  /* ================= LOAD DRAFT ================= */
  useEffect(() => {
    const cached = localStorage.getItem(DRAFT_CACHE_KEY);
    if (cached) {
      const d = JSON.parse(cached);
      setAmount(d.amount || "");
      setDescription(d.description || "");
    }
  }, []);

  /* ================= SEND INVOICE ================= */
  const sendInvoice = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
// https://newb-1.onrender.com
    try {
      const res = await fetch(`${API}/admin/send-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: order._id,
          amount: Number(amount),
          description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Invoice sent successfully");
        localStorage.removeItem(DRAFT_CACHE_KEY);
      } else {
        alert("Failed to send invoice: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading invoice...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load job
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">

          {/* HEADER */}
          <h1 className="text-2xl font-bold text-black mb-6">
            🧾 Create Invoice
          </h1>

          {/* CUSTOMER INFO */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-semibold">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{order.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mechanic</p>
              <p>{order.mechanic?.name || "N/A"}</p>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Invoice Description
            </label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* ADDRESS */}
          <h3 className="font-semibold mb-2">Billing Address</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <input className="input" value={address.street || ""} readOnly />
            <input className="input" value={address.city || ""} readOnly />
            <input className="input" value={address.province || ""} readOnly />
            <input className="input" value={address.postalCode || ""} readOnly />
          </div>

          {/* ACTION */}
          <div className="flex justify-end">
            <button
              onClick={sendInvoice}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow"
            >
              Send Invoice
            </button>
          </div>

        </div>
      </div>
    </>
  );
}