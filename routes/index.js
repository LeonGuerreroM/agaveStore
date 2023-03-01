const express = require('express');
const router = express.Router();

const ordersRouter = require('./orderRoutes');
const authRouter = require('./authRouter');

function routesSetup(app){
    app.use('/agave/store/api/v1', router);
    router.use('/orders', ordersRouter);
    router.use('/auth', authRouter);
}

module.exports = routesSetup;