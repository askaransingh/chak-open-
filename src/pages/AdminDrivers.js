

// import React, { useEffect, useState } from "react";
// import AdminNavbar from "./AdminNavbar";

// export default function AdminDrivers() {
//   const [drivers, setDrivers] = useState([]);

//   const fetchDrivers = async () => {
//     const res = await fetch("http://localhost:6003/api/drivers");
//     const data = await res.json();
//     setDrivers(data);
//   };

//   const approveDriver = async (id) => {
//     await fetch(`http://localhost:6003/api/drivers/${id}/approve`, {
//       method: "PUT",
//     });
//     fetchDrivers();
//   };

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const deleteDriver = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this driver?");
//     if (!confirm) return;

//     await fetch(`http://localhost:6003/api/drivers/${id}`, {
//       method: "DELETE",
//     });

//     fetchDrivers();
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div style={{ padding: 20 }}>
//         <h2>Driver Management</h2>

//         {drivers.map((d) => (
//           <div
//             key={d._id}
//             style={{ border: "1px solid #ccc", padding: 15, marginBottom: 15 }}
//           >
//             <h4>{d.name}</h4>
//             <p>Email: {d.email}</p>
//             <p>Phone: {d.phone}</p>
//             <p>Status: {d.isApproved ? "✅ Approved" : "❌ Pending"}</p>

//             <div>
//               <strong>Documents:</strong>
//               <ul>
//                 {d.drivingLicense && (
//                   <li>
//                     <a
//                       href={`http://localhost:6003/uploads/${d.drivingLicense}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       Driving Licence
//                     </a>
//                   </li>
//                 )}
//                 {d.abstractPaper && (
//                   <li>
//                     <a
//                       href={`http://localhost:6003/uploads/${d.abstractPaper}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       Abstract Paper
//                     </a>
//                   </li>
//                 )}
//                 {d.insurance && (
//                   <li>
//                     <a
//                       href={`http://localhost:6003/uploads/${d.insurance}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       Insurance
//                     </a>
//                   </li>
//                 )}
//               </ul>
//             </div>

//             {!d.isApproved && (
//               <button onClick={() => approveDriver(d._id)}>
//                 Approve Driver
//               </button>


//             )}
//             <button
//               style={{
//                 marginLeft: 10,
//                 backgroundColor: "red",
//                 color: "white",
//                 padding: "6px 10px",
//                 border: "none",
//                 cursor: "pointer",
//               }}
//               onClick={() => deleteDriver(d._id)}
//             >
//               Delete Driver
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  const CACHE_KEY = "admin_drivers_cache";
  const API = process.env.REACT_APP_API_BASE_URL;
  // ✅ Fetch drivers with cache
  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/drivers`);
      const data = await res.json();

      setDrivers(Array.isArray(data) ? data : []);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Fetch failed, loading cache");
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) setDrivers(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // ✅ Approve driver
  const approveDriver = async (id) => {
    await fetch(`${API}/api/drivers/${id}/approve`, {
      method: "PUT",
    });
    alert("Driver approved");
    fetchDrivers();
  };

  // ✅ Delete driver
  const deleteDriver = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver?"
    );
    if (!confirmDelete) return;

    await fetch(`${API}/api/drivers/${id}`, {
      method: "DELETE",
    });
    alert("Driver deleted");
    fetchDrivers();
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-6">
          🚚 Driver Management
        </h1>

        {loading && <p className="text-gray-600 mb-4">Loading drivers...</p>}

        {drivers.length === 0 && !loading && (
          <p className="text-gray-600">No drivers found</p>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {drivers.map((d) => (
            <div
              key={d._id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-black">
                {d.name}
              </h3>

              <p className="text-gray-700 text-sm">{d.email}</p>
              <p className="text-gray-700 text-sm">{d.phone}</p>

              <p className="mt-2 font-semibold">
                Status:{" "}
                {d.isApproved ? (
                  <span className="text-black">Approved</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </p>

              {/* Documents */}
              <div className="mt-3">
                <p className="font-semibold text-black mb-1">
                  Documents
                </p>
                <ul className="text-sm space-y-1">
                  {d.drivingLicense && (
                    <li>
                      <a
                        href={`${API}/uploads/${d.drivingLicense}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-red-600 underline"
                      >
                        Driving Licence
                      </a>
                    </li>
                  )}
                  {d.abstractPaper && (
                    <li>
                      <a
                        href={`${API}/uploads/${d.abstractPaper}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-red-600 underline"
                      >
                        Abstract Paper
                      </a>
                    </li>
                  )}
                  {d.insurance && (
                    <li>
                      {/* https://newb-1.onrender.com */}
                      <a
                        href={`${API}/uploads/${d.insurance}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-red-600 underline"
                      >
                        Insurance
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                {!d.isApproved && (
                  <button
                    onClick={() => approveDriver(d._id)}
                    className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() => deleteDriver(d._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}