const express = require('express')
const router = express.Router()
const Application_Model = require('../Models/ApplicationModel')
const Middleware = require('../Middleware')

router.post('/getuser_application', Middleware, async (req, res) => {

    const { id, role } = req.user

    try {
        if (!role || !id) return res.status(400).json({ message: 'Missing require data' })
        if (role !== 'user') return res.status(403).json({ message: 'Access denied' })
        const applications = await Application_Model.find({ userid: id }).select('-ownername -ownerphone -collegephone -collegeemail')
        res.status(200).json(applications)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router