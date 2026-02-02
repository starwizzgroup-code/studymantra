const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const College_Model = require('../Models/College_register')

router.patch('/tackaction', Middleware, async (req, res) => {

    try {

        const { role, id } = req.user
        const { college, action } = req.body

        if (!role) {
            res.status(403).json({ message: 'Access denied' })
        }
        if(role !== 'admin') res.status(403).json({message: 'Action not allowed.'})
        if (!college || !action) {
            res.status(400).json({ message: 'College and Action are required' })
        }

        const update = await College_Model.findByIdAndUpdate(
            { _id: college._id },
            { $set: { Status: action } }
        )
        await update.save()
        res.status(200).json({ message: 'Status updated successfully' })

    } catch (err) {
        console.log(err)
    }

})
module.exports = router