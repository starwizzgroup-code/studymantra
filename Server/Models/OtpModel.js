const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Role: {
        type: String,
        require: true
    },
    userid: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true,
        unique: true
    },
    isAvailable: {
        type: Boolean,
        require: true,
        default: true
    },
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 2 * 60 * 1000),
        expires: 0   // 🔥 TTL index
    }
})

const Model = mongoose.model('otps', Schema)
module.exports = Model