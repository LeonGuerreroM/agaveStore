const { Model, DataTypes } = require('sequelize');
const { SALE_TABLE } = require('../models/saleModel');

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
    },
    saleId: {
        allowNull: false,
        field: 'sale_id',
        type: DataTypes.INTEGER,
        defaultValue: 0,
        references: {
            model: SALE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class Product extends Model {

    static associate(models){
        this.belongsTo(models.Sale, {as: 'sale'});
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