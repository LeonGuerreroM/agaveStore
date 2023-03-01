const { models } = require('../lib/sequelize');
const { Op } = require('sequelize');
class OrderServices{

    constructor(){}

    async calculateTotal(items){
        let totals = { };
        let total = 0;

        //Fetch ONLY products whose code matches any of the elements in items array
        const products = await models.Product.findAll({
            where:{
                code: {
                    [Op.in]: items
                }
            }
        });
        
        //For each product fetched a property is created on an object, containing the data needed to compute total
        //*Solution designed this way so that it could be possible to make a direct reference to the attributes of certain code avoiding the need of nested loops to search for the wanted item. 
        //*Thus, the complexity of this algorithm is optimized to stay as O(N).
        for(let i of products){
            totals[i.dataValues.code] = {
                quantity: 0,
                price: i.dataValues.price,
                sale: i.dataValues.saleId
            }
        }

        //For each appearance on items the quantity attribute on te correspondent property increases
        //In case items have a non recognized code (whose property in totals has never been created) it just skips that iteration without affecting the final result
        //*Designed this way so that strong validation schemas don't interfere with the application being scalable and maintainable 
        for(let i of items){
            try{
                totals[i].quantity++; 
            }catch{
                continue;
            }
        }

        //Loops through the object computing total and adding doing the corresponding discounts when needed based on the product field saleId which relates products with a sales catalog.
        //I considered bulk discount as 5% off since TShirts go from $20 to $19. Sales catalog can be reviewed on seeder file
        //Sale 1 (no discount) is checked first to decrease amount of ifs verifications. Any product without an specific offer has a saleId 1 since it's the default value on insertion and an obligatory field, so no other non-considered values could appear 
        for(let i in totals){
            if(totals[i].sale === 1) total += totals[i].price * totals[i].quantity;
            else if(totals[i].sale === 2) total += totals[i].price * Math.ceil(totals[i].quantity/2);
            else if(totals[i].sale === 3 && totals[i].quantity >= 3) total += totals[i].price*0.95 * totals[i].quantity;
        }

        return '$'+total;
    }

}


module.exports = OrderServices;