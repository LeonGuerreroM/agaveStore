const express = require('express');
const router = express.Router();

const orderRouter = require('./orderRoutes');

function routesSetup(app){
    app.use('/agave/store/api/v1', router);
    router.use('/orders', orderRouter);
}

module.exports = routesSetup;