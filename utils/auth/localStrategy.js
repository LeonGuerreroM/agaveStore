const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const Services = require('../../services/userServices');
const services = new Services();

const LocalStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try{
            const user = await services.getUserByEmail(email);
            console.log(user)
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                done(boom.unauthorized(), false);
            }
            delete user.dataValues.password;
            done(null, user); 
        }catch(error){
            done(error, false);
        }
    }
);

module.exports = LocalStrategy;