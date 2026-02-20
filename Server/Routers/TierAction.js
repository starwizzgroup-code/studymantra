const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const College_Model = require('../Models/College_register')

router.patch('/tierAction/:collegeId', Middleware, async (req, res) => {
    const { collegeId } = req.params
    const {id, role } = req.user

    if (!id || !role || !collegeId) return res.status(400).json({ message: 'Missing require data' })
    if (role !== 'admin') return res.status(403).json({ message: 'Access denied' })
    const college = await College_Model.findById({ _id: collegeId })
    if (!college) return res.status(404).json({ message: 'Not found' })
    const updateTier = await College_Model.findByIdAndUpdate(
        { _id: collegeId },
        { $set: { isTier: !college?.isTier} }
    )
    if (!updateTier) return res.status(500).json({ message: 'Server error' })
    return res.status(200).json({ message: 'Successfully updated' })
})

module.exports = router