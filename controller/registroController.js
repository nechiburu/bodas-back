const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.register = async (req, res) =>{
    const {email, full_name, password, confirm_password} = req.body;

    User.findOne({email}).then((user) =>{
        if(user){
            return res.json({mensaje: "Ya existe un user con ese correo"});
        } else if(!email || !full_name || !password || !confirm_password){
            return res.json({mensaje:"Completar todos los campos"});
         } else if(password !== confirm_password){
             return res.json({mensaje:"Las contraseñas no coinciden"})
        } else{
            bcrypt.hash(password, 10, (error, contraseñaHasheada) =>{
                if(error) res.json({error})
                else{
                    const nuevoUser = new User({
                        email,
                        full_name,
                        password: contraseñaHasheada,
                        confirm_password: contraseñaHasheada,
                    });

                    nuevoUser
                        .save()
                        .then((user) =>{
                            res.json({mensaje: 'User creado correctamente', user})
                        })
                        .catch((error) => console.error(error));
                }
            });
        }
    });
}