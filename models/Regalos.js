const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    invitado: {
        type: Schema.ObjectId, 
        ref: 'Invitado'
    }, 
    regalos: [{
        regalo: {
            type: Schema.ObjectId,
            ref: 'Regalo'
        }, 
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Regalo', pedidosSchema);