const Novios = require('../models/Novios')

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
exports.nuevosNovios = async (req, res, next) => {
    const novios = new Novios(req.body);

    try {
        if(req.file.filename) {
            novios.imagen = req.file.filename
          
        }
        await producto.save();
        res.json({mensaje : 'Se agrego una nueva pareja'})
    } catch (error) {
        console.log(error);
        next();
    }
} 

//muestra todos los clientes

exports.mostrarNovios = async (req,res,next) => {

    try {
        const novios = await Novios.find({});
        res.json(novios) 
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
