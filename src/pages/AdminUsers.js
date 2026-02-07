// import React, { useEffect, useState } from "react";
// import "./AdminUsers.css";

// function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });
//   const [editingUser, setEditingUser] = useState(null);

//   const fetchUsers = async () => {
//     const res = await fetch("http://localhost:6003/api/users/all");
//     const data = await res.json();
//     setUsers(data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleAddOrUpdate = async (e) => {
//     e.preventDefault();
//     const url = editingUser
//       ? `http://localhost:6003/api/users/update/${editingUser._id}`
//       : "http://localhost:6003/api/users/add";

//     const method = editingUser ? "PUT" : "POST";

//     const res = await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       alert(editingUser ? "User updated" : "User added");
//       setForm({ name: "", email: "", password: "", address: "" });
//       setEditingUser(null);
//       fetchUsers();
//     } else {
//       alert("Error saving user");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     const res = await fetch(`http://localhost:6003/api/users/delete/${id}`, {
//       method: "DELETE",
//     });
//     if (res.ok) {
//       alert("User deleted");
//       fetchUsers();
//     } else {
//       alert("Error deleting user");
//     }
//   };

//   const startEdit = (user) => {
//     setEditingUser(user);
//     setForm({
//       name: user.name,
//       email: user.email,
//       password: "",
//       address: user.address || "",
//     });
//   };

//   return (
//     <div className="admin-users-container">
//       <h2>👤 Manage Users</h2>

//       {/* Add/Edit Form */}
//       <form className="user-form" onSubmit={handleAddOrUpdate}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           required={!editingUser}
//         />
//         <input
//           type="text"
//           placeholder="Address"
//           value={form.address}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//         />
//         <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
//         {editingUser && (
//           <button type="button" className="cancel-btn" onClick={() => setEditingUser(null)}>
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* User Table */}
//       <table className="users-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id}>
//               <td>{u.name}</td>
//               <td>{u.email}</td>
//               {/* <td>{u.address || "N/A"}</td> */}
//               <td>
//   {u.address
//     ? `${u.address.street || ""}, ${u.address.city || ""}, ${u.address.province || ""}, ${u.address.postalCode || ""}, ${u.address.country || ""}`
//     : "N/A"}
// </td>
//               <td>
//                 <button onClick={() => startEdit(u)}>✏️ Edit</button>
//                 <button onClick={() => handleDelete(u._id)}>🗑️ Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminUsers;


import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const CACHE_KEY = "admin_users_cache";
const API = process.env.REACT_APP_API_BASE_URL;
const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500";

const formatAddress = (addr) => {
  if (!addr) return "N/A";
  return `${addr.street || ""}, ${addr.city || ""}, ${addr.province || ""}, ${addr.postalCode || ""}, ${addr.country || ""}`;
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    userAddress: {},
    shippingAddress: {},
    billingAddress: {},
    companyAddress: {},
  });

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/api/users/all`);
      const data = await res.json();
      setUsers(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) setUsers(JSON.parse(cached));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingUser
      ? `${API}/api/users/update/${editingUser._id}`
      : `${API}/api/users/add`;

    const method = editingUser ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) return alert("Error saving user");

    alert(editingUser ? "User updated" : "User added");
    setEditingUser(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      userAddress: {},
      shippingAddress: {},
      billingAddress: {},
      companyAddress: {},
    });
    fetchUsers();
  };
// https://newb-1.onrender.com
  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`${API}/api/users/delete/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  /* ================= EDIT ================= */
  const startEdit = (u) => {
    setEditingUser(u);
    setForm({
      name: u.name || "",
      email: u.email || "",
      phone: u.phone || "",
      password: "",
      userAddress: u.userAddress || {},
      shippingAddress: u.shippingAddress || {},
      billingAddress: u.billingAddress || {},
      companyAddress: u.companyAddress || {},
    });
  };

  /* ================= UI ================= */
  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded shadow p-6">

          <h1 className="text-2xl font-bold mb-6 text-black">
            👤 Admin – Manage Users
          </h1>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-10">
            <div className="grid md:grid-cols-3 gap-4">
              <input className={inputClass} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input className={inputClass} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <input className={inputClass} placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>

            {!editingUser && (
              <input
                type="password"
                className={inputClass}
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            )}

            <div className="flex gap-3">
              <button className="bg-red-600 text-white px-6 py-2 rounded">
                {editingUser ? "Update User" : "Add User"}
              </button>
              {editingUser && (
                <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-300 px-6 py-2 rounded">
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* ================= USERS LIST ================= */}
          <div className="space-y-6">
            {users.map((u) => (
              <div key={u._id} className="border border-gray-300 rounded p-4 shadow-sm">

                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold">{u.name}</h2>
                    <p className="text-gray-700">{u.email} • {u.phone || "N/A"}</p>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => startEdit(u)} className="bg-black text-white px-4 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(u._id)} className="bg-red-600 text-white px-4 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <h4 className="font-semibold">User Address</h4>
                    <p>{formatAddress(u.userAddress)}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Shipping Address</h4>
                    <p>{formatAddress(u.shippingAddress)}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Billing Address</h4>
                    <p>{formatAddress(u.billingAddress)}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Company Address</h4>
                    <p>{formatAddress(u.companyAddress)}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}


