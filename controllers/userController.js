const db = require('../models')
// const async = require('async')
const bcrypt = require('bcryptjs')
//const User = require('../models/user')
//const passport = require('../server/passport')

module.exports = {
    findAll: function(req, res) {
        db.User
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        console.log('find by id')
        console.log(req.params)
        db.User
          .find({username: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findOneAndUpdate: function (req, res) {
        db.User
          .update({username: req.params.id}, 
            { $push: { picks: req.body }})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    updateUserPersonalInfo: function(req, res) {
      db.User
        .updateOne(
          { username: req.params.id },
          { $set: { 
            'firstName': req.body.firstName, 
            'lastName': req.body.lastName, 
            'email': req.body.email, 
            'phoneNumber': req.body.phoneNumber 
          }},
         )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    updateUserPreferences: function(req, res) {
      db.User
        .updateOne(
          { username: req.params.id },
          { $set: { 
            'videoFilterPreferences': req.body
          }},
         )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    updateUserPassword: function(req, res) {
      // async.waterfall([
      //   function(done) {
      //     db.User
      //       .findOne({ username: req.params.id }, function(err, user) {
      //           if (!user) {
      //             console.log('NO USER FOUND')
      //             // req.flash('error', 'Password reset token is invalid or has expired.');
      //             // return res.redirect('back');
      //           }
        
      //           user.password = req.body.password;
        
      //           user.save(function(err) {
      //             if(err) {
      //               console.log('ERROR UPDATING PASSWORD: ', err)
      //             } else {
      //               console.log('SUCCESS!!')
      //             }
      //             req.logIn(user, function(err) {
      //               done(err, user);
      //             });
      //           });
      //         });
      //       },
      //   // function(user, done) {
      //   //   var smtpTransport = nodemailer.createTransport('SMTP', {
      //   //     service: 'SendGrid',
      //   //     auth: {
      //   //       user: '!!! YOUR SENDGRID USERNAME !!!',
      //   //       pass: '!!! YOUR SENDGRID PASSWORD !!!'
      //   //     }
      //   //   });
      //   //   var mailOptions = {
      //   //     to: user.email,
      //   //     from: 'passwordreset@demo.com',
      //   //     subject: 'Your password has been changed',
      //   //     text: 'Hello,\n\n' +
      //   //       'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      //   //   };
      //   //   smtpTransport.sendMail(mailOptions, function(err) {
      //   //     req.flash('success', 'Success! Your password has been changed.');
      //   //     done(err);
      //   //   });
      //   // }
      // ])
          
      // db.User
      // .findOne({ username: req.params.id }, function(err, user) {
      //   if (!user) {
      //     console.log('NO USER FOUND')
      //   }

      //   user.password = req.body.password;
        
      //   user.save(function(err) {
      //       done(err, user);
      //   });
      // })
      let password = req.body.newPassword
      let hashedPassword = bcrypt.hash(password);

      // update it with hash
      // bcrypt.hash(password, (hash) => {
      //   hashedPassword = hash
      // }, () => {
        // then update
        db.User.updateOne(
          { username: req.params.id },
          { $set: { 
            'password': hashedPassword
          }},
         )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
      // });     
      
    },
    findByDate: function(req, res) {
      db.Game
        .find(
            { username: req.params.id, gameDate: req.params.date }
          )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    create: function(req, res) {
        db.User
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    remove: function(req, res) {
        db.User
          .findById({ _id: req.params.id})
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    }
}
