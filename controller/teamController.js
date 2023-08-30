// teamController.js

const Team = require('../models/team');
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

exports.subirArchivos = upload.single('tImg');

exports.team = async (req, res) => {
    const { name, title } = req.body; // Eliminamos el campo slug ya que lo obtendremos de la pareja seleccionada

    try {
        const newTeam = new Team({
            slug: req.body.slug, // Utilizamos el slug de la pareja seleccionada que se envía en el cuerpo de la solicitud
            name,
            title,
        });

        if (req.file) {
            newTeam.tImg = req.file.filename;
        }

        await newTeam.save();

        res.json({ mensaje: 'Se agregó un nuevo equipo' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar el equipo' });
    }
};

exports.getTeam = async (req, res, next) => {
    try {
        const team = await Team.find({});
        res.json(team);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getTeamById = (req, res) => {
    const teamId = req.params.id;

    Team.findById(teamId)
        .then((team) => {
            if (team) {
                res.json(team);
            } else {
                res.status(404).json({ error: 'No se encontró la pareja' });
            }
        })
        .catch((err) => {
            console.error('Error al obtener la pareja:', err);
            res.status(500).json({ error: 'Error al obtener la pareja' });
        });
};
