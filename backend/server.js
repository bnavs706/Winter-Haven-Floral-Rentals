require("dotenv").config();

const cors = require("cors");

const express = require("express");

// imports route
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use("/api", contactRoutes);
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Haven Floral Rentals backend is working!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
