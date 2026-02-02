const mongoose = require('mongoose')

// schema
const Schema = new mongoose.Schema({
    Role: {
        type: String,
        require: true,
        default: 'counselor'
    },
    staffCode: {
        type: String,
        required: true
    },
    profile: String,
    fullname: {
        type: String,
        required: true,
        trim: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },

    dob: {
        type: Date
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phone: {
        type: String
    },
    about: {
        require: true,
        type: String
    },
    workplace: {
        type: String,
        require: true
    },
    workstatus: {
        type: String,
        require: true
    },
    reportingmanager: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    jobposition: {
        type: String,
        require: true
    },
    qualification: {
        type: String,
        require: true
    },
    experience: {
        type: String,
        require: true
    },
    worktype: {
        type: String,
        require: true
    },

    maritalstatus: {
        type: String,
        enum: ["Single", "Married", "Divorced"]
    },
    citizenindentification: {
        type: String,
        require: true
    },
    paddress: {
        type: String,
        require: true
    },
    pcity: {
        type: String,
        require: true
    },
    pstate: {
        type: String,
        require: true
    },
    ppincode: {
        type: String,
        require: true
    },
    caddress: {
        type: String,
        require: true
    },
    ccity: {
        type: String,
        require: true
    },
    cstate: {
        type: String,
        require: true
    },
    cpincode: {
        type: String,
        require: true
    },

    nation: {
        type: String,
        require: true
    },
    religion: {
        type: String,
        require: true
    },
    citizenidentification: {
        type: String,
        require: true
    },
    panCard: {
        type: String,
        require: true
    },
    holderName: {
        type: String,
        require: true
    },
    bankName: {
        type: String,
        require: true
    },
    accNumber: {
        type: String,
        require: true
    },
    ifscCode: {
        type: String,
        require: true
    },
    branchAddress: {
        type: String,
        require: true
    },
    upiId: {
        type: String,
        require: true
    },
    linkdInprofile: {
        type: String,
        require: true
    },
    hashpassword: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date
    }
})

// model
const Model = mongoose.model('counselors', Schema)
module.exports = Model