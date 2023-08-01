const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId, 
        ref: 'usuario'
    }, 
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'products'
        }, 
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Pedidos', pedidosSchema);