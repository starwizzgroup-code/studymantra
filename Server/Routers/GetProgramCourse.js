const express = require('express')
const router = express.Router()
const Course_Model = require('../Models/Course_Model')

router.post('/getcourseByprogram', async (req,res) => {

    const {program} = req.body
    try{
        if(!program) return;
        const allcourse = await Course_Model.find({courselevel: program}).select('coursename')
        const coursevalue = allcourse.map(val => {return val.coursename})
        const unique = [...new Set(coursevalue)]
        res.status(200).json(unique)

    }catch(err){
        res.status(500).json({message: 'Server error'})
    }

})
module.exports = router