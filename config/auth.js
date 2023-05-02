const passport = require("passport");
const {Strategy: LocalStrategy} = require('passport-local');

const User = require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((id, done) => {
    const user = User.findById(id)
    done(null, user)
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const user = await User.findOne({username:username});

    if(user !== undefined && user !== null ){
        return done(null, false, req.flash('signupMessage', 'The user name already exists!'));
    } else {
        
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }

}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const user = await User.findOne({username:username});
    if(user === null){
        return done(null, false, req.flash('loginMessage', 'No user found!'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Incorrect password!'));
    }
    done(null, user);
}));
