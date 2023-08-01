const Parejas = require('../models/parejas');
const multer = require('multer');
const shortid = require('shortid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../uploads/');
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null, `${shortid.generate()}.${extension}`);
    }
});

const upload = multer({ storage: storage });

exports.subirArchivos = upload.fields([
    { name: 'pSimg', maxCount: 1 },
    { name: 'pimg1', maxCount: 1 },
    { name: 'pimg2', maxCount: 1 },
    { name: 'pimg3', maxCount: 1 }
]);

exports.parejas = async (req, res) => {
    const { slug, title, date, location } = req.body;

    try {
        const newPareja = new Parejas({
            slug,
            title,
            date,
            location,
        });

        if (req.files) {
            if (req.files['pSimg']) {
                newPareja.pSimg = req.files['pSimg'][0].filename;
            }
            if (req.files['pimg1']) {
                newPareja.pimg1 = req.files['pimg1'][0].filename;
            }
            if (req.files['pimg2']) {
                newPareja.pimg2 = req.files['pimg2'][0].filename;
            }
            if (req.files['pimg3']) {
                newPareja.pimg3 = req.files['pimg3'][0].filename;
            }
        }

        await newPareja.save();

        res.json({ mensaje: 'Se agregó una nueva pareja' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar la pareja' });
    }
};

exports.getParejas = async (req, res, next) => {
    try {
        const parejas = await Parejas.find({});
        res.json(parejas);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getParejaById = (req, res) => {
    const parejaId = req.params.id;

    Parejas.findById(parejaId)
        .then((pareja) => {
            if (pareja) {
                res.json(pareja);
            } else {
                res.status(404).json({ error: 'No se encontró la pareja' });
            }
        })
        .catch((err) => {
            console.error('Error al obtener la pareja:', err);
            res.status(500).json({ error: 'Error al obtener la pareja' });
        });
};
