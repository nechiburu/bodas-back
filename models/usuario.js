const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    email: {type: String, required: true},
    full_name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    confirm_password: {type: String, required: false}
});

module.exports = mongoose.model("Usuario", UsuarioSchema);