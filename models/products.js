const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    slug: {
        type: String,
        trim: true
    },
    proImg : {
        type: Array
    },
    title: {
        type: String
    },
    price: {
        type: Number,
        require:true,
    },
    delPrice: {
        type: Number,
        require:true,
    },
    brand: {
        type: String,
        require:true,
    },
    size:{
        type:String
    }

    
});
 module.exports = mongoose.model('Products',productsSchema)