const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const qr = require('qrcode');
const bwipjs = require('bwip-js');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

// cors permite que te conectes a otro servidor

const cors = require('cors');
const products = require('./models/products');
const parejas = require('./models/parejas');
const team = require('./models/team');

//conectar mongoose
// mongoose.connect(process.env.MONGODB_URI,
//   console.log('Db on')
// )

mongoose.connect(process.env.MONGODB_URI,
  console.log('Db on')
)

// crear el servidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar cors
app.use(cors());

// Rutas de la app
app.use('/api', routes());

// carpeta publica
app.use(express.static('uploads'));

// puerto

const puerto = process.env.PORT
app.listen(puerto, console.log(puerto));



app.use('/uploads', express.static('uploads'));



app.get('/uploads', (req, res) => {
  products.find({}, '_id')
    .then((result) => {
      const imgArray = result.map((element) => element._id);
      console.log(imgArray);
      res.send(imgArray);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error al obtener los datos de la base de datos');
    });
});

app.get('/uploads/:id', (req, res) => {
  const filename = req.params.id;

  products.findById(filename)
    .then((result) => {
      if (result) {
        if (result.proImg) {
          const stripeFileId = result.proImg; // Get the Stripe file ID directly
          const imageUrl = `https://files.stripe.com/v1/files/${stripeFileId}`;
          res.redirect(imageUrl); // Redirect the client to the image URL
        } else {
          res.status(404).send('No se encontró la imagen');
        }
      } else {
        parejas.findById(filename)
          .then((result) => {
            if (result) {
              const filePath = path.join(__dirname, 'uploads', result.pSimg);
              res.sendFile(filePath);
            } else {
              team.findById(filename)
                .then((result) => {
                  if (result) {
                    const filePath = path.join(__dirname, 'uploads', result.tImg);
                    res.sendFile(filePath);
                  } else {
                    res.status(404).send('No se encontró la imagen');
                  }
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).send('Error al obtener los datos de la base de datos');
                });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send('Error al obtener los datos de la base de datos');
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error al obtener los datos de la base de datos');
    });
});



app.get('/products/:id/qrcode', (req, res) => {
  const productId = req.params.id;

  products.findById(productId)
    .then((product) => {
      if (product) {
        const data = `http://192.168.100.16:4001/products/${productId}`;
        const filePath = `qrcodes/qrcode.png`;

        qr.toFile(filePath, data, (err) => {
          if (err) {
            console.error('Error al generar el código QR:', err);
            res.status(500).send('Error al generar el código QR');
          } else {
            res.sendFile(path.join(__dirname, filePath));

            // Configurar el servicio de correo electrónico
            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'nicoechiburu@gmail.com',
                pass: '17119817n'
              }
            });

            // Adjuntar el archivo al correo electrónico
            const mailOptions = {
              from: 'nicoechiburu@gmail.com',
              to: 'nechiburu@viajestravelero.com',
              subject: 'Código QR del producto',
              html: '<p>Adjunto encontrarás el código QR del producto.</p>',
              attachments: [{
                filename: 'qrcode.png',
                path: path.join(__dirname, filePath)
              }]
            };

            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error al enviar el correo electrónico:', error);
              } else {
                console.log('Correo electrónico enviado:', info.messageId);
              }

              // Eliminar el archivo de código QR después de enviar el correo electrónico
              // fs.unlink(path.join(__dirname, filePath), (err) => {
              //   if (err) {
              //     console.error('Error al eliminar el archivo de código QR:', err);
              //   }
              // });
            });
          }
        });
      } else {
        res.status(404).send('No se encontró el producto');
      }
    })
    .catch((err) => {
      console.error('Error al obtener los datos del producto:', err);
      res.status(500).send('Error al obtener los datos del producto');
    });
});


app.get('/products/:id/barcode', (req, res) => {
  const productId = req.params.id;

  products.findById(productId)
    .then((product) => {
      if (product) {
        const data = JSON.stringify(product); // Convertir el objeto product a una cadena JSON
        const options = {
          bcid: 'code128', // Tipo de código de barras (puedes cambiarlo según tus necesidades)
          text: data, // Datos del código de barras
          scale: 3, // Escala del código de barras (puedes ajustarlo según tus necesidades)
          height: 20, // Altura del código de barras (puedes ajustarlo según tus necesidades)
          includetext: true, // Incluir el texto junto al código de barras (opcional)
        };

        bwipjs.toBuffer(options, (err, png) => {
          if (err) {
            console.error('Error al generar el código de barras:', err);
            res.status(500).send('Error al generar el código de barras');
          } else {
            res.set('Content-Type', 'image/png');
            res.send(png);
          }
        });
      } else {
        res.status(404).send('No se encontró el producto');
      }
    })
    .catch((err) => {
      console.error('Error al obtener los datos del producto:', err);
      res.status(500).send('Error al obtener los datos del producto');
    });
});


app.post('/send-email', (req, res) => {
  const { name, email, telefono, destino, boda, presupuesto, guest } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Cambia esto según tu proveedor de correo
    auth: {
      user: 'krisnaspiral@gmail.com', // Cambia esto a tu dirección de correo
      pass: 'wmingyhpgzydjerp', // Cambia esto a tu contraseña
    },
  });

  const mailOptions = {
    from: 'krisnaspiral@gmail.com', // Cambia esto a tu dirección de correo
    to: 'nicoechiburu@gmail.com', // Cambia esto al correo del destinatario
    subject: 'Nuevo formulario de contacto',
    html: `
      <p>Nombre: ${name}</p>
      <p>Email: ${email}</p>
      <p>Telefono: ${telefono}</p>
      <p>Destino: ${destino}</p>
      <p>Tipo de boda: ${boda}</p>
      <p>Invitados: ${guest}</p>
      <p>Presupuesto: ${presupuesto}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).send('Correo enviado exitosamente');
    }
  });
});
