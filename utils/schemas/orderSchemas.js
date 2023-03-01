const Joi = require('@hapi/joi');

//Not limited to currently existing product codes so that scalability and maintainability could be preserved
//If any not-recognized code is provided the service layer will simply ignore it and won't affect execution or final results
const items = Joi.array().sparse().min(1).items(Joi.string().uppercase().min(1).max(15));

const checkout = Joi.object({
    items: items.required()
});

module.exports = { checkout };

