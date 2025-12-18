const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- BED DATA ----------------
let beds = [
  { id: 1, hospital: "City Hospital", department: "ICU", status: "Available" },
  { id: 2, hospital: "City Hospital", department: "Emergency", status: "Occupied" },
  { id: 3, hospital: "City Hospital", department: "General", status: "Cleaning" },

  { id: 4, hospital: "Apollo Hospital", department: "ICU", status: "Available" },
  { id: 5, hospital: "Apollo Hospital", department: "Emergency", status: "Occupied" },
  { id: 6, hospital: "Apollo Hospital", department: "General", status: "Available" },

  { id: 7, hospital: "Government Hospital", department: "ICU", status: "Occupied" },
  { id: 8, hospital: "Government Hospital", department: "Emergency", status: "Available" },
  { id: 9, hospital: "Government Hospital", department: "General", status: "Cleaning" }
];

// ---------------- APIs ----------------

// Get all beds
app.get("/beds", (req, res) => {
  res.json(beds);
});

// Update bed status
app.post("/update-bed", (req, res) => {
  const { id, status } = req.body;

  beds = beds.map(bed =>
    bed.id === id ? { ...bed, status } : bed
  );

  res.json({ success: true });
});

// Hospital summary
app.get("/hospital-summary", (req, res) => {
  const summary = {};

  beds.forEach(bed => {
    if (!summary[bed.hospital]) {
      summary[bed.hospital] = {
        hospital: bed.hospital,
        available: 0,
        occupied: 0,
        cleaning: 0
      };
    }

    if (bed.status === "Available") summary[bed.hospital].available++;
    if (bed.status === "Occupied") summary[bed.hospital].occupied++;
    if (bed.status === "Cleaning") summary[bed.hospital].cleaning++;
  });

  res.json(Object.values(summary));
});

// ---------------- SERVER ----------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
