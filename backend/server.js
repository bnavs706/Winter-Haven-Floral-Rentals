
require("dotenv").config();

const cors = require("cors");
const express = require("express");

// Import routes
const contactRoutes = require("./routes/contactRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", contactRoutes);
app.use("/api/bookings", bookingRoutes);

// Test endpoint
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Haven Floral Rentals backend is working!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
