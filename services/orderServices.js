const { models } = require('../lib/sequelize');
const { Op } = require('sequelize');
class OrderServices{

    constructor(){}

    async calculateTotal(items){
        let totals = { };
        let total = 0;

        const products = await models.Product.findAll({
            where:{
                code: {
                    [Op.in]: items
                }
            }
        })
        
        for(let i of products){
            totals[i.dataValues.code] = {
                quantity: 0,
                price: i.dataValues.price,
                sale: i.dataValues.saleId
            }
        }

        for(let i of items){
            totals[i].quantity++; 
        }

        for(let i in totals){
            if(totals[i].sale === 2) total += totals[i].price * Math.ceil(totals[i].quantity/2);
            else if(totals[i].sale === 3 && totals[i].quantity >= 3) total += totals[i].price*0.95 * totals[i].quantity;
            else total += totals[i].price * totals[i].quantity;
        }

        return total
    }

}


module.exports = OrderServices;