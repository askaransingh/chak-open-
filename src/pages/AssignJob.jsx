// import { useState, useEffect } from "react";

// export default function AssignJob() {
//   const [jobs, setJobs] = useState([]);
//   const [mechanics, setMechanics] = useState([]);
//   const [selected, setSelected] = useState({});

//   useEffect(() => {
//     fetch("http://localhost:6003/admin/jobs").then(res => res.json()).then(setJobs);
//     fetch("http://localhost:6003/admin/mechanics").then(res => res.json()).then(setMechanics);
//   }, []);

//   const assign = async () => {
//     await fetch("http://localhost:6003/admin/assign-job", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(selected)
//     });
//     alert("Job Assigned");
//   };

//   return (
//     <>
//       <h2>Assign Job</h2>

//       <select onChange={e => setSelected({...selected, jobId:e.target.value})}>
//         <option>Select Job</option>
//         {jobs.map(j => <option value={j._id}>{j.problem}</option>)}
//       </select>

//       <select onChange={e => setSelected({...selected, mechanicId:e.target.value})}>
//         <option>Select Mechanic</option>
//         {mechanics.map(m => <option value={m._id}>{m.name}</option>)}
//       </select>

//       <button onClick={assign}>Assign</button>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

export default function AssignJob() {
  const [jobs, setJobs] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [selected, setSelected] = useState({
    jobId: "",
    mechanicId: "",
  });
  const [loading, setLoading] = useState(false);
  const API = process.env.REACT_APP_API_BASE_URL;
  const JOBS_CACHE = "admin_jobs_cache";
  const MECH_CACHE = "admin_mechanics_cache";

  // ✅ Fetch jobs + mechanics with cache
  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, mechRes] = await Promise.all([
        fetch(`${API}/admin/jobs`),
        fetch(`${API}/admin/mechanics`),
      ]);

      const jobsData = await jobsRes.json();
      const mechData = await mechRes.json();

      setJobs(Array.isArray(jobsData) ? jobsData : []);
      setMechanics(Array.isArray(mechData) ? mechData : []);

      localStorage.setItem(JOBS_CACHE, JSON.stringify(jobsData));
      localStorage.setItem(MECH_CACHE, JSON.stringify(mechData));
    } catch (err) {
      console.error("Fetch failed, loading cache");

      const cachedJobs = localStorage.getItem(JOBS_CACHE);
      const cachedMech = localStorage.getItem(MECH_CACHE);

      if (cachedJobs) setJobs(JSON.parse(cachedJobs));
      if (cachedMech) setMechanics(JSON.parse(cachedMech));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Assign job
  const assign = async () => {
    if (!selected.jobId || !selected.mechanicId) {
      alert("Please select both job and mechanic");
      return;
    }

    await fetch(`${API}/admin/assign-job`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected),
    });

    alert("✅ Job assigned successfully");
    setSelected({ jobId: "", mechanicId: "" });
    fetchData();
  };

  return (
    <><AdminNavbar />
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-xl bg-white border border-gray-300 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-6">
          🛠️ Assign Job to Mechanic
        </h1>

        {loading && <p className="text-gray-600 mb-4">Loading data...</p>}

        {/* Job Select */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-black">
            Select Job
          </label>
          <select
            value={selected.jobId}
            onChange={(e) =>
              setSelected({ ...selected, jobId: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">Choose a job</option>
            {jobs.map((j) => (
              <option key={j._id} value={j._id}>
                {j.problem} — {j.customerName}
              </option>
            ))}
          </select>
        </div>

        {/* Mechanic Select */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-black">
            Select Mechanic
          </label>
          <select
            value={selected.mechanicId}
            onChange={(e) =>
              setSelected({ ...selected, mechanicId: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">Choose a mechanic</option>
            {mechanics
              .filter((m) => m.isApproved)
              .map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} — {m.skills}
                </option>
              ))}
          </select>
        </div>

        {/* Assign Button */}
        <button
          onClick={assign}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-semibold"
        >
          Assign Job
        </button>
      </div>
    </div>
    </>
  );
}