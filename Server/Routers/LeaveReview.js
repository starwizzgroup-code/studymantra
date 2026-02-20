const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Review_Model = require('../Models/ReviewModel')
const User_Model = require('../Models/User_Register')
const College_Model = require('../Models/College_register')

router.post('/leavereview', Middleware, async (req, res) => {

    const { role, id } = req.user
    const { collegeId, reviewdata } = req.body
    const { v4: uuidv4 } = await import('uuid')
    const reviewId = uuidv4()

    try {

        if (!role || !id || !reviewdata || !collegeId) return res.status(400).json({ message: 'Require data is missing' })
        if (role !== 'user') return res.status(403).json({ message: 'Access denied' })
        const checkuser = await User_Model.findById({ _id: id })
        const college = await College_Model.findById({ _id: collegeId })
        if (!checkuser || !college) return res.status(404).json({ message: 'User or College not found' })
        const find = await Review_Model.findOne({ userid: user?._id })
        if (find) return res.status(409).json({ message: 'You have already submitted a review for this college.' })
        const review = await Review_Model.create({
            reviewId: reviewId,
            collegeid: collegeId,
            userid: checkuser?._id,
            username: checkuser?.fullname,
            profile: checkuser?.profile,
            review: reviewdata?.review,
            cretedAt: new Date().toLocaleString()
        })
        if (!review) return res.status(500).json({ message: 'Internal server error' })
        await review.save()
        res.status(200).json({
            status: 200,
            message: 'Successfully added',
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router