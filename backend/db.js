const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Enclosed in quotes and converted 'kadmin@123' to 'kadmin%40123' to escape the @ sign safely
        const databaseURI = 'mongodb+srv://kadmin:kadmin%40123@cluster0.vr8czrc.mongodb.net/nichaya_vedika_db?retryWrites=true&w=majority';
        
        await mongoose.connect(databaseURI);
        console.log('🚀 MongoDB Cloud Atlas Connected Successfully!');
    } catch (error) {
        console.error('❌ MongoDB Cloud Connection Error:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
