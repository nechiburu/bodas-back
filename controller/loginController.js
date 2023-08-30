const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

exports.login = async (req, res) =>{
    const {email, password} = req.body;

    User.findOne({email}).then((user) =>{
        if(!user){
            return res.json({mensaje: 'User no encontrado'});
        }

        bcrypt.compare(password, user.password).then((esCorrecta) =>{
            if(esCorrecta){
                const {id, full_name} = user;

                const data ={
                    id,
                    full_name,
                };

                const token = jwt.sign(data, 'secreto', {
                    expiresIn: 86400 /*24hs */
                })

                res.json({
                    mensaje: "User logeado correctamente",
                    user: {
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