const mongoose = require('mongoose')

// schema
const Schema = new mongoose.Schema({
    collegeid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    courseid: {
        type: String,
        required: true
    },
    coursecategory: {
        type: String,
        required: true
    },
    modeofcourse: {
        type: String,
        required: true
    },
    courselevel: {
        type: String,
        required: true
    },
    coursename: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    eligibility: {
        type: String,
        required: true
    },
    yearlyfee: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

// model
const Model = mongoose.model('courses', Schema)

module.exports = Model