
const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next){
    console.log(err);
    next(err);
}

function ormErrorHandler(err, req, res, next){
    if(err instanceof ValidationError){
        res.status(409).json({
            message: err.name,
            errors: err.errors
        });
    }
    next(err);
}

function boomErrorHandler(err, req, res, next){
    if(err.isBoom){
        const { output } = err;
        res.status(output.statusCode).json(output.payload)
    }
    next(err);
}

function generalErrorHandler(err, req, res, next){ //eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

module.exports = { logErrors, ormErrorHandler, boomErrorHandler, generalErrorHandler };