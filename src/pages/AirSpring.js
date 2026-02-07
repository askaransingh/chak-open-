
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
// import MyOrders from "./MyOrders";





function Catalog() {
  const [parts, setParts] = useState([]);
  const [displayParts, setDisplayParts] = useState([]);
  const [search, setSearch] = useState("");
  const [vin, setVin] = useState("");
  const [vinData, setVinData] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_BASE_URL;
// https://newb-1.onrender.com
  useEffect(() => {
    fetch(`${API}/api/airsprings`)
      .then((res) => res.json())
      .then((data) => {
        setParts(data);
        setDisplayParts(data);
      });
  }, []);

  // VIN decoder
  const handleVinDecode = async () => {
    if (!vin) return alert("Please enter a VIN");
    try {
      const res = await fetch(`${API}/decode-vin/${vin}`);
      if (!res.ok) throw new Error("Failed to decode VIN");
      const { vinData, relevantParts } = await res.json();
      setVinData(vinData);
      setDisplayParts(relevantParts);
    } catch (err) {
      console.error(err);
      alert("Failed to decode VIN");
    }
  };

  const handleAddToCart = (part) => {
    const quantity = quantities[part._id] || 1;
    if (quantity <= 0) return alert("Quantity must be at least 1");
    navigate("/checkout", { state: { cart: [{ ...part, quantity }] } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Air Spring Catalog</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by brand, model, category..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          const query = e.target.value.toLowerCase();
          if (!query) return setDisplayParts(parts);
          setDisplayParts(
            parts.filter((part) =>
              Object.values(part).some((v) =>
                String(v).toLowerCase().includes(query)
              )
            )
          );
        }}
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />

      {/* VIN decoder */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter VIN to decode"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button onClick={handleVinDecode} style={{ padding: "8px 12px" }}>
          Decode VIN
        </button>
      </div>

      {/* VIN data display */}
      {vinData && (
        <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>VIN Data:</h3>
          <pre>{JSON.stringify(vinData, null, 2)}</pre>
        </div>
      )}

      {/* Parts */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {displayParts.map((part) => (
          <div
            key={part._id}
            style={{
              width: "250px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ height: "180px", background: "#f9f9f9" }}>
              <img
                src={part.images?.[0] || "https://via.placeholder.com/250x180"}
                alt={part.partName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "10px", flexGrow: 1 }}>
              <h3>{part.partName}</h3>
              <p>Brand: {part.brand}</p>
              <p>
                Price: {part.price} {part.currency}
              </p>
              <input
                type="number"
                min={1}
                value={quantities[part._id] || 1}
                onChange={(e) =>
                  setQuantities({
                    ...quantities,
                    [part._id]: parseInt(e.target.value),
                  })
                }
                style={{ width: "60px", marginRight: "10px" }}
              />
              <button onClick={() => handleAddToCart(part)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Catalog;