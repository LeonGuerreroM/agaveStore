
class OrderServices{

    constructor(){}

    async calculateTotal(items){
        let totals = [];
        let total = 0;
        let appeared = false;
        let tshirtPrice = 20;
        
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