const nodemailer = require('nodemailer');
const { config } = require('./config/config'); // De aqui tomamos la variable secreta

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: config.smtpEmail,
    pass: config.smtpPassword,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: config.smtpEmail, // sender address
    to: 'yanueltex@gmail.com', // list of receivers
    subject: 'Éste es un nuevo correo ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendMail();
