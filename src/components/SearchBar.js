// // // import { useState, useEffect } from "react";

// // // export default function SearchBar({ setResults, setSuggestions, suggestions }) {
// // //     const [query, setQuery] = useState("");
// // //     const [category, setCategory] = useState("");

// // //     useEffect(() => {
// // //         const timer = setTimeout(() => {
// // //             if (query) fetchResults(query, category);
// // //         }, 300);
// // //         return () => clearTimeout(timer);
// // //     }, [query, category]);

// // //     //   const fetchResults = async (q, cat) => {
// // //     //     const res = await fetch(`http://localhost:4001/search?query=${q}&category=${cat}&limit=20&page=1`);
// // //     //     const data = await res.json();
// // //     //     setResults(data.results);
// // //     //     setSuggestions(data.suggestions);
// // //     //   };
// // //     const fetchResults = async (query) => {
// // //         try {
// // //             const response = await fetch(
// // //                 `http://localhost:4001/search?query=${query}&category=&limit=20&page=1`
// // //             );

// // //             if (!response.ok) {
// // //                 // Handle HTTP errors (like 500)
// // //                 console.error(`Server error: ${response.status} ${response.statusText}`);
// // //                 setResults([]);
// // //                 setError('Something went wrong. Please try again later.');
// // //                 return;
// // //             }

// // //             const data = await response.json();
// // //             setResults(data);
// // //             setError(null);
// // //         } catch (err) {
// // //             // Handle network errors or JSON parsing errors
// // //             console.error('Fetch error:', err);
// // //             setResults([]);
// // //             setError('Failed to fetch data. Check your network.');
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <input
// // //                 type="text"
// // //                 placeholder="Search parts..."
// // //                 value={query}
// // //                 onChange={e => setQuery(e.target.value)}
// // //             />
// // //             {suggestions.length > 0 && (
// // //                 <ul className="suggestions-dropdown">
// // //                     {suggestions.map((s, i) => (
// // //                         <li key={i} onClick={() => setQuery(s.name)}>{s.name} ({s.partNumber})</li>
// // //                     ))}
// // //                 </ul>
// // //             )}
// // //             <select onChange={e => setCategory(e.target.value)}>
// // //                 <option value="">All Categories</option>
// // //             </select>
// // //         </div>
// // //     );
// // // }

// // import { useState, useEffect, useCallback } from "react";

// // export default function SearchBar({ setResults, setSuggestions, suggestions }) {
// //   const [query, setQuery] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [error, setError] = useState(null); // Added error state

// //   const fetchResults = useCallback(async (q, cat) => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:4001/search?query=${q}&category=${cat}&limit=20&page=1`
// //       );

// //       if (!response.ok) {
// //         console.error(`Server error: ${response.status} ${response.statusText}`);
// //         setResults([]);
// //         setError('Something went wrong. Please try again later.');
// //         return;
// //       }

// //       const data = await response.json();
// //       setResults(data.results || []); // make sure results exist
// //       setSuggestions(data.suggestions || []);
// //       setError(null);
// //     } catch (err) {
// //       console.error('Fetch error:', err);
// //       setResults([]);
// //       setSuggestions([]);
// //       setError('Failed to fetch data. Check your network.');
// //     }
// //   }, [setResults, setSuggestions]);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       if (query) fetchResults(query, category);
// //     }, 300);
// //     return () => clearTimeout(timer);
// //   }, [query, category, fetchResults]);

// //   return (
// //     <div>
// //       <input
// //         type="text"
// //         placeholder="Search parts..."
// //         value={query}
// //         onChange={e => setQuery(e.target.value)}
// //       />
// //       {error && <div className="error">{error}</div>} {/* Display errors */}
// //       {suggestions.length > 0 && (
// //         <ul className="suggestions-dropdown">
// //           {suggestions.map((s, i) => (
// //             <li key={i} onClick={() => setQuery(s.name)}>
// //               {s.name} ({s.partNumber})
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //       <select onChange={e => setCategory(e.target.value)}>
// //         <option value="">All Categories</option>
// //       </select>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SearchBar = () => {
//   const [parts, setParts] = useState([]);
//   const [query, setQuery] = useState('');
//   const [vin, setVin] = useState('');

//   // Fetch all parts on initial load
//   useEffect(() => {
//     fetchParts();
//   }, []);

//   const fetchParts = async (params = {}) => {
//     try {
//       const res = await axios.get('http://localhost:4001/search', { params });
//       setParts(res.data.results);
//     } catch (err) {
//       console.error('Error fetching parts:', err);
//     }
//   };

//   // Handle combined search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchParts({ query, vin });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search parts..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           style={{ marginRight: '5px' }}
//         />
//         <input
//           type="text"
//           placeholder="Enter VIN..."
//           value={vin}
//           onChange={(e) => setVin(e.target.value)}
//           style={{ marginRight: '5px' }}
//         />
//         <button type="submit">Search / Decode VIN</button>
//       </form>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Parts ({parts.length})</h3>
//         <ul>
//           {parts.map(part => (
//             <li key={part.id}>
//               {part.name} - {part.category} {part.vinCompatible?.length ? `(VINs: ${part.vinCompatible.join(', ')})` : ''}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [parts, setParts] = useState([]);
  const [query, setQuery] = useState('');
  const [vin, setVin] = useState('');

  // Fetch all parts on initial load
  useEffect(() => {
    fetchParts();
  }, []);
// https://newb-1.onrender.com
  const API = process.env.REACT_APP_API_BASE_URL;
  const fetchParts = async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const res = await fetch(`${API}/search?${queryString}`);
      const data = await res.json();
      setParts(data.results);
    } catch (err) {
      console.error('Error fetching parts:', err);
    }
  };

  // Handle combined search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchParts({ query, vin });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search parts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        <input
          type="text"
          placeholder="Enter VIN..."
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        <button type="submit">Search / Decode VIN</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Parts ({parts.length})</h3>
        <ul>
          {parts.map(part => (
            <li key={part.id}>
              {part.name} - {part.category} {part.vinCompatible?.length ? `(VINs: ${part.vinCompatible.join(', ')})` : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;