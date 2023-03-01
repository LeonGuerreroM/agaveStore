const { Product, ProductSchema } = require('./productModel');
const { User, UserSchema } = require('./userModel');

function setupModels(sequelize){
    Product.init(ProductSchema, Product.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;