const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Pulls your User Schema blueprint

const router = express.Router();
const JWT_SECRET = 'NICHAYA_VEDIKA_SECURE_TOKEN_SECRET_KEY';

// ==========================================================================
// 1. REGISTER ACCOUNT ROUTE (POST: http://localhost:5000/api/auth/register)
// ==========================================================================
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validation Check: See if email is already taken
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        // Secure Password Protection: Hash plain-text before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and commit document directly to MongoDB collection
        user = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'Registration successful! You can log in now.' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server processing error during registration' });
    }
});

// ==========================================================================
// 2. LOGIN ACCOUNT ROUTE (POST: http://localhost:5000/api/auth/login)
// ==========================================================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation Check: Look for matching user entry logs
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or profile ID details' });
        }

        // Compare form password input text with database encrypted hash string
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password credentials' });
        }

        // Issue a digital Web Token session key mapping for safety tracking
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            token,
            user: { id: user._id, fullName: user.fullName, email: user.email },
            message: 'Authentication check passed!'
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server authentication processing fault' });
    }
});

module.exports = router;
