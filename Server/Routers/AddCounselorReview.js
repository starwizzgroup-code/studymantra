const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const User_Model = require('../Models/User_Register')
const Counselor_Review_Model = require('../Models/CounselorReviewModel')
const Counselor_Model = require('../Models/CounselorModel')

router.post('/counselorReview', Middleware, async (req, res) => {

    const { v4: uuidv4 } = await import('uuid')
    const reviewId = uuidv4()
    const { review, counselorId } = req.body
    const { id, role } = req.user

    try {

        if (!id || !role || !review || !counselorId || !reviewId) return res.status(400).json({ message: 'Missing require data' })
        if (role !== 'user') return res.status(403).json({ message: 'Access denied' })
        const user = await User_Model.findById({ _id: id })
        const counselor = await Counselor_Model.findById({ _id: counselorId })
        if (!user || !counselor) return res.status(404).json({ message: 'User or counselor not found' })
        const isAlreadyReview = await Counselor_Review_Model.findOne({ userId: user?._id })
        if (isAlreadyReview) return res.status(409).json({ message: 'You have already submitted a review for this counselor.' })
        const createReview = await Counselor_Review_Model.create({
            reviewId: reviewId,
            userId: user?._id,
            counselorId: counselorId,
            // user full name
            fullname: user?.fullname,
            profilePic: user?.profile,
            text: review,
            createdAt: new Date().toLocaleString()
        })
        if (!createReview) return res.status(500).json({ message: 'Internal server error' })
        return res.status(200).json({
            status: 200,
            message: 'Review submitted successfully.'
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router