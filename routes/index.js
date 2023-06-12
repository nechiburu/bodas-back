const express = require('express');
const router = express.Router();

const clienteController = require('../controller/clienteController');
const productosController = require('../controller/productosController');
const pedidosController = require('../controller/pedidosController')
module.exports = function() {

    //agrega nuevos clientes via POST
    router.post('/clientes',clienteController.nuevoCliente)

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes)

    //muestra un clente en espesifico ID
    router.get('/clientes/:idCliente', clienteController.mostrarCliente)

    //actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente)

    // Eliminar Cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)

    ////PRODUCTOS
    //nuevos productos
    router.post('/productos',
    productosController.subirArchivo,
    productosController.nuevoProducto
    )

    //muestra todos los productos

    router.get('/productos', productosController.mostrarProductos)

    //muestra un producto en especifico por su ID
    router.get('/productos/:idProducto', productosController.mostrarProducto)

    // Actualizar Productos
    router.put('/productos/:idProducto',
    productosController.subirArchivo,
    productosController.actualizarProducto
    )

    // Eliminar Productos
    router.delete('/productos/:idProducto', productosController.eliminarProducto)

    //// PEDIDOS 
    // Agrega nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido)

    //mostrar los pedidos
    /*** PEDIDOS */
    // Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', 
        pedidosController.nuevoPedido);

    // mostrar todos los pedidos
    router.get('/pedidos', 
        pedidosController.mostrarPedidos);

    // Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido',
    pedidosController.mostrarPedido);

    // Actualizar pedidos
    router.put('/pedidos/:idPedido', 
    pedidosController.actualizarPedido);

    // Elimina un pedido
    router.delete('/pedidos/:idPedido', 
    pedidosController.eliminarPedido);

    return router;

}

