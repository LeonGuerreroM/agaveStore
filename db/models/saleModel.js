const { Model, DataTypes, Sequelize } = require('sequelize');

const SALE_TABLE = 'cat_sales';

const SaleSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}

class Sale extends Model {

    static associate(models){
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'saleId'
        });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: SALE_TABLE,
            modelName: 'Sale',
            timestamps: false
        }
    }

}

module.exports = { SALE_TABLE, SaleSchema, Sale };