const { Product, ProductSchema } = require('./productModel');
const { User, UserSchema } = require('./userModel');
const { Sale, SaleSchema } = require('./saleModel');

function setupModels(sequelize){
    Sale.init(SaleSchema, Sale.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    User.init(UserSchema, User.config(sequelize));

    Sale.associate(sequelize.models);
    Product.associate(sequelize.models);
}

module.exports = setupModels;