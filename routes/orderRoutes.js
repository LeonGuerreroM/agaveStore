const express = require('express');
const router = express.Router();

const success = require('../utils/successResponse');
const Services = require('../services/orderServices');
const services = new Services();

router.post('/checkout', 
    async (req, res) => {
        try{
            const { items } = req.body;
            const total = await services.calculateTotal(items);
            success(res, 201, 'total', total, 'total returned');
        }catch{
            console.log('there was some error');
        }
    }
);

module.exports = router;