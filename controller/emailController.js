const nodemailer = require('nodemailer');

// Controlador para enviar el correo
const sendEmail = async (req, res) => {
    const { name, email, destino, boda, presupuesto, telefono, guest } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Puedes cambiar esto a otro proveedor de correo
        auth: {
            user: 'nicoechiburu@gmail.com', // Tu dirección de correo
            pass: 'snbmnmfdqvvecsap', // Tu contraseña
        },
    });

    const mailOptions = {
        from: 'nicoechiburu@gmail.com',
        to: 'nicoechiburu@gmail.com',
        subject: 'Nueva cotizacion de boda',
        text: `Nueva solicitud:
        Nombre: ${name}, 
        Correo: ${email},
        Destino: ${destino}, 
        Tipo de boda: ${boda},
        Presupuesto: ${presupuesto}, 
        Telefono: ${telefono},
        Cantidad de invitados: ${guest}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al enviar el correo' });
    }
};

module.exports = {
    sendEmail: sendEmail,
  };
  