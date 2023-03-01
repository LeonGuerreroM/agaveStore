const passport = require('passport');

const LocalStrategy = require('./localStrategy');
const JwtStrategy = require('./jwtStrategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);