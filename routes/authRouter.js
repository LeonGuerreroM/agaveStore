const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try{
            const user = req.user;
            const payload = {
                sub: user.id,
                rol: user.rol
            }
            const token = jwt.sign(payload, config.jwtSecret);
            res.status(200).json({
                user,
                token
            });
        }catch(error){
            next(error);
        }
    }
);

module.exports = router;