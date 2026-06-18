const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

const app = express();

// Boot database connection engine loop instantly
connectDB();

// Global Network Middleware configurations
app.use(cors()); // Enables cross-origin sharing so React can access endpoints
app.use(express.json()); // Instructs server to process JSON format streams cleanly

// Route Endpoints Mapping definitions
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🛰️  Node.js Backend Server Active on Port: ${PORT}`));
