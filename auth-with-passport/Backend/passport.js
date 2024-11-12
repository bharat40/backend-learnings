const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./db.js');
const { compareSync } = require('bcrypt');


// logic for login route
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: "Incorrect username" }); // when username is invalid
        } else if (!compareSync(password, user.password)) {
            return done(null, false, { message: "Incorrect password" }); // when password is invalid
        } else {
            return done(null, user); // when user is valid
        }
    } catch (error) {
        return done(error); // when some error occurs
    }
}))

// persists user data inside session
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// fetches session details using session id
passport.deserializeUser(async (id, done) => {
    try {
        const user = UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
})
module.exports = passport;