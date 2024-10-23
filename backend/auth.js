const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const person = require('./models/Person.js');

passport.use(new LocalStrategy(async (username, password, done) => {
    // authentication logic here 
    try {
        const user = await person.findOne({ username: username })
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Incorrect password" });
        }
    } catch (error) {
        return done(error);
    }
}))

module.exports = passport
