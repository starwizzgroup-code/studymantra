const mongoose = require('mongoose')

// schema
const Schema = new mongoose.Schema({
    reviewId: {
        type: String,
        required: true
    },
    collegeid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profile: {
        type: String,
    },
    review: {
        type: String,
        required: true
    },
    cretedAt: {
        type: Date,
        required: true
    }
})

const Model = mongoose.model('reviews', Schema)
module.exports = Model