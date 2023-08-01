const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ParejaSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    email : {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    telefono : {
        type: String,
        trim: true
    },
    imagen: {
        type: String
    },
    regalos: [{
        regalos: {
            type: Schema.ObjectId,
            ref: 'Regalos'
        }, 
        cantidad: Number
    }],
    invitados:[{
        invitado:{
            type: Schema.ObjectId,
            ref:"invitado"
        }
    }]

})

module.exports = mongoose.model('Pareja', clientesSchema)