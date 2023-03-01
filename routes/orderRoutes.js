const express = require('express');
const router = express.Router();

const success = require('../utils/successResponse');
const validationHandler = require('../utils/middlewares/validationHandler');
const { checkout } = require('../utils/schemas/orderSchemas');
const Services = require('../services/orderServices');
const services = new Services();

router.post('/checkout',
    validationHandler(checkout, 'body'),
    async (req, res, next) => {
        try{
            const { items } = req.body;
            const total = await services.calculateTotal(items);
            success(res, 201, 'total', total, 'total returned');
        }catch(error){
            next(error);
        }
    }
);

module.exports = router;