const mongoose = require('mongoose')

// schema
const Schema = new mongoose.Schema({
    collegeid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    postid: {
        type: String,
        required: true
    },
    fileurl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

// model
const Model = mongoose.model('gallerys', Schema)
module.exports = Model