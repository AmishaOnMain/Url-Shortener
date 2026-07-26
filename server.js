const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
const path = require("path");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", urlRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "URL Shortener API Running",
  });
});






app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
