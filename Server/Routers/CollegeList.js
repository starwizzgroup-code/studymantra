const express = require('express')
const router = express.Router()
const College_Model = require('../Models/College_register')

router.post('/collegeList', async (req,res) => {

    try {

        const colleges = await College_Model.find({Status: 'Approval'}).select('profile collegename institutecategory type mode collegename')
        if(!colleges) return res.status(400).json({message: 'Something went wrong'})
        return res.status(200).json({colleges: colleges})

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router