const express = require('express')
const router = express.Router()
const Course_Model = require('../Models/Course_Model')

router.post('/exploreprogram', async (req,res) => {

    try {
        const program = await Course_Model.find().select('courselevel -_id')
        // return only program value
        const programvalue = program.map((val) => {return val.courselevel}) //return courselevel value
        const unique = [...new Set(programvalue)] // remove duplicate
        res.status(200).json(unique)

    } catch (err) {
        res.status(500).json({message: 'Server error'})
    }

})
module.exports = router