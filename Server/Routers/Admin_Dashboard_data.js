const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const User_Model = require('../Models/User_Register')
const College_Model = require('../Models/College_register')
const Application_Model = require('../Models/ApplicationModel')
const Enquiry_Model = require('../Models/Inquiry_Model')
const Course_Model = require('../Models/Course_Model')
const Review_Model = require('../Models/ReviewModel')

router.post('/adminpaneldata', Middleware, async (req, res) => {

    const { id, role } = req.user

    try {

        if (!role || !id) res.status(400).json({ message: 'Missing require data' })
        if (role !== 'admin' && role !== 'counselor') res.status(403).json({ message: 'Access denied' })
        const user = await User_Model.find()
        const college = await College_Model.find()
        const application = await Application_Model.find()
        const enquiry = await Enquiry_Model.find()
        const course = await Course_Model.find()
        const review = await Review_Model.find()

        res.status(200).json({
            users: user,
            colleges: college,
            applications: application,
            enquiries: enquiry,
            courses: course,
            reviews: review
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router