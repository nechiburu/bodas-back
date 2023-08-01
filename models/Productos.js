const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    descripcion : {
        type: String
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String,
        require:true,
    },

    
});
 module.exports = mongoose.model('Productos',productosSchema)