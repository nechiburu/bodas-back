const Products = require('../models/products');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

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

exports.subirArchivo = upload.single("proImg"); // Cambiado "upload.array" por "upload.single"

const stripe = require('stripe')('sk_test_51NIuUSBVZkoMCPQO824M3gcBHD7XsTPCO5K4Nvzvc5VunVPAaCvm7USdEpKvSCgRRnT3Bi8hebPMYYeZtbatK3EQ00PnlZNThX'); // Agregar tu clave secreta de Stripe

const { Readable } = require('stream');

// Assuming you have imported necessary modules and initialized Stripe SDK properly

exports.products = async (req, res) => {
  const { title, price, description } = req.body;
  const image = req.file;

  try {
    // Crear el producto en el inventario de Stripe
    const product = await stripe.products.create({
      name: title,
      description,
    });

    // Crear el precio en el inventario de Stripe
    const priceItem = await stripe.prices.create({
      unit_amount: price * 100,
      currency: 'usd',
      product: product.id,
    });

    // Leer el contenido del archivo de imagen como un flujo de datos
    const imageStream = fs.createReadStream(image.path);

    // Crear un archivo en Stripe y cargar el flujo de datos de la imagen
    const fileUpload = await stripe.files.create({
      purpose: 'product_image',
      file: {
        data: imageStream,
        name: image.filename,
        type: 'image/jpeg', // Cambia esto según el tipo de imagen que estés subiendo
      },
    });

    // Establecer el precio recién creado como el precio predeterminado para el producto
    await stripe.products.update(product.id, {
      default_price: priceItem.id,
      images: [fileUpload.id], // Usa el ID del archivo cargado en lugar del nombre del archivo
    });
    

    // Guardar el ID del producto de Stripe en la base de datos MongoDB
    const newProduct = new Products({
      title,
      price,
      description,
      stripeProductId: product.id,
      proImg: fileUpload.id, // Usa el ID del archivo cargado en lugar del nombre del archivo
    });

    await newProduct.save();

    res.json({ success: true, message: 'Producto agregado correctamente al inventario de Stripe y a la base de datos.' });
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(500).json({ success: false, error: 'Error al agregar el producto al inventario de Stripe y a la base de datos.' });
  }
};



exports.getProducts = async (req, res, next) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getProductById = (req, res) => {
  const productId = req.params.id;

  Products.findById(productId)
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'No se encontró el producto' });
      }
    })
    .catch((err) => {
      console.error('Error al obtener el producto:', err);
      res.status(500).json({ error: 'Error al obtener el producto' });
    });
};