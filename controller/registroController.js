const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario')

exports.register = async (req, res) =>{
    const {email, full_name, password, confirm_password} = req.body;

    Usuario.findOne({email}).then((usuario) =>{
        if(usuario){
            return res.json({mensaje: "Ya existe un usuario con ese correo"});
        } else if(!email || !full_name || !password || !confirm_password){
            return res.json({mensaje:"Completar todos los campos"});
         } else if(password !== confirm_password){
             return res.json({mensaje:"Las contraseñas no coinciden"})
        } else{
            bcrypt.hash(password, 10, (error, contraseñaHasheada) =>{
                if(error) res.json({error})
                else{
                    const nuevoUsuario = new Usuario({
                        email,
                        full_name,
                        password: contraseñaHasheada,
                        confirm_password: contraseñaHasheada,
                    });

                    nuevoUsuario
                        .save()
                        .then((usuario) =>{
                            res.json({mensaje: 'Usuario creado correctamente', usuario})
                        })
                        .catch((error) => console.error(error));
                }
            });
        }
    });
}