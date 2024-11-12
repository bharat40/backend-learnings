// imports goes here
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const UserModel = require('./db');
const { hashSync } = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

// middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// set up express session middleware to manage user session
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'Sessions',
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());

// GET routes below
app.get('/', (req, res) => {
    res.send("welome to home page");
    res.status(200);
})
app.get('/login', (req, res) => {
    res.send("login GET");
})
app.get('/register', async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);
})
app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ message: "Logout Failed" });
        }
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: "Failed to end session" })
            }
            res.clearCookie('connect-sid'); // clear the session cookie
            return res.status(200).json({ message: "Logout successfully" })
        });
    });
});
app.get('/protected', (req, res) => {
})


// importing passport.js
require('./passport');


// POST routes below
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send('login successful');
})
app.post('/register', async (req, res) => {
    const { username, password } = req.body; // destructuring username and password from body
    if (!username || !password) {
        res.status(400).send("username and password are required");
        return; // prevent function for further execution
    }
    const hashedPassword = hashSync(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword }); // create new instance for user model with the provided data
    await newUser.save().then(() => { // save the new user to the database
        res.send(`Account created succesfully! Welcome aboard ${newUser.username} Log in to get started.`);
        console.log(newUser);
    }).catch((error) => {
        console.log(error);
    })
})

// connecting to server below
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Listening to port ${PORT}`);
    }
})