const express = require('express')
const router = express.Router()
const Counselor_Model = require('../Models/CounselorModel')
const CounselorReview_Model = require('../Models/CounselorReviewModel')

router.post('/counselorOverviewDetails/:counselorId', async (req, res) => {
    const counselorId = req.params.counselorId

    try {

        if (!counselorId) return res.status(400).json({ message: 'Missing require data' })
        const counselor = await Counselor_Model.findById({ _id: counselorId }).select('profile experience qualification about gender fullname')
        if (!counselor) return res.status(404).json({ message: 'Not found' })
        const review = await CounselorReview_Model.find({ counselorId: counselorId })
        return res.status(200).json({
            counselor: counselor,
            reviews: review
        })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }
})
module.exports = router