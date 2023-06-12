const express =require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//conectar mongoose
mongoose.connect('mongodb+srv://krisnarocabado:zoharrama@cluster0.aosxxdr.mongodb.net/?retryWrites=true&w=majority')

//crear el server
const app = express()

//habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//rutas de la app
app.use('/',routes())


//puerto
app.listen(5003)