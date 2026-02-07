// // src/pages/admin/AdminCompletedJobsList.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminCompletedJobsList() {
//   const [jobs, setJobs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:6003/admin/completed-jobs")
//       .then(res => res.json())
//       .then(setJobs);
//   }, []);

//   return (
//     <div>
//       <h2>Completed Jobs</h2>

//       {jobs.map(job => (
//         <div key={job._id}>
//           <p>{job.problem}</p>

//           <button onClick={() => navigate(`/admin/invoice/${job._id}`)}>
//             Create Invoice
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


// src/pages/admin/AdminCompletedJobsList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const CACHE_KEY = "admin_completed_jobs_cache";

export default function AdminCompletedJobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_BASE_URL;
// https://newb-1.onrender.com
  /* ================= FETCH JOBS ================= */
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API}/admin/completed-jobs`);
      const data = await res.json();
      setJobs(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Fetch failed, loading cache");
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) setJobs(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ================= UI ================= */
  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <h1 className="text-2xl font-bold text-black">
              ✅ Completed Jobs
            </h1>

            <button
              onClick={fetchJobs}
              className="mt-3 md:mt-0 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-black"
            >
              Refresh
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <p className="text-gray-600 text-center">Loading completed jobs...</p>
          )}

          {/* EMPTY */}
          {!loading && jobs.length === 0 && (
            <p className="text-gray-600 text-center">
              No completed jobs found.
            </p>
          )}

          {/* JOBS LIST */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                  {/* JOB INFO */}
                  <div>
                    <h2 className="font-semibold text-lg text-black">
                      {job.problem || "No problem description"}
                    </h2>

                    <p className="text-sm text-gray-600">
                      Job ID: {job._id}
                    </p>

                    {job.completedAt && (
                      <p className="text-sm text-gray-600">
                        Completed on:{" "}
                        {new Date(job.completedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* ACTION */}
                  <div>
                    <button
                      onClick={() => navigate(`/admin/invoice/${job._id}`)}
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow"
                    >
                      Create Invoice
                    </button>
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