import { useState } from "react";

export default function VinDecoder() {
  const [vin, setVin] = useState("");
  const [vinData, setVinData] = useState(null);
  const API = process.env.REACT_APP_API_BASE_URL;
// https://newb-1.onrender.com
  const decodeVin = async () => {
    const res = await fetch(`${API}/decode-vin/${vin}`);
    const data = await res.json();
    setVinData(data);
  };

  return (
    <div>
      <h2>VIN Decoder</h2>
      <input placeholder="Enter VIN" value={vin} onChange={e=>setVin(e.target.value)} />
      <button onClick={decodeVin}>Decode VIN</button>
      {vinData && <pre>{JSON.stringify(vinData, null, 2)}</pre>}
    </div>
  );
}