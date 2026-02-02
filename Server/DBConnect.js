const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/universitylisting')
        console.log('DB Connected')
    } catch (err) {
        console.log('Something went wrong unable to connect to DB')
    }
}

connectDB()
module.exports = connectDB