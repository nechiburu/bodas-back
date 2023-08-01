const Usuario = require("../models/usuario")

exports.getUserById = async (req, res) =>{
    const {id} = req.user;

    if(id.length === 24){
        Usuario.findById(id).then((usuario) =>{
            if(!usuario){
                return res.json({mensaje: "Usuario no encontrado"});
            } else{
                const {_id, password, __v, ...resto} = usuario._doc
                res.json(resto);
            }
        });
    } else{
        res.json({mensaje: "Estas enviando una constraseña incorrecta"});
    }
}