const express = require('express');
const router = express.Router();

const clienteController = require('../controller/clienteController');
const productosController = require('../controller/productosController');
const pedidosController = require('../controller/pedidosController')
const productsController = require('../controller/productsController')
const parejasController = require('../controller/parejasController')
const teamController = require('../controller/teamController')
const regaloController = require('../controller/regaloController')
const registroController = require('../controller/registroController')
const loginController = require('../controller/loginController')
const verifyToken = require('../token/verifyToken')
const getUserById = require('../controller/getUserById')

const noviosController = require('../controller/noviosController');

const emailController = require('../controller/emailController')

module.exports = function() {

    // Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    // Agrega nuevos regalos via POST
    router.post('/regalo', regaloController.subirArchivo, regaloController.nuevoRegalo);

    // Agrega nuevos novios via POST
    router.post('/novios', noviosController.subirArchivo, noviosController.nuevosNovios);

    // Ver los regalos 
    router.get('/regalo', regaloController.mostrarRegalo);

    // Muestra un cliente en específico por su ID
    router.get('/regalo/:idRegalo', regaloController.mostrarRegalo);

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    // Muestra un cliente en específico por su ID
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    // Actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Eliminar Cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    //// PRODUCTOS
    // Nuevos productos
    router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);

    // Nuevas parejas
    router.post('/parejas', parejasController.subirArchivos, parejasController.parejas);
    router.post('/team', teamController.subirArchivos, teamController.team);

    // Nuevos products
    router.post('/products', productsController.subirArchivo, productsController.products);

    // Obtener todos los productos
    router.get('/products', productsController.getProducts);

    // Obtener un producto por su ID
    router.get('/products/:id', productsController.getProductById);

    // Obtener todas las parejas
    router.get('/parejas', parejasController.getParejas);

    // Obtener una pareja por su ID
    router.get('/parejas/:id', parejasController.getParejaById);

    router.get('/team', teamController.getTeam);
    router.get('/team/:id', teamController.getTeamById);

    // Muestra todos los productos
    router.get('/productos', productosController.mostrarProductos);

    // Muestra un producto en específico por su ID
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    // Actualizar Productos
    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);

    // Eliminar Productos
    router.delete('/productos/:idProducto', productosController.eliminarProducto);

    //// PEDIDOS 
    // Agrega nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido);

    // Mostrar los pedidos
    // *** PEDIDOS ***
    // Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido);

    // Mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    // Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    // Actualizar pedidos
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    // Elimina un pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

    // Prueba de inicio de sesión
    // router.get('/user', verifyToken, getUserById.getUserById);
    router.post('/register', registroController.register);
    router.post('/login', loginController.login);

    router.post('/send-email', emailController.sendEmail);

    return router;
}
