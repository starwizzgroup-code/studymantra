const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    counselorId: {
        type: String,
        require: true
    },
    canViewUserEnquiry: {
        type: Boolean,
        required: true,
        default: true
    },
    canUpdateUserEnquiryStatus: {
        type: Boolean,
        required: true,
        default: true
    },
    canDeleteUserEnquiry: {
        type: Boolean,
        required: true,
        default: false
    },
    canViewUserProfile: {
        type: Boolean,
        required: true,
        default: true
    },
    canViewCollegeList: {
        type: Boolean,
        required: true,
        default: true
    },
    canUpdateCollegeApplication: {
        type: Boolean,
        required: true,
        default: true
    },
    canDeleteCollegeApplication: {
        type: Boolean,
        required: true,
        default: false
    },
    canViewUserApplication: {
        type: Boolean,
        required: true,
        default: true
    },
    canUpdateUserApplication: {
        type: Boolean,
        required: true,
        default: true
    },
    canDeleteUserApplication: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Model = mongoose.model('permissions', Schema)
module.exports = Model