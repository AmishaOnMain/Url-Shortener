const express = require("express");

const router = express.Router();

const {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getUrlStats,
  redirectToOriginalUrl,
} = require("../controllers/urlController");

// Create Short URL
router.post("/shorten", createShortUrl);

// Get Original URL Details
router.get("/shorten/:shortCode", getOriginalUrl);

// Update Existing URL
router.put("/shorten/:shortCode", updateShortUrl);

// Delete URL
router.delete("/shorten/:shortCode", deleteShortUrl);

// Get Statistics
router.get("/shorten/:shortCode/stats", getUrlStats);

// Redirect to Original URL
router.get("/:shortCode", redirectToOriginalUrl);

module.exports = router;
