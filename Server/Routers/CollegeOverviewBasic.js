const express = require('express')
const router = express.Router()
const College_Model = require('../Models/College_register')

router.get('/collegeoverviewbasic/:collegeId', async (req,res) => {

    const {collegeId} = req.params
    
    try{

        if(!collegeId) return res.status(400).json({message: 'Require data is missing'})
            const college = await College_Model.findOne({_id: collegeId}).select('collegename institutecategory type mode boardauthority logo siteurl about')
        if(!college) return res.status(404).json({message: 'Not found'})
        res.status(200).json(college)

    }catch(err){
        res.status(500).json({message: 'Server error'})
    }

})
module.exports = router