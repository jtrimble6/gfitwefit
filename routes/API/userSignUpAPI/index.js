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

router.post('/sendUserInfo', (req, res, next) => {
  var firstName = req.body.firstName
  var lastName= req.body.lastName
  var email = req.body.email
  var subscriptionStatus = req.body.subscriptionStatus

  var content = `Let's go! A new user has signed up through the GFit website.\nPlease see below regarding the new user's subscription status. If the user shows an ACTIVE subscription, an admin will need to set the user up in Converge for recurring payments.\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nSubscription status: ${subscriptionStatus}\n`

  var mail = {
    from: firstName + lastName,
    // to: 'kgouveia@gfitwefit.com',  //Change to email address that you want to receive messages on
    to: 'trimbledevelops@gmail.com',
    subject: 'New User Sign Up',
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