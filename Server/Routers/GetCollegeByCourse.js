const express = require('express')
const router = express.Router()
const Course_Model = require('../Models/Course_Model')
const College_Model = require('../Models/College_register')

router.post('/getcollegBycourse', async (req, res) => {

    const { course } = req.body

    try {

        if (!course) return;
        const allcourse = await Course_Model.find({ coursename: course })
        //return college id
        const collegeIds = allcourse.map((college) => { return college?.collegeid })
        // find getall college
        const colleges = await College_Model.find({
            _id: { $in: collegeIds },
            Status: "Approval"
        }).select('collegename institutecategory type mode logo')
        res.status(200).json(colleges)

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router