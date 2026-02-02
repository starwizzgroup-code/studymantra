const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Course_Model = require('../Models/Course_Model')

router.patch('/updatecourse', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { updatecourse } = req.body
    try {

        if (!role || !id || !updatecourse) return res.status(404).json({ message: 'Invalid request data' })
        if (!role === 'college') return res.status(400).json({ message: 'Access denied' })
        const update = await Course_Model.findOneAndUpdate(
            { collegeid: id, courseid: updatecourse?.courseid },
            {
                $set: updatecourse
            }
        )
        await update.save()
        res.status(200).json({ message: 'Course updated successfully' })

    } catch (err) {
        res.status(500).json({message: 'Server error'})
    }

})

module.exports = router