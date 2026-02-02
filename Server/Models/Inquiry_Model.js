const mongoose = require('mongoose')

// schema
const Schema = new mongoose.Schema({
    enquiryId: {
        type: String,
        required: true,
        unique: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    Status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    courselookingfor: {
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
        required: true
    },
    actiontakenBy: {
        counselorId: {
            type: mongoose.Schema.Types.ObjectId
        },
        counselorName: {
            type: String
        },
        actionAt: {
            type: Date
        }
    }
})

// model
const Model = mongoose.model('inquiries', Schema)
module.exports = Model