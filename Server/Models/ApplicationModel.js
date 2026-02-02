const mongoose = require('mongoose')

// Schema
const Schema = new mongoose.Schema({
    Status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    applicationId: {
        type: String,
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    collegeid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    collegename: {
        type: String,
        required: true
    },
    ownername: {
        type: String,
        required: true
    },
    ownerphone: {
        type: String,
        required: true
    },
    collegephone: {
        type: String,
        required: true
    },
    collegeemail: {
        type: String,
        required: true
    },
    modeofcourse: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
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
    createdAt: {
        type: Date,
        required: true
    },
    actiontakenBy: {
        counselorId: {
            type: String
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
const Model = mongoose.model('applications', Schema)
module.exports = Model