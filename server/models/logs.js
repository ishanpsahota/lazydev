const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({

    route: String,

    remarks: String,

    date: {
        type: Date,
        default: new Date()
    }

})

exports.createLog = (logData) => {
    const log = new Logs(logData)
    return log.save();
}

const Logs = mongoose.model('logs', logsSchema)

module.exports = Logs;