const Pareja = require('../models/Pareja');


const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo 
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}


// agrega nuevos productos
exports.nuevaPareja = async (req, res, next) => {
    const pareja = new Pareja(req.body);

    try {
        if(req.file.filename) {
            pareja.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje : 'Se agrego una nueva pareja'})
    } catch (error) {
        console.log(error);
        next();
    }
} 

//muestra todos los clientes

exports.mostrarPareja = async (req,res,next) => {

    try {
        const pareja = await Pareja.find({});
        res.json(clientes) 
    } catch (error) {
        console.log(error)
        next()
    }
}

// muestra pareja  por su ID
exports.mostrarPareja = async (req,res,next) => {
    const pareja = await Clientes.findById(req.params.idCliente)

    if(!cliente) {
        res.json({mensaje : 'Esa pareja no exite'})
        next()
    }

    //mostrar pareja
    res.json(pareja)
}

//actualiza un cliente

 exports.actualizarCliente = async (req,res,next) =>{
    try {
        const pareja = await Pareja.findOneAndUpdate(
            {_id : req.params.idPareja},
            req.body, {new: true })
        res.json(pareja)
    } catch (error) {
        console.log(error)
        next()
    }


 }

 //eliminar cliente 

 exports.eliminarPareja = async (req,res,next) => {
    try {
       await Pareja.findOneAndDelete(
            {_id: req.params.idCliente})
            res.json({mensaje: 'La Pareja se elimino se a eliminado'})
    } catch (error) {
        console.log(error)
        next()
    }
 }


