import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hospitals, setHospitals] = useState([]);
  const [beds, setBeds] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const h = await fetch("http://localhost:5000/hospital-summary").then(res => res.json());
    const b = await fetch("http://localhost:5000/beds").then(res => res.json());
    setHospitals(h);
    setBeds(b);
  };

  const updateStatus = async (id, status) => {
    await fetch("http://localhost:5000/update-bed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    });
    loadData();
  };

  const getColor = (status) => {
    if (status === "Available") return "#2ecc71";
    if (status === "Occupied") return "#e74c3c";
    return "#f39c12";
  };

  return (
    <div className="container">
      <h1>🚑 Accident Emergency Hospital Availability Dashboard</h1>

      <h2>🏥 Hospitals</h2>
      <div className="grid">
        {hospitals.map(h => (
          <div
            key={h.hospital}
            className="hospital-card"
            onClick={() => setSelectedHospital(h.hospital)}
          >
            <h3>{h.hospital}</h3>
            <p>🟢 Available: {h.available}</p>
            <p>🔴 Occupied: {h.occupied}</p>
            <p>🟠 Cleaning: {h.cleaning}</p>
          </div>
        ))}
      </div>

      {selectedHospital && (
        <>
          <h2>🛏️ Beds in {selectedHospital}</h2>
          <div className="grid">
            {beds
              .filter(b => b.hospital === selectedHospital)
              .map(bed => (
                <div
                  key={bed.id}
                  className="bed-card"
                  style={{ backgroundColor: getColor(bed.status) }}
                >
                  <p><b>Bed ID:</b> {bed.id}</p>
                  <p><b>Department:</b> {bed.department}</p>
                  <p><b>Status:</b> {bed.status}</p>

                  <div className="buttons">
                    <button onClick={() => updateStatus(bed.id, "Occupied")}>
                      Accept
                    </button>
                    <button onClick={() => updateStatus(bed.id, "Cleaning")}>
                      Discharge
                    </button>
                    <button onClick={() => updateStatus(bed.id, "Available")}>
                      Available
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
