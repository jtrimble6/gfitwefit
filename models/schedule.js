const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    dayOfWeek: { type: String, required: true },
    workout: { type: String, required: true },
    times: { type: String, required: true }
})

const Schedule = mongoose.model('Schedule', scheduleSchema )

module.exports = Schedule;