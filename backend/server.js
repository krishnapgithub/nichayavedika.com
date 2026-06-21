const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware configurations 
app.use(express.json());
app.use(cors());

// 🌟 Landing Page Health Route: Catches bare root domain requests and stops Vercel 404s
app.get('/', (req, res) => {
    res.status(200).send("NichayaVedika Matrimony Backend API is live and running cleanly!");
});

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
    createdAt: { type: Date, default: Date.now },
    passwordChangedAt: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

// Handles serverless environment hot-reloads safely 
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Serverless-safe connection logic to prevent container execution timeouts
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect('mongodb+srv://kadmin:kadim369@cluster0.vr8czrc.mongodb.net/nichayavedika?retryWrites=true&w=majority');
        console.log('Successfully connected to MongoDB Atlas Cloud!');
    } catch (err) {
        console.error('MongoDB Cloud connection error:', err);
    }
};

// Database connectivity runtime wrapper middleware
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

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
            profession,
            passwordChangedAt: Date.now()
        });
        await newUser.save();
        return res.status(201).json({ message: "Registration successful! Profile saved to cloud." });
    } catch (error) {
        console.error("Database save error:", error);
        return res.status(500).json({ message: "An internal server registration error occurred." });
    }
});

// 3. UPDATED LOGIN ROUTE: Validates incoming credentials and signs a secure JWT token 
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password fields." });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid email credentials or password match." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email credentials or password match." });
        }
        const passwordAgeInDays = (Date.now() - new Date(user.passwordChangedAt).getTime()) / (1000 * 60 * 60 * 24);
        if (passwordAgeInDays >= 90) {
            return res.status(403).json({ message: "Your password has expired (90 days limit). Please use the password reset link to update it.", requiresPasswordReset: true });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret_key_369',
            { expiresIn: '7d' }
        );
        return res.status(200).json({ message: "Login successful!", token: token, user: { id: user._id, fullName: user.fullName, email: user.email } });
    } catch (error) {
        console.error("Login verification routing failure:", error);
        return res.status(500).json({ message: "An internal login error occurred." });
    }
});

// 4. PASSWORD RESET STEP 1: Process forgotten credential matching requests 
app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "No profile registered with that email address." });
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
        });
        const resetUrl = `http://localhost:5173/reset-password/${token}`;
        const mailOptions = {
            from: `"NichayaVedika Matrimony" <info@nichayavedika.com>`,
            to: user.email,
            subject: 'NichayaVedika Account Password Recovery Link',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #d4af37; padding: 20px; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #800000; text-align: center;">Account Password Reset</h2>
          <p>Hello ${user.fullName},</p>
          <p>We received a request to reset your password for your profile on NichayaVedika Matrimony.</p>
          <p>Please click the button below to update your security credentials. This link will expire in 1 hour.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #800000; color: #ffffff; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">Reset My Password</a>
          </div>
          <p style="color: #666666; font-size: 13px;">If you did not request this change, please ignore this email safely.</p>
        </div>
      `
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (mailError) {
            console.log("=========================================================");
            console.log(`[DEV MODE LINK BYPASS]: Reset link -> ${resetUrl}`);
            console.log("=========================================================");
            return res.status(200).json({ message: "Password reset instructions sent successfully! (Dev Mode: Checked Terminal Link)" });
        }
        return res.status(200).json({ message: "Password reset instructions sent successfully! Please check your email inbox." });
    } catch (error) {
        console.error("Forgot password process error:", error);
        return res.status(500).json({ message: "An internal server mailing error occurred." });
    }
});

// 5. PASSWORD RESET STEP 2: Validate token and overwrite password schema document 
app.post('/api/reset-password/:token', async (req, res) => {
    try {
        const { password } = req.body;
        const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: "Password reset token is invalid or has expired." });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.passwordChangedAt = Date.now();
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully! You can now log in." });
    } catch (error) {
        console.error("Reset password process error:", error);
        return res.status(500).json({ message: "An internal server error occurred." });
    }
});

// 🌟 Local server engine runner listener wrapper
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Backend server running cleanly on port ${PORT}`));
}

// 🌟 CRUCIAL EXPORT ACTION FOR VERCEL FUNCTION SYSTEM MAPPING
module.exports = app;
