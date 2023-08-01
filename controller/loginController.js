const bcrypt = require("bcrypt")
const Usuario = require("../models/usuario")
const jwt = require('jsonwebtoken')

exports.login = async (req, res) =>{
    const {email, password} = req.body;

    Usuario.findOne({email}).then((usuario) =>{
        if(!usuario){
            return res.json({mensaje: 'Usuario no encontrado'});
        }

        bcrypt.compare(password, usuario.password).then((esCorrecta) =>{
            if(esCorrecta){
                const {id, full_name} = usuario;

                const data ={
                    id,
                    full_name,
                };

                const token = jwt.sign(data, 'secreto', {
                    expiresIn: 86400 /*24hs */
                })

                res.json({
                    mensaje: "Usuario logeado correctamente",
                    usuario: {
                        id,
                        full_name,
                        token,
                    },
                });
            } else{
                return res.json({mensaje: "Contraseña incorrecta"});
            }
        });
    });
}