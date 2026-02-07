// import { useEffect, useState } from "react";

// export default function MechanicJobHistory() {
//   const [jobs, setJobs] = useState([]);

//   const mechanic = JSON.parse(localStorage.getItem("mechanic"));
//   const mechanicId = mechanic?.id || mechanic?._id;

//   useEffect(() => {
//     fetch(`http://localhost:6003/mechanic/job-history/${mechanicId}`)
//       .then(res => res.json())
//       .then(setJobs);
//   }, [mechanicId]);

//   return (
//     <>
//       <h2>Job History</h2>

//       {jobs.length === 0 && <p>No jobs yet</p>}

//       {jobs.map(job => (
//         <div key={job._id} style={{ border: "1px solid #ccc", padding: 10 }}>
//           <p><b>Problem:</b> {job.problem}</p>
//           <p><b>Status:</b> {job.status}</p>
//           <p><b>Amount:</b> ₹{job.amount || "-"}</p>
//           <p><b>Note:</b> {job.mechanicNote || "-"}</p>
//           <p><b>Created:</b> {new Date(job.createdAt).toLocaleString()}</p>
//         </div>
//       ))}
//     </>
//   );
// }

import { useEffect, useState } from "react";

export default function MechanicJobHistory() {
  const mechanic = JSON.parse(localStorage.getItem("mechanic"));
  const mechanicId = mechanic?.id || mechanic?._id;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const CACHE_KEY = `mechanic_job_history_${mechanicId}`;
  const API = process.env.REACT_APP_API_BASE_URL;
  // ✅ Fetch job history with cache
  const fetchHistory = async () => {
    if (!mechanicId) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/mechanic/job-history/${mechanicId}`
      );
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) setJobs(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [mechanicId]);

  if (!mechanicId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Please login to view job history
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        🧾 Job History
      </h1>

      {loading && <p className="text-gray-600">Loading job history...</p>}

      {!loading && jobs.length === 0 && (
        <p className="text-gray-600">No completed jobs yet.</p>
      )}

      {/* Job Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <p className="font-semibold text-black mb-1">
              Problem
            </p>
            <p className="text-gray-700 mb-3">
              {job.problem}
            </p>

            <p className="mb-1">
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-red-600 font-semibold">
                {job.status}
              </span>
            </p>

            <p className="mb-1">
              <span className="font-semibold">Amount:</span>{" "}
              <span className="text-black">
                ₹{job.amount || "-"}
              </span>
            </p>

            <p className="mb-2">
              <span className="font-semibold">Note:</span>{" "}
              <span className="text-gray-700">
                {job.mechanicNote || "-"}
              </span>
            </p>

            <p className="text-sm text-gray-500 mt-3 border-t pt-2">
              {new Date(job.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}