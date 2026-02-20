const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Call_Request_Model = require('../Models/CounselorCallRequest')
const Counselor_Model = require('../Models/CounselorModel')

router.post('/getCallrequest', Middleware, async (req, res) => {

    const { id, role } = req.user

    try {

        if (!id || !role) return res.status(400).json({ message: 'Missing require data' })
        const counselor = await Counselor_Model.findById({ _id: id })
        if (!counselor) return res.status(404).json({ message: 'Counselor not found' })
        const callRequests = await Call_Request_Model.find({ counselorId: counselor?._id })
        return res.status(200).json({
            status: 200,
            callRequests: callRequests
        })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router