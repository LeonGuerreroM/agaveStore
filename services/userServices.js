const { models } = require('../lib/sequelize');
const boom = require('@hapi/boom');

class User{

    constructor(){}

    async getUserByEmail(email){
        const user = await models.User.findOne({
            where: { email }
        });

        if(!user) throw boom.notFound('user not found');

        return user;
    }

}

module.exports = User;