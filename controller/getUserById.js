const User = require("../models/user")

exports.getUserById = async (req, res) =>{
    const {id} = req.user;

    if(id.length === 24){
        User.findById(id).then((user) =>{
            if(!user){
                return res.json({mensaje: "User no encontrado"});
            } else{
                const {_id, password, __v, ...resto} = user._doc
                res.json(resto);
            }
        });
    } else{
        res.json({mensaje: "Estas enviando una constraseña incorrecta"});
    }
}