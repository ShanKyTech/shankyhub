const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware for parsing JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Use Auth Routes
app.use("/api/auth", authRoutes); // Register the auth routes here

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
