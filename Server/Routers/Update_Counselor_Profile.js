const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Counselor_Model = require('../Models/CounselorModel')
const User_Model = require('../Models/User_Register')
const Permission_Model = require('../Models/PermissionModel')

router.patch('/update_counselor_profile', Middleware, async (req, res) => {

    const { role, id } = req.user
    const { counselorPayload } = req.body
    try {

        if (!role || !id || !counselorPayload) return res.status(404).json('Require data is missing');
        if (role !== 'admin') return res.status(403).json({ message: 'Access denied' })
        const user = await User_Model.findOne({ email: counselorPayload?.profile?.email })
        const counselor = await Counselor_Model.findOne({ email: counselorPayload?.profile?.email })
        if (user || counselor) return res.status(409).json({ message: 'Email already exists. Try a different one.' })
        const updateCounselor = await Counselor_Model.findByIdAndUpdate(
            { _id: counselorPayload?.counselorId },
            { $set: counselorPayload?.profile }
        )
        if (!updateCounselor) return res.status(400).json({ message: 'Something went wrong' });
        const permission = await Permission_Model.findOneAndUpdate(
            { counselorId: counselorPayload?.counselorId },
            { $set: counselorPayload?.permissions }
        )
        res.status(200).json({ message: 'Update successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router