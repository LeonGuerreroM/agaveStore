const { models } = require('../lib/sequelize');
const { Op } = require('sequelize');
class OrderServices{

    constructor(){}

    async calculateTotal(items){
        //get products
        //loop through result and set product code as object name on an array
            //add a subatribute quantity as 0 and a subatribute price (totals)
        //loop through items and increase quiantity when needed (directly)
        //loop through totals and do the operations needed

        let totals = [];
        let total = 0;
        let appeared = false;
        let tshirtPrice = 20;

        const products = await models.Product.findAll({
            where:{
                code: {
                    [Op.in]: items
                }
            }
        })
        
        for(let i of products){
            totals.push({
                [i.dataValues.code]: {
                    quantity: 0,
                    price: i.dataValues.price
                }
            })
        }

        for(let i of items){
            totals[i].quantity++; 
        }

        

        for(let i of items){
            for(let j of totals){
                if(i === j.product){
                    j.quantity++;
                    appeared = true;
                    break;
                }   
            }
            if(!appeared){
                totals.push( {
                    product: i,
                    quantity: 1
                });
            }
            appeared = false;
        }

        for(let i of totals){
            if(i.product === 'PANTS'){
                total += Math.ceil(i.quantity/2) * 5;
            }else if(i.product === 'TSHIRT'){
                if(i.quantity >= 3) tshirtPrice = 19;
                total += i.quantity * tshirtPrice;
            }else if(i.product === 'HAT'){
                total += i.quantity * 7.50;
            }
        }

        

        return total
    }

}


module.exports = OrderServices;