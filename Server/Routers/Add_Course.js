const express = require('express')
const router = express.Router()
const Midlleware = require('../Middleware')
const Course_Model = require('../Models/Course_Model')
const College_Model = require('../Models/College_register')

router.post('/addcourse', Midlleware, async (req, res) => {
    const { id, role } = req.user
    const { coursedata } = req.body
    const { v4: uuidv4 } = await import('uuid')
    const courseId = uuidv4()

    try {

        if (!id || !role || !coursedata) return res.status(404).json({ meassage: 'Missing require data' })
        if (role !== 'college') res.status(403).json({ message: 'Access denied' })
        // check is the course already exist
        const college = await College_Model.findById({ _id: id })
        if (!college) return res.status(404).json({ message: 'College not found' })
        const isalready = await Course_Model.findOne({ collegeid: id, coursename: coursedata?.coursename.toUpperCase() })
        if (isalready) return res.status(400).json({ message: 'Course already exist' })
        const newcourse = await Course_Model.create({
            collegeid: college?._id,
            courseid: courseId,
            coursecategory: coursedata?.coursecategory,
            modeofcourse: coursedata?.modeofcourse,
            courselevel: coursedata?.courselevel,
            coursename: coursedata?.coursename,
            department: coursedata?.department,
            specialization: coursedata?.specialization,
            duration: coursedata?.duration,
            eligibility: coursedata?.eligibility,
            yearlyfee: coursedata?.yearlyfee,
            createdAt: new Date().toLocaleString()
        })
        await newcourse.save()
        res.status(200).json({ message: 'course is added successfully' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router