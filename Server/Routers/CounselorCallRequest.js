const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const User_Model = require('../Models/User_Register')
const Call_Request_Model = require('../Models/CounselorCallRequest')
const Counselor_Model = require('../Models/CounselorModel')

router.post('/counselorCallRequest', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { callRequestData, counselorId } = req.body
    const { v4: uuidv4 } = await import('uuid')
    const requestId = uuidv4()

    try {

        if (!id || !role || !callRequestData || !requestId) return res.status(400).json({ message: 'MIssing require data' })
        const user = await User_Model.findById({ _id: id })
        const counselor = await Counselor_Model.findById({ _id: counselorId })
        if (!user || !counselor) return res.status(404).json({ message: 'User or Counselor not found' })
        const isAlreadyRequest = await Call_Request_Model.findOne({
            userId: user?._id,
            counselorId: counselor?._id
        })
        if (isAlreadyRequest) return res.status(409).json({ message: 'A call request has already been sent to this counselor. Kindly select another counselor to proceed' })
        const createRequest = await Call_Request_Model.create({
            requestId: requestId,
            counselorId: counselor?._id,
            counselorName: counselor?.fullname,
            userId: user?._id,
            fullName: user?.fullname,
            phone: user?.phone,
            email: user?.email,
            city: callRequestData?.city, 
            state: callRequestData?.state,
            coursename: callRequestData?.coursename,
            mode: callRequestData?.modeofcourse,
            specialization: callRequestData?.specialization.toUpperCase(),
            createdAt: new Date().toLocaleString()
        })
        if (!createRequest) return res.status(500).json({ message: 'Internal server error' })
        return res.status(200).json({
            status: 200,
            message: 'Reques submit successfully'
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router