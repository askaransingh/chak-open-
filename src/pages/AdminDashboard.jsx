
// import { useEffect, useState } from "react";

// export default function AdminDashboard() {
//   const [mechanics, setMechanics] = useState([]);
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:6003/admin/mechanics")
//       .then(res => res.json())
//       .then(setMechanics);

//     fetch("http://localhost:6003/admin/jobs")
//       .then(res => res.json())
//       .then(setJobs);
//   }, []);

//   const approve = async (id) => {
//     await fetch(`http://localhost:6003/admin/approve/${id}`, { method: "POST" });
//     alert("Approved");
//   };

//   const assignJob = async (jobId, mechanicId) => {
//     await fetch("http://localhost:6003/admin/assign-job", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ jobId, mechanicId })
//     });
//     alert("Job Assigned");
//   };

//   const payMechanic = async (jobId) => {
//     await fetch("http://localhost:6003/admin/pay-mechanic", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ jobId })
//     });
//     alert("Mechanic Paid");
//   };

//   return (
//     <>
//       <h2>Admin Dashboard</h2>

   

//       <h3>Mechanics</h3>

//       {mechanics.map(m => (
//         <div
//           key={m._id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 10,
//             marginBottom: 10
//           }}
//         >
//           <p><b>Name:</b> {m.name}</p>
//           <p><b>Email:</b> {m.email}</p>
//           <p><b>Phone:</b> {m.phone}</p>
//           <p><b>Skills:</b> {m.skills}</p>

//             <p><b>Documents:</b></p>
//             <ul>
//               {m.documents?.journeyman && (
//                 <li>
//                   Journeyman —
//                   <a
//                     href={`http://localhost:6003/${m.documents.journeyman}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     View
//                   </a>
//                 </li>
//               )}

//               {m.documents?.redSeal && (
//                 <li>
//                   Red Seal —
//                   <a
//                     href={`http://localhost:6003/${m.documents.redSeal}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     View
//                   </a>
//                 </li>
//               )}

//               {m.documents?.insurance && (
//                 <li>
//                   Insurance —
//                   <a
//                     href={`http://localhost:6003/${m.documents.insurance}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     View
//                   </a>
//                 </li>
//               )}

//               {m.documents?.businessInsurance && (
//                 <li>
//                   Business Insurance —
//                   <a
//                     href={`http://localhost:6003/${m.documents.businessInsurance}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     View
//                   </a>
//                 </li>
//               )}

//               {m.documents?.drivingLicense && (
//                 <li>
//                   Driving License —
//                   <a
//                     href={`http://localhost:6003/${m.documents.drivingLicense}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     View
//                   </a>
//                 </li>
//               )}
//             </ul>
//           <p>
//             <b>Status:</b>{" "}
//             {m.isApproved ? "✅ Approved" : "⏳ Pending Approval"}
//           </p>

//           {!m.isApproved && (
//             <button onClick={() => approve(m._id)}>
//               Approve Mechanic
//             </button>
//           )}
//         </div>
//       ))}

//       <h3>Customer Jobs</h3>

// {jobs.map(j => (
//   <div
//     key={j._id}
//     style={{
//       border: "1px solid #ccc",
//       padding: 10,
//       marginBottom: 10
//     }}
//   >
//     <p><b>Problem:</b> {j.problem}</p>

//     <p><b>Customer Name:</b> {j.customerName}</p>
//     <p><b>Email:</b> {j.customerEmail}</p>
//     <p><b>Phone:</b> {j.customerPhone}</p>

//     <p>
//       <b>Address:</b><br />
//       {j.serviceAddress?.street}, {j.serviceAddress?.city}<br />
//       {j.serviceAddress?.province} {j.serviceAddress?.postalCode}
//     </p>

//     <p><b>Status:</b> {j.status}</p>

//     {/* Assign mechanic */}
//     {j.status === "pending" && (
//       <select onChange={e => assignJob(j._id, e.target.value)}>
//         <option>Select Mechanic</option>
//         {mechanics.map(m => (
//           <option key={m._id} value={m._id}>
//             {m.name}
//           </option>
//         ))}
//       </select>
//     )}

//     {/* Pay mechanic */}
//     {j.status === "invoice_sent" && (
//       <button onClick={() => payMechanic(j._id)}>
//         Pay Mechanic
//       </button>
//     )}
//   </div>
// ))}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

export default function AdminDashboard() {
  const [mechanics, setMechanics] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const MECHANIC_CACHE = "admin_mechanics_cache";
  const JOBS_CACHE = "admin_jobs_cache";
  const API = process.env.REACT_APP_API_BASE_URL;
  // ✅ Fetch all data with cache
  const fetchData = async () => {
    setLoading(true);
    try {
      const [mRes, jRes] = await Promise.all([
        fetch(`${API}/admin/mechanics`),
        fetch(`${API}/admin/jobs`),
      ]);

      const mData = await mRes.json();
      const jData = await jRes.json();

      setMechanics(mData || []);
      setJobs(jData || []);

      localStorage.setItem(MECHANIC_CACHE, JSON.stringify(mData));
      localStorage.setItem(JOBS_CACHE, JSON.stringify(jData));
    } catch (err) {
      const cachedM = localStorage.getItem(MECHANIC_CACHE);
      const cachedJ = localStorage.getItem(JOBS_CACHE);

      if (cachedM) setMechanics(JSON.parse(cachedM));
      if (cachedJ) setJobs(JSON.parse(cachedJ));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Actions
  const approve = async (id) => {
    await fetch(`${API}/admin/approve/${id}`, {
      method: "POST",
    });
    alert("Mechanic approved");
    fetchData();
  };
// https://newb-1.onrender.com
  const assignJob = async (jobId, mechanicId) => {
    if (!mechanicId) return;
    await fetch(`${API}/admin/assign-job`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, mechanicId }),
    });
    alert("Job assigned");
    fetchData();
  };
// https://newb-1.onrender.com
  const payMechanic = async (jobId) => {
    await fetch(`${API}/admin/pay-mechanic`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });
    alert("Mechanic paid");
    fetchData();
  };

  return (
    <>
    <AdminNavbar />
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      
      <h1 className="text-3xl font-bold text-red-600 mb-8">
        🛠️ Admin Dashboard
      </h1>

      {loading && <p className="text-gray-600 mb-4">Loading data...</p>}

      {/* ================= MECHANICS ================= */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-black mb-4">
          Mechanics
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mechanics.map((m) => (
            <div
              key={m._id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <p className="font-semibold text-black">{m.name}</p>
              <p className="text-gray-700 text-sm">{m.email}</p>
              <p className="text-gray-700 text-sm">{m.phone}</p>
              <p className="text-gray-600 text-sm mt-1">
                <b>Skills:</b> {m.skills}
              </p>

              {/* Documents */}
              <div className="mt-3">
                <p className="font-semibold text-black mb-1">Documents</p>
                <ul className="text-sm text-red-600 space-y-1">
                  {Object.entries(m.documents || {}).map(([key, value]) => (
                    <li key={key}>
                      <a
                        href={`${API}/${value}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {key}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-3 font-semibold">
                Status:{" "}
                {m.isApproved ? (
                  <span className="text-black">Approved</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </p>

              {!m.isApproved && (
                <button
                  onClick={() => approve(m._id)}
                  className="mt-3 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Approve Mechanic
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= JOBS ================= */}
      <section>
        <h2 className="text-2xl font-semibold text-black mb-4">
          Customer Jobs
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <div
              key={j._id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <p className="font-semibold text-black mb-1">
                {j.problem}
              </p>

              <p className="text-gray-700 text-sm">
                {j.customerName} • {j.customerPhone}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                {j.customerEmail}
              </p>

              <p className="text-sm text-gray-700 mb-2">
                {j.serviceAddress?.street},{" "}
                {j.serviceAddress?.city},{" "}
                {j.serviceAddress?.province}{" "}
                {j.serviceAddress?.postalCode}
              </p>

              <p className="font-semibold mb-2">
                Status:{" "}
                <span className="text-red-600">{j.status}</span>
              </p>

              {/* Assign */}
              {j.status === "pending" && (
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  onChange={(e) => assignJob(j._id, e.target.value)}
                >
                  <option value="">Assign Mechanic</option>
                  {mechanics
                    .filter((m) => m.isApproved)
                    .map((m) => (
                      <option key={m._id} value={m._id}>
                        {m.name}
                      </option>
                    ))}
                </select>
              )}

              {/* Pay */}
              {j.status === "invoice_sent" && (
                <button
                  onClick={() => payMechanic(j._id)}
                  className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  Pay Mechanic
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}