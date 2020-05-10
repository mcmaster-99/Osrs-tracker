const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Trades = new Schema({
    id: {
        type: Number
    },
    item: {
        type: String
    },
    quantity: {
        type: Number
    },
    buy_price: {
        type: Number
    },
    sell_price: {
        type: Number
    },
    profit: {
        type: Number
    }
});

module.exports = mongoose.model('trades', Trades);