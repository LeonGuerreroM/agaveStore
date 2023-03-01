const { Model, DataTypes } = require('sequelize');

const USER_TABLE = 'tbl_user';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    rol: {
        allowNull: false,
        type: DataTypes.INTEGER
    }

};

class User extends Model{

    static associate(models){ //eslint-disable-line
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }

}

module.exports = { USER_TABLE, UserSchema, User };