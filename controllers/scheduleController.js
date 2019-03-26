const db = require('../models')

module.exports = {
    getSchedules: function(req, res) {
        console.log("Checking session")
        console.log(req.params);
        console.log(req.params.id);
        db.Schedule
          .find({})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    getSchedule: function(req, res) {
        console.log("Checking session")
        console.log(req.params);
        console.log(req.params.id);
        db.Schedule
          .find({ dayOfWeek: req.params.id })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    create: function(req, res) {
        db.Schedule
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    delete: function(req, res) {
      db.Schedule
        .remove({ dayOfWeek: req.params.id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    }

}