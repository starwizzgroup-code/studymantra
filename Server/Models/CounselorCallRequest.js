const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    requestId: {
        type: String,
        required: true
    },
    counselorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    counselorName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    coursename: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const Model = mongoose.model('counrseloCallRequests', Schema)
module.exports = Model