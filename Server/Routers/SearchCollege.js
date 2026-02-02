const express = require('express')
const router = express.Router()
const College_Model = require('../Models/College_register')

router.post('/searchcollege', async (req, res) => {
    const { query } = req.body

    try {

        if (!query) return;
        const findcollege = await College_Model.find({
            collegename: { $regex: query, $options: "i" },
            Status: { $regex: /^Approval$/i }
        }).select('collegename _id institutecategory logo');
        res.status(200).json(findcollege)

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router