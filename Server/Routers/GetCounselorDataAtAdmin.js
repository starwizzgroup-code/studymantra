const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Counselor_Model = require('../Models/CounselorModel')
const Permission_Model = require('../Models/PermissionModel')

router.post('/getcounselordata/:_id', Middleware, async (req, res) => {

    const { role, id } = req.user
    const { _id } = req.params

    try {

        if (!role || !id || !_id) return res.status(400).json({ message: 'Missing require data' })
        if (role !== 'admin') return res.status(403).json({ message: 'Access denied' })
        const counselor = await Counselor_Model.findById({ _id: _id })
        if (!counselor) return res.status(404).json({ message: 'Not found try again' })
        const permission = await Permission_Model.findOne({ counselorId: counselor?._id }).select('-_id -counselorId -__v')
        if (!counselor && !permission) return res.status(404).json({ message: 'Something went wrong' })
        res.status(200).json({
            counselor: counselor,
            permission: permission
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router