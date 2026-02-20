const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true,
        unique: true
    },
    answere: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date
    }
})

const Model = mongoose.model('questionansweres', Schema)
module.exports = Model