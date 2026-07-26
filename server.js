const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// API + redirect routes
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});