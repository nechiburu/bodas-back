const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    slug: {
        type: String,
        trim: true
    },
    pimg1 : {
        type: String
    },
    pimg2 : {
        type: String
    },
    pimg3 : {
        type: String
    },
    title: {
        type: String
    },
    pSimg: {
        type: String
        
    },
    date: {
        type: Date
    },
    location: {
        type: String
    }

    
});
 module.exports = mongoose.model('Parejas',productsSchema)