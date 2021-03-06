var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var checkbox1 = req.body.checkbox1
  var checkbox2 = req.body.checkbox2
  var content = `Name: ${name}\nEmail: ${email}\nWorked out with us before?: ${checkbox1}\nPlanning first visit to the gym?: ${checkbox2}\nMessage: ${message}`

  var mail = {
    from: name,
    // to: 'kgouveia@gfitwefit.com',  //Change to email address that you want to receive messages on
    to: process.env.NODE_ENV === 'DEVELOPMENT' ? "trimbledevelops@gmail.com" : "kgouveia@gfitwefit.com",
    subject: 'New Message from Contact Form',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;