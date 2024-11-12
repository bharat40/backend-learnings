const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
