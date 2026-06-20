const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path'); // Added for production static file serving
require('dotenv').config();

const app = express();

// Middleware configurations
app.use(express.json());
app.use(cors());

// -------------------------------------------------------------------------
// COMBINED SCHEMA: Defined inline directly to prevent any Vercel file import errors
// -------------------------------------------------------------------------
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    religion: { type: String, required: true },
    location: { type: String, required: true },
    profession: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Handles serverless environment hot-reloads safely
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Establish connection with MongoDB Atlas Cloud
mongoose.connect('mongodb+srv://kadmin:kadim369@cluster0.vr8czrc.mongodb.net/nichayavedika?retryWrites=true&w=majority')
    .then(() => console.log('Successfully connected to MongoDB Atlas Cloud!'))
    .catch(err => console.error('MongoDB Cloud connection error:', err));

// 1. GET ROUTE: Fetches latest profiles from MongoDB Atlas to display on cards
app.get('/api/auth/profiles', async (req, res) => {
    try {
        const users = await User.find({}, 'fullName gender age location profession')
            .sort({ createdAt: -1 })
            .limit(4);
        return res.status(200).json(users);
    } catch (error) {
        console.error("Database fetch error:", error);
        return res.status(500).json({ message: "Error retrieving cloud profiles." });
    }
});

// 2. POST ROUTE: Handles your AuthModals registration submissions safely
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, password, gender, age, religion, location, profession } = req.body;

        if (!fullName || !email || !password || !gender || !age || !religion || !location || !profession) {
            return res.status(400).json({ message: "Please fill in all layout fields." });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "This email address is already registered." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            gender,
            age: Number(age),
            religion,
            location,
            profession
        });

        await newUser.save();
        return res.status(201).json({ message: "Registration successful! Profile saved to cloud." });
    } catch (error) {
        console.error("Database save error:", error);
        return res.status(500).json({ message: "An internal server registration error occurred." });
    }
});

// 3. NEW LOGIN ROUTE: Validates incoming AuthModals login check-ins securely
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password fields." });
        }

        // Lookup user in MongoDB Atlas
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid email credentials or password match." });
        }

        // Compare encrypted passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email credentials or password match." });
        }

        return res.status(200).json({
            message: "Login successful!",
            user: { id: user._id, fullName: user.fullName, email: user.email }
        });
    } catch (error) {
        console.error("Login verification routing failure:", error);
        return res.status(500).json({ message: "An internal login error occurred." });
    }
});

// 4. PRODUCTION ROUTER HANDLER: Delivers compiled React build pages automatically
if (process.env.NODE_ENV === 'production') {
    // Point express to serve your compiled client folder assets
    app.use(express.static(path.join(__dirname, 'client/dist'))); // Change to 'client/build' if using Create-React-App

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

// Start the port listening block
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running cleanly on port ${PORT}`));
