const passport = require('passport');

const LocalStrategy = require('./localStrategy');

passport.use(LocalStrategy);