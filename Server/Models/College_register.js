const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Role: {
        type: String,
        require: true,
        default: 'college'
    },
    Status: {
        type: String,
        require: true,
        default: 'Pending'
    },
    institutecategory: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    boardauthority: {
        type: Array
    },
    mode: {
        type: String,
        require: true
    },
    collegename: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    collegephone: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
        require: true
    },
    logo: {
        type: String
    },
    siteurl: {
        type: String
    },
    about: {
        type: String
    },
    ownername: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    }
})

const Model = mongoose.model('college_register', Schema)
module.exports = Model