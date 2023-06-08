const { readJSON, writeJSON } = require("./fs");
const { searchItemById } = require("./search.js");
const _ = require("lodash");

function addToCart(data, cart, id){
    let item = searchItemById(cart, id)
    if(item){
        return _.map(cart, a => { if(a.id == id){
                                    a.amount++;
                                    return a;
                                }});
    }

    let item2 = _.find(data, a => a.id == id);
    console.log(item2)
    if (!item2){
        throw "invalid item id";
    }
    
    item2["amount"] = 1;
    cart.push(item2);
    return cart;
}

function deleteFromCart(cart, id){
    let item = searchItemById(cart, id);

    if(item){
        item = _.map(cart, a => { if(a.id == id){
                                    a.amount--;
                                    return a;
                                }});
    }

    return _.dropRightWhile(cart, a => a.amount <= 0 );
}

function emptyCart(){
    writeJSON("./data","cart.json",[]);
}

module.exports = {
    addToCart,
    deleteFromCart,
    emptyCart,
}