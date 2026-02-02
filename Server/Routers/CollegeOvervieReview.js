const express = require('express')
const router = express.Router()
const Review_Model = require('../Models/ReviewModel')
const College_Model = require('../Models/College_register')

router.get('/collegeoverviewreview/:collegeId', async (req, res) => {

    const { collegeId } = req.params

    try {

        if (!collegeId) return res.status(400).json({ message: 'Missing require data' })
        const college = await College_Model.findOne({ _id: collegeId })
        if (!college) return;
        const review = await Review_Model.find({ collegeid: collegeId })
        res.status(200).json(review)

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router