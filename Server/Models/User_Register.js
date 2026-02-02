const mongoose = require('mongoose')

// schema
const Schema = new mongoose.Schema({
    Role: {
        type: String,
        required: true,
        default: 'user'
    },
    fullname: {
        type: String,
        required: true
    },
    profile: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    DOB: {
        type: Date
    },
    gender: {
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
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

// model
const Model = mongoose.model('userregisters', Schema)
module.exports = Model