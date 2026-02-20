const express = require('express')
const router = express.Router()
const College_Model = require('../Models/College_register')

router.post('/topUniversity', async (req, res) => {

    try {

        const College = await College_Model.find({isTier: true}).select('profile collegename institutecategory type mode collegename')
        if (!College) return res.status(500).json({ message: 'Server error' })
        return res.status(200).json({
            colleges: College
        })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router