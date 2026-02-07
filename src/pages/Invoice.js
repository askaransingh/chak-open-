
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-red-500";

export default function Invoice() {
  const location = useLocation();
  const order = location.state?.order || {};
  const API = process.env.REACT_APP_API_BASE_URL;
  const DRAFT_KEY = "invoice_draft_cache";
  const INVOICE_LIST_KEY = "admin_invoice_list_cache";

  const [tab, setTab] = useState("create");
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [invoices, setInvoices] = useState([]);

  /* CUSTOMER */
  const [customerName, setCustomerName] = useState(order.userName || "");
  const [customerEmail, setCustomerEmail] = useState(order.email || "");
  const [customerPhone, setCustomerPhone] = useState(order.phone || "");

  /* ADDRESSES */
  const [shippingAddress, setShippingAddress] = useState(order.shippingAddress || {});
  const [billingAddress, setBillingAddress] = useState(order.billingAddress || {});

  /* INVOICE */
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    date: new Date().toISOString().slice(0, 10),
    dueDate: "",
    currency: "CAD",
    gstRate: 5,
    items: [],
  });

  /* INIT */
  useEffect(() => {
    setInvoiceData((p) => ({
      ...p,
      invoiceNumber: "INV-" + Math.floor(100000 + Math.random() * 900000),
      items:
        order.items?.map((i) => ({
          description: i.partName,
          qty: i.quantity,
          unitPrice: i.price,
        })) || [],
    }));
  }, []);

  /* CACHE */
  useEffect(() => {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        billingAddress,
        invoiceData,
      })
    );
  }, [customerName, customerEmail, customerPhone, shippingAddress, billingAddress, invoiceData]);

  /* LOAD CACHE */
  useEffect(() => {
    if (!order.items) {
      const cached = localStorage.getItem(DRAFT_KEY);
      if (cached) {
        const d = JSON.parse(cached);
        setCustomerName(d.customerName);
        setCustomerEmail(d.customerEmail);
        setCustomerPhone(d.customerPhone);
        setShippingAddress(d.shippingAddress);
        setBillingAddress(d.billingAddress);
        setInvoiceData(d.invoiceData);
      }
    }
  }, []);

  /* TOTALS */
  const subtotal = invoiceData.items.reduce(
    (s, i) => s + Number(i.qty || 0) * Number(i.unitPrice || 0),
    0
  );
  const gst = (subtotal * invoiceData.gstRate) / 100;
  const total = subtotal + gst;

  /* ITEMS */
  const updateItem = (i, field, val) => {
    const items = [...invoiceData.items];
    items[i][field] = val;
    setInvoiceData({ ...invoiceData, items });
  };

  const addItem = () =>
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", qty: 1, unitPrice: 0 }],
    });

  const removeItem = (i) =>
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter((_, idx) => idx !== i),
    });

  /* SUBMIT */
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // https://invoice-16.onrender.com
    try {
      const res = await fetch("https://invoice-18.onrender.com/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({
        //   customerName,
        //   customerEmail,
        //   customerPhone,
        //   shippingAddress,
        //   billingAddress,
        //   invoiceData: { ...invoiceData, subtotal, gst, total },
        // }),
        body: JSON.stringify({
          customerEmail,
          customerPhone,
          invoiceData: {
            ...invoiceData,
            customerName,
            shippingAddress,
            billingAddress,
            subtotal,
            gst,
            total,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Invoice sent");
        setPaymentUrl(data.paymentUrl);
        localStorage.removeItem(DRAFT_KEY);
      } else alert("Invoice failed");
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  /* FETCH LIST */
  useEffect(() => {
    fetch("https://invoice-18.onrender.com/invoices")
      .then((r) => r.json())
      .then((d) => {
        setInvoices(d.reverse());
        localStorage.setItem(INVOICE_LIST_KEY, JSON.stringify(d));
      })
      .catch(() => {
        const cached = localStorage.getItem(INVOICE_LIST_KEY);
        if (cached) setInvoices(JSON.parse(cached));
      });
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">

          <h1 className="text-2xl font-bold mb-4">Admin Invoice Panel</h1>

          <div className="flex gap-3 mb-6">
            <button onClick={() => setTab("create")} className={`px-4 py-2 rounded ${tab === "create" ? "bg-red-600 text-white" : "bg-gray-200"}`}>
              Create Invoice
            </button>
            <button onClick={() => setTab("list")} className={`px-4 py-2 rounded ${tab === "list" ? "bg-red-600 text-white" : "bg-gray-200"}`}>
              Invoice List
            </button>
          </div>

          {tab === "create" && (
            <form onSubmit={submit} className="space-y-6">

              <h2 className="text-xl font-semibold">Create Invoice (Auto-filled)</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <input className={inputClass} placeholder="Name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
                <input className={inputClass} placeholder="Email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
                <input className={inputClass} placeholder="Customer Phone" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* <input className={`${inputClass} bg-gray-100`} value={invoiceData.invoiceNumber} readOnly /> */}
                <input
                  className={inputClass}
                   placeholder="Invoice Number" 
                  value={invoiceData.invoiceNumber}
                  onChange={(e) =>
                    setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })
                  }
                />
                <input type="date" className={inputClass} value={invoiceData.date} onChange={e => setInvoiceData({ ...invoiceData, date: e.target.value })} />
                <input type="date" className={inputClass} value={invoiceData.dueDate} onChange={e => setInvoiceData({ ...invoiceData, dueDate: e.target.value })} />
              </div>

              <h3 className="font-semibold">Shipping Address</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {["street", "city", "province", "postalCode", "country"].map(f => (
                  <input key={f} className={inputClass} placeholder={f} value={shippingAddress[f] || ""} onChange={e => setShippingAddress({ ...shippingAddress, [f]: e.target.value })} />
                ))}
              </div>

              <h3 className="font-semibold">Billing Address</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {["street", "city", "province", "postalCode", "country"].map(f => (
                  <input key={f} className={inputClass} placeholder={f} value={billingAddress[f] || ""} onChange={e => setBillingAddress({ ...billingAddress, [f]: e.target.value })} />
                ))}
              </div>

              <h3 className="font-semibold">Items</h3>
              {invoiceData.items.map((item, i) => (
                <div key={i} className="grid md:grid-cols-4 gap-2">
                  <input className={inputClass} value={item.description} onChange={e => updateItem(i, "description", e.target.value)} />
                  <input type="number" className={inputClass} value={item.qty} onChange={e => updateItem(i, "qty", e.target.value)} />
                  <input type="number" className={inputClass} value={item.unitPrice} onChange={e => updateItem(i, "unitPrice", e.target.value)} />
                  <button type="button" onClick={() => removeItem(i)} className="bg-black text-white rounded px-3">X</button>
                </div>
              ))}

              <button type="button" onClick={addItem} className="text-red-600 font-semibold">
                + Add Item
              </button>

              <h3 className="text-right font-bold">
                Total: ${total.toFixed(2)} {invoiceData.currency}
              </h3>

              <button disabled={loading} className="bg-red-600 text-white px-6 py-2 rounded">
                {loading ? "Sending..." : "Send Invoice"}
              </button>

              {paymentUrl && (
                <a href={paymentUrl} target="_blank" rel="noreferrer" className="block text-green-600 font-semibold">
                  Pay Now
                </a>
              )}
            </form>
          )}

        </div>
      </div>
    </>
  );
}