const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Review_Model = require('../Models/ReviewModel')

router.post('/leavereview', Middleware, async (req, res) => {

    const { role, id } = req.user
    const { reviewdata, user } = req.body
    const { v4: uuidv4 } = await import('uuid')
    const reviewId = uuidv4()

    try {

        if (!role || !id || !reviewdata) return res.status(400).json({ message: 'Require data is missing' })
        if (role !== 'user') return res.status(403).json({ message: 'Access denied' })
        const find = await Review_Model.findOne({ userid: id })
        if (find) return res.status(409).json({ message: 'You have already submitted a review for this college.' })
        const review = await Review_Model.create({
            reviewId: reviewId,
            collegeid: reviewdata?.collegeid,
            userid: id,
            username: user?.fullname,
            profile: user?.profile,
            review: reviewdata?.review,
            cretedAt: new Date().toLocaleString()
        })
        await review.save()
        res.status(200).json({ 
            message: 'Successfully added',
            review: review
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router