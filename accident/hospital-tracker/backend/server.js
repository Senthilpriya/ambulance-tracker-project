const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let beds = [
  { id: 1, department: "ICU", status: "Available" },
  { id: 2, department: "ICU", status: "Occupied" },
  { id: 3, department: "General", status: "Available" },
  { id: 4, department: "General", status: "Occupied" },
  { id: 5, department: "Emergency", status: "Available" }
];

// Auto-update bed status every 5 seconds
setInterval(() => {
  beds = beds.map(bed => {
    const statuses = ["Available", "Occupied", "Cleaning"];
    bed.status = statuses[Math.floor(Math.random() * statuses.length)];
    return bed;
  });
}, 5000);

// API to get beds
app.get("/beds", (req, res) => {
  res.json(beds);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
