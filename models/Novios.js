const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const NoviosSchema = new Schema({
    pareja: {
        type: String,
        trim: true
    },
    lugar: {
        type: String,
        trim: true
    },
    invitacion: {
        type: String,
        trim: true
    },

    localizacion : {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    fecha : {
        type: String,
        trim: true
    },
    duracion : {
        type: String,
        trim: true
    },
    localizacion : {
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

module.exports = mongoose.model('Novios', NoviosSchema)