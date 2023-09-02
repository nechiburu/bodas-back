const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    slug: {
        type: String
    },
    tImg : {
        type: String
    },
    name : {
        type: String
    },    
    title: {
        type: String
    }

    
});
 module.exports = mongoose.model('Team',productsSchema)