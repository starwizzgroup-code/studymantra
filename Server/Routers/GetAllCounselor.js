const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Counselor_Model = require('../Models/CounselorModel')

router.post('/getAllcounselor', Middleware, async (req, res) => {

    const { role, id } = req.user

    try {

        if (!role || !id) return res.status(400).json({ message: 'Missing require data' })
        if (role !== 'admin') res.status(403).json({ message: 'Access denied' })
        const counselors = await Counselor_Model.find().select('profile fullname about workstatus experience qualification jobposition department')
        res.status(200).json(counselors)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router