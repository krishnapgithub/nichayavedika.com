const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Prevents duplicate registrations with the same email address
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    religion: { type: String, default: 'Any' },
    community: { type: String, default: 'Any' },
    age: { type: Number, default: 25 },
    gender: { type: String, enum: ['Male', 'Female'], default: 'Female' },
    location: { type: String, default: 'Any' },
    createdAt: {
        type: Date,
        default: Date.now // Logs exactly when this account profile was generated
    }
});

module.exports = mongoose.model('User', UserSchema);
