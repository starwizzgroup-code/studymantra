const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const College_Applications = require('../Models/College_register')

router.post('/collegeapplications', Middleware, async (req, res) => {
    const { role, id } = req.user
    try {
        if (role !== 'admin') return res.status(403).json({ message: 'access denied' })
        const applications = await College_Applications.find().select('-password')
        res.status(200).json({
            applications: applications
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error while fetching applications' })
    }

})
module.exports = router