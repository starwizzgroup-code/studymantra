const express = require('express')
const router = express.Router()
const Enquiry_Model = require('../Models/Inquiry_Model')
const Middleware = require('../Middleware')

router.post('/userenquiry_Atdashboard', Middleware, async (req, res) => {

    const { id, role } = req.user

    try {

        if (!role || !id) res.status(400).json({ message: 'Missing require data' })
        if (role !== 'admin' && role !== 'counselor') res.status(403).json({ message: 'Access denied' })
        const enquries = await Enquiry_Model.find()
        res.status(200).json(enquries)

    } catch (err) {
        res.status(500).json({ message: 'Server eror' })
    }

})
module.exports = router