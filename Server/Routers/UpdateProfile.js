const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const College_Model = require('../Models/College_register')
const User_Model = require('../Models/User_Register')
const cloudinary = require('cloudinary')
const CloudinaryAuth = require('../Middlewares/CloudinaryAuth')

router.patch('/updateProfile', Middleware, async (req, res) => {

    const { role, id } = req.user
    const { CollegeValiddata } = req.body
    const { UserValiddata } = req.body

    try {
        if (role === 'college') {
            if (!role || !id || !CollegeValiddata) return res.status(403).json('Require data is missing');
            const college = await College_Model.findById({ _id: id })
            if (!college) return res.status(404).json({ message: 'Not found' })
            const updateProfile = await College_Model.findByIdAndUpdate(
                { _id: id },
                { $set: CollegeValiddata }
            )
            if (!updateProfile) return res.status(400).json({ message: 'Something went wrong unable to update profile' })
            return res.status(200).json({ message: 'Profile update successfully' })
        }
        if (role === 'user') {
            if (!role || !id || !UserValiddata) return res.status(403).json('Require data is missing');
            const user = await User_Model.findById({ _id: id })
            if (!user) return res.status(404).json({ message: 'Not found' })
            const updateProfile = await User_Model.findByIdAndUpdate(
                { _id: id },
                { $set: UserValiddata }
            )
            if (!updateProfile) return res.status(400).json({ message: 'Something went wrong unable to update profile' })
            return res.status(200).json({ message: 'Profile update successfully' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router