const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Application_Model = require('../Models/ApplicationModel')

router.post('/userapplication_atdashboard', Middleware, async (req, res) => {

    const { id, role } = req.user

    try {

        if (!role || !id) res.status(400).json({ message: 'Missing require data' })
        if (role !== 'admin' && role !== 'counselor') res.status(403).json({ message: 'Access denied' })
        const applications = await Application_Model.find()
        res.status(200).json({
            applications: applications
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router