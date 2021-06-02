const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
})

const categories = mongoose.model('categories', categorySchema)

module.exports = categories

