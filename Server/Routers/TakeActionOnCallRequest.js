const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Counselor_Model = require('../Models/CounselorModel')
const Call_Request_Model = require('../Models/CounselorCallRequest')

router.patch('/requestAction/:requestId', Middleware, async (req, res) => {

    const { requestId } = req.params
    const { value } = req.body
    const { id, role } = req.user

    try {

        if (!id || !role || !requestId || !value) return res.status(400).json({ message: 'Missing require data' })
        const counselor = await Counselor_Model.findById({ _id: id })
        if (!counselor) return res.status(404).json({ message: 'Counselor not found' })
        const update = await Call_Request_Model.findOneAndUpdate(
            { requestId: requestId },
            { $set: { Status: value } }
        )
        if (!update) return res.status(500).json({ message: 'Internal server error' })
        return res.status(200).json({ message: 'Successfully updated' })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router