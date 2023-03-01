const express = require('express');
const router = express.Router();
const passport = require('passport');

const success = require('../utils/successResponse');
const validationHandler = require('../utils/middlewares/validationHandler');
const checkRoles = require('../utils/middlewares/authorizationHandler');
const { checkout } = require('../utils/schemas/orderSchemas');
const Services = require('../services/orderServices');
const services = new Services();

    /** 
    * @module OrdersRoutes
    */

    /**
   * @name Checkout
   * @path {POST} /agave/store/api/v1/orders/checkout
   * 
   * @header {String} Authorization Bearer token (role 2)
   * 
   * @body {Array} items (Strings) list of product codes to be charged
   *
   * @response {Object} object.total checkout total
   * @response {Object} object.message confirmation message
   *
   * @code {201} total computed correctly
   * @code {401} unmatched privileges or token absence
   * @code {400} wrong body parameters
   * @code {409} database related conflict
   * @code {500} internal errors with the request
   *
   */
router.post('/checkout',
    passport.authenticate('jwt', {session: false}),
    checkRoles(2),
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