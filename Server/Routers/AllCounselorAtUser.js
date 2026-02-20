const express = require('express')
const router = express.Router()
const Counselor_Model = require('../Models/CounselorModel')

router.post('/counselors', async (req,res) => {

    try{

        const allCounselor = await Counselor_Model.find().select('profile fullname gender about qualification experience')
        return res.status(200).json({
            counselors: allCounselor
        })

    }catch(err){
        return res.status(500).json({message: 'Server error'})
    }

})
module.exports = router