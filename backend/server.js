const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const user = require('./user'); // Make sure your User.js schema model is in the same folder

const app = express();

// Middleware configurations
app.use(express.json());
app.use(cors());

// Establish connection with MongoDB Atlas Cloud

// Establish connection with MongoDB Atlas Cloud (Cleaned Protocol and hardcoded for safety)
mongoose.connect('mongodb+srv://kadmin:kadim369@cluster0.vr8czrc.mongodb.net/nichayavedika?retryWrites=true&w=majority')
    .then(() => console.log('Successfully connected to MongoDB Atlas Cloud!'))
    .catch(err => console.error('MongoDB Cloud connection error:', err));


/*mongoose.connect(process.env.MONGO_URI || 'mmongodb+srv://kadmin:kadim369@cluster0.vr8czrc.mongodb.net/nichayavedika?retryWrites=true&w=majority')
    .then(() => console.log('Successfully connected to MongoDB Atlas Cloud!'))
    .catch(err => console.error('MongoDB Cloud connection error:', err));*/

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

// Start the port listening block
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server running cleanly on port ${PORT}`));
