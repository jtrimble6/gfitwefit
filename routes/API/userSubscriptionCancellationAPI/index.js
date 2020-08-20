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
    console.log('User subscription cancellation server is ready to take messages');
  }
});

router.post('/sendUserCancellation', (req, res, next) => {
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var email = req.body.email
  var paymentCard = req.body.paymentCard

  var content = `Oh no! A GFit user has decided to cancel their membership.\n\nPlease see below regarding the users information to cancel the users monthly payment plan with Converge.\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nCredit Card: ${paymentCard}\n`

  var mail = {
    from: firstName + lastName,
    // to: 'kgouveia@gfitwefit.com',  //Change to email address that you want to receive messages on
    to: 'trimbledevelops@gmail.com',
    subject: 'User Cancellation',
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