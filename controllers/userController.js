const db = require('../models')
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
    // changeStatus: function(req, res) {
    //   db.User
    //     .update(
    //       { username: req.params.id },
    //       { $set: { 'teams.$[].team.$[name]': 'success' } },
    //       { arrayFilters: [ { 'name': req.params.team } ] }
    //      )
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err))
    // },
    updatePick: function (req, res) {
      db.User
        .update(
          { username: req.params.id },
          { $set: {'picks.$[elem].result': req.body } },
          { multi: true, arrayFilters: [ {'elem.gameDate': req.params.gameDate } ]}
        )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
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
