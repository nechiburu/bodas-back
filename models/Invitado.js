const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const invitadoSchema = new Schema({
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
    regalos: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Regalos'
        }, 
        cantidad: Number
    }],

})

module.exports = mongoose.model('Invitado', invitadoSchema)