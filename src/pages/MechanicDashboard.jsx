

// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // export default function MechanicDashboard() {
// //   const [jobs, setJobs] = useState([]);
// //   const [note, setNote] = useState("");
// //   const [amount, setAmount] = useState("");
// //   //  const navigate = useNavigate();
// //   const mechanic = JSON.parse(localStorage.getItem("mechanic"));
// //   const mechanicId = mechanic?.id || mechanic?._id;

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (!mechanicId) return;

// //     fetch(`http://localhost:6003/mechanic/jobs/${mechanicId}`)
// //       .then(res => res.json())
// //       .then(setJobs);
// //   }, [mechanicId]);

// //   const accept = async (id) => {
// //     await fetch(`http://localhost:6003/mechanic/accept-job/${id}`, {
// //       method: "PUT"
// //     });

// //     setJobs(prev =>
// //       prev.map(j => j._id === id ? { ...j, status: "accepted" } : j)
// //     );
// //   };

// //   const reject = async (id) => {
// //     await fetch(`http://localhost:6003/mechanic/reject-job/${id}`, {
// //       method: "PUT"
// //     });

// //     setJobs(prev => prev.filter(j => j._id !== id));
// //   };



// // const completeJob = async (jobId) => {
// //   const res =await fetch("http://localhost:6003/mechanic/complete-job", {
// //   method: "POST",
// //   headers: { "Content-Type": "application/json" },
// //   body: JSON.stringify({
// //     jobId,
// //     workNote: note,
// //     amount: Number(amount) // ⚠ convert string to number
// //   })
// // });
 
// //   const data = await res.json();
// //   alert(data.message);
// // };


// //   if (!mechanicId) return <p>Please login</p>;

// //   return (
// //     <>
// //       <h2>Mechanic Dashboard</h2>

// //       {jobs.map(j => (
// //         <div key={j._id} style={{ border: "1px solid gray", padding: 10 }}>
// //           <p><b>Problem:</b> {j.problem}</p>
// //           <p><b>Status:</b> {j.status}</p>

// //           {j.status === "assigned" && (
// //             <>
// //               <button onClick={() => accept(j._id)}>Accept</button>
// //               <button onClick={() => reject(j._id)}>Reject</button>
// //             </>
// //           )}

// //           {j.status === "accepted" && (
// //             <>
// //               <textarea
// //                 placeholder="Work done details"
// //                 value={note}
// //                 onChange={e => setNote(e.target.value)}
// //               />

// //               <input
// //                 placeholder="Amount"
// //                 value={amount}
// //                 onChange={e => setAmount(e.target.value)}
// //               />

// //               <button onClick={() => completeJob(j._id)}>
// //                 Submit Work
// //               </button>
        
// //             </>
// //           )}
// //         </div>
// //       ))}
// //     </>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function MechanicDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [note, setNote] = useState("");
//   const [amount, setAmount] = useState("");

//   const mechanic = JSON.parse(localStorage.getItem("mechanic"));
//   const mechanicId = mechanic?.id || mechanic?._id;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!mechanicId) return;

//     fetch(`http://localhost:6003/mechanic/jobs/${mechanicId}`)
//       .then(res => res.json())
//       .then(setJobs);
//   }, [mechanicId]);

//   const accept = async (id) => {
//     await fetch(`http://localhost:6003/mechanic/accept-job/${id}`, {
//       method: "PUT"
//     });
//     fetchJobs();
//   };

//   const reject = async (id) => {
//     await fetch(`http://localhost:6003/mechanic/reject-job/${id}`, {
//       method: "PUT"
//     });
//     fetchJobs();
//   };

//   const completeJob = async (jobId) => {
//     const res = await fetch("http://localhost:6003/mechanic/complete-job", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jobId,
//         workNote: note,
//         amount: Number(amount)
//       })
//     });

//     const data = await res.json();
//     alert(data.message);
//     fetchJobs();
//   };

//   const fetchJobs = () => {
//     fetch(`http://localhost:6003/mechanic/jobs/${mechanicId}`)
//       .then(res => res.json())
//       .then(setJobs);
//   };

//   if (!mechanicId) return <p>Please login</p>;

//   return (
//     <>
//       <h2>Mechanic Dashboard</h2>

//       <button onClick={() => navigate("/mechanic/job-history")}>
//         View Job History
//       </button>

//       {jobs.length === 0 && <p>No active jobs</p>}

//       {jobs.map(j => (
//         <div key={j._id} style={{ border: "1px solid gray", padding: 10 }}>
//           <p><b>Problem:</b> {j.problem}</p>
//           <p><b>Status:</b> {j.status}</p>

//           {j.status === "assigned" && (
//             <>
//               <button onClick={() => accept(j._id)}>Accept</button>
//               <button onClick={() => reject(j._id)}>Reject</button>
//             </>
//           )}

//           {j.status === "accepted" && (
//             <>
//               <textarea
//                 placeholder="Work done details"
//                 onChange={e => setNote(e.target.value)}
//               />
//               <input
//                 placeholder="Amount"
//                 onChange={e => setAmount(e.target.value)}
//               />
//               <button onClick={() => completeJob(j._id)}>
//                 Submit Work
//               </button>
//             </>
//           )}

//         </div>
//       ))}

//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MechanicDashboard() {
  const navigate = useNavigate();

  const mechanic = JSON.parse(localStorage.getItem("mechanic"));
  const mechanicId = mechanic?.id || mechanic?._id;
  const API = process.env.REACT_APP_API_BASE_URL;
  const [jobs, setJobs] = useState([]);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const CACHE_KEY = `mechanic_jobs_${mechanicId}`;
// https://newb-1.onrender.com
  // ✅ Fetch jobs (with cache)
  const fetchJobs = async () => {
    if (!mechanicId) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/mechanic/jobs/${mechanicId}`
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
    fetchJobs();
  }, [mechanicId]);

  const accept = async (id) => {
    await fetch(`${API}/mechanic/accept-job/${id}`, {
      method: "PUT"
    });
    fetchJobs();
  };

  const reject = async (id) => {
    await fetch(`${API}/mechanic/reject-job/${id}`, {
      method: "PUT"
    });
    fetchJobs();
  };

  const completeJob = async (jobId) => {
    if (!note || !amount) {
      alert("Please fill work details and amount");
      return;
    }

    const res = await fetch(
      `${API}/mechanic/complete-job`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          workNote: note,
          amount: Number(amount)
        })
      }
    );

    const data = await res.json();
    alert(data.message);
    setNote("");
    setAmount("");
    fetchJobs();
  };

  if (!mechanicId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Please login to continue
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <h1 className="text-3xl font-bold text-red-600">
          Welcome, {mechanic?.name}
        </h1>

        <button
          onClick={() => navigate("/mechanic/job-history")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          📜 Job History
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading jobs...</p>}

      {jobs.length === 0 && !loading && (
        <p className="text-gray-600">No active jobs assigned.</p>
      )}

      {/* Jobs */}
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((j) => (
          <div
            key={j._id}
            className="bg-white border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <p className="font-semibold text-black mb-1">
              Problem:
            </p>
            <p className="text-gray-700 mb-2">{j.problem}</p>

            <p className="mb-3">
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-red-600 font-semibold">
                {j.status}
              </span>
            </p>

            {/* Assigned */}
            {j.status === "assigned" && (
              <div className="flex gap-3">
                <button
                  onClick={() => accept(j._id)}
                  className="flex-1 bg-black text-white py-2 rounded hover:bg-red-600 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => reject(j._id)}
                  className="flex-1 bg-gray-400 text-black py-2 rounded hover:bg-gray-500 transition"
                >
                  Reject
                </button>
              </div>
            )}

            {/* Accepted */}
            {j.status === "accepted" && (
              <div className="space-y-3">
                <textarea
                  placeholder="Work done details"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border border-gray-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <input
                  placeholder="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <button
                  onClick={() => completeJob(j._id)}
                  className="w-full bg-black text-white py-2 rounded hover:bg-red-600 transition"
                >
                  Submit Work
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}