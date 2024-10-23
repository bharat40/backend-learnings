const mongoose = require('mongoose');
require('dotenv').config();
// Define MongoDB connection URL
// const mongoURL = "mongodb://localhost:27017/";
const mongoURL = process.env.MONGODB_URI;
// setup MongoDB connection
mongoose.connect(mongoURL);
// get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;
// defining event listeners
db.on('connected', () => {
    console.log('Successfully connected to the database!');
});
db.on('error', (err) => {
    console.error("Connection error", err);
});
db.on('disconnected', () => {
    console.log('Disconnected from the database!');
});
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});
// Export the database connection
module.exports = db;