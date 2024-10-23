const { uniqueId } = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
// define the person schema
const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ["waiter", "chef", "manager"],
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        required: true,
        type: String
    }
})

personSchema.pre('save', async function (next) {
    const person = this;
    // hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) return next();
    try {
        // salt generate
        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        // override the plain password with the hashed password
        person.password = hashedPassword;

        next();

    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // use bcrypt to compare the provided password with the hashed password 
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

// creating person model
const person = mongoose.model("person", personSchema);
module.exports = person;