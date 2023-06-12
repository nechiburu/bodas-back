const Clientes = require('../models/Clientes');

// agrega nuevo cliente 
exports.nuevoCliente = async (req,res) => {
    const Cliente = new Clientes(req.body)

    try {
        //almacenar el registro
        await Cliente.save()
        res.json({mensaje: 'se agrego un nuevo cliente'})
    } catch (error) {
        // si hay un error, console.log
        console.log(error);
        next();
    }
}

//muestra todos los clientes

exports.mostrarClientes = async (req,res,next) => {

    try {
        const clientes = await Clientes.find({});
        res.json(clientes) 
    } catch (error) {
        console.log(error)
        next()
    }
}

// muestra un cliente por su ID
exports.mostrarCliente = async (req,res,next) => {
    const cliente = await Clientes.findById(req.params.idCliente)

    if(!cliente) {
        res.json({mensaje : 'Ese cliente no exite'})
        next()
    }

    //mostrar cliente
    res.json(cliente)
}

//actualiza un cliente

 exports.actualizarCliente = async (req,res,next) =>{
    try {
        const cliente = await Clientes.findOneAndUpdate(
            {_id : req.params.idCliente},
            req.body, {new: true })
        res.json(cliente)
    } catch (error) {
        console.log(error)
        next()
    }


 }

 //eliminar cliente 

 exports.eliminarCliente = async (req,res,next) => {
    try {
       await Clientes.findOneAndDelete(
            {_id: req.params.idCliente})
            res.json({mensaje: 'El cliente se a eliminado'})
    } catch (error) {
        console.log(error)
        next()
    }
 }


