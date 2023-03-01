const { Model, DataTypes } = require('sequelize');

const PRODUCT_TABLE = 'cat_product';

const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    code: {
        allowNull: false,
        type: DataTypes.STRING
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT
    }

};

class Product extends Model {

    static associate(models){
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }

}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };