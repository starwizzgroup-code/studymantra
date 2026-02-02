const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Course_Model = require('../Models/Course_Model')

router.post('/getcollegecourse', Middleware, async (req, res) => {

    const { role, id } = req.user
    try {

        if (!role || !id) return res.status('Invalid request data')
        if (role !== 'college') return res.status(403).json({ message: 'Access denied' })
        const courses = await Course_Model.find({ collegeid: id })
        res.status(200).json(courses)

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router