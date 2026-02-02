const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Gallery_Model = require('../Models/Gallery_Model')

router.delete('/deletegallery', Middleware, async (req, res) => {

    const { image } = req.body
    const { role, id } = req.user

    try {

        if (!role || !id) return res.status(400).json({ message: 'Missing require data' })
        await Gallery_Model.findOneAndDelete({ collegeid: id, postid: image.postid })
        res.status(200).json({ message: 'Delete successfully' })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router