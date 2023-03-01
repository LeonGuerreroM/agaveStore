const express = require('express');
const router = express.Router();
const success = require('../utils/successResponse');

router.post('/checkout', 
    async(req, res) => {
        try{
            const { items } = req.body;
            success(res, 201, 'total', items, 'total returned');
        }catch{
            console.log('there was some error');
        }
    }
);

module.exports = router;