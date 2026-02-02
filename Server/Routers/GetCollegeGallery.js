const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Gallery_Model = require('../Models/Gallery_Model')

router.post('/getcollegegallery', Middleware, async (req, res) => {

    const { role, id } = req.user

    try {

        if (!role || !id) return res.status(404).json({ message: 'Missing require data' })
        if (role !== 'college') return res.status(403).json({ message: 'Access denied' })
        const getgallery = await Gallery_Model.find({ collegeid: id })
        res.status(200).json(getgallery)

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router