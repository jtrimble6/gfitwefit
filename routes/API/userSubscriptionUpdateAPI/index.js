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
    console.log('User subscription updating server is ready to take messages');
  }
});

router.post('/sendUserSubscriptionUpdate', (req, res, next) => {
  var firstName = req.body.firstName
  var lastName= req.body.lastName
  var email = req.body.email
  var paymentCard = req.body.paymentCard

  var content = `Woo Hoo! A GFit user has decided to activate their membership.\n\nPlease see below regarding the users information to set up the users monthly payment plan with Converge.\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\n Credit Card: ${paymentCard}`

  var mail = {
    from: firstName + lastName,
    // to: 'kgouveia@gfitwefit.com',  //Change to email address that you want to receive messages on
    to: 'trimbledevelops@gmail.com',
    subject: 'User Subscription Activated!',
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