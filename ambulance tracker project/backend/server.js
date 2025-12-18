const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ SAMPLE HOSPITAL DATA
const hospitals = [
  {
    hospitalId: 1,
    name: "City Government Hospital",
    location: "Chennai",
    beds: [
      { bedId: 101, type: "ICU", status: "Available" },
      { bedId: 102, type: "ICU", status: "Occupied" },
      { bedId: 103, type: "General", status: "Available" }
    ]
  },
  {
    hospitalId: 2,
    name: "Apollo Emergency Care",
    location: "Bangalore",
    beds: [
      { bedId: 201, type: "Emergency", status: "Available" },
      { bedId: 202, type: "General", status: "Cleaning" },
      { bedId: 203, type: "ICU", status: "Occupied" }
    ]
  }
];

// ✅ THIS ROUTE WAS MISSING
app.get("/hospitals", (req, res) => {
  res.json(hospitals);
});

// Health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
