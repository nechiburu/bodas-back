const Regalo = require('../models/Regalo');



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


// agrega nuevos regalo
exports.nuevoRegalo = async (req, res, next) => {
    const regalo = new Regalo(req.body);

    try {
        if(req.file.filename) {
            regalo.imagen = req.file.filename
        }
        await regalo.save();
        res.json({mensaje : 'Se agrego un nuevo regalo'})
    } catch (error) {
        console.log(error);
        next();
    }
} 


// muestra todos los regalos
exports.mostrarRegalo = async (req,res,next) => {
    //obtener los productos
    try {
        const regalo = await Regalo.find({})
        res.json(regalo)
    } catch (error) {
        console.log(error)
        next()
    }
}

//muestra el regalo en singular 
exports.mostrarRegalo = async (req,res,next) => {

    const regalo = await Regalo.findById(req.params.idRegalo)

    if(!regalo){
        res.json({mensaje: 'ese regalo no existe'})
    }
    res.json(regalo)
}

//actualiza un producto via id

// Actualiza un producto via id
exports.actualizarRegalo = async (req, res, next) => {
    try {
        // construir un nuevo producto
        let nuevoRegalo = req.body;

        // verificar si hay imagen nueva
        if(req.file) {
            nuevoRegalo.imagen = req.file.filename;
        } else {
            let regaloAnterior = await Regalo.findById(req.params.idRegalo);
            nuevoRegalo.imagen = regaloAnterior.imagen;
        }

        
        let regalo = await Regalo.findOneAndUpdate({_id : req.params.idRegalo}, nuevoRegalo, {
            new : true,
        });

        res.json(regalo);
    } catch (error) {
        console.log(error);
        next();
    }
}


// elimina un producto via ID

exports.eliminarRegalo = async (req,res,next) => {
    try {
        await Regalo.findByIdAndDelete({ _id : req.params.idRegalo })
        res.json({mensaje: 'el regalo se a eliminado'})
    } catch (error) {
        console.log(error)
        next()
    }
}
