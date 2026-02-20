const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    reviewId: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    counselorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    // user full name
    fullname: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const Model = new mongoose.model('counselorReviews', Schema)
module.exports = Model