const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const College_Model = require('../Models/College_register')

router.patch('/update_college_profile', Middleware, async (req, res) => {

    const { role, id } = req.user
    const { updateprofile } = req.body

    try {

        if (!role || !id || !updateprofile) return res.status(404).json('Require data is missing');
        if (role !== 'college') return res.status(403).json({ message: 'Access denied' })
        const update = await College_Model.findByIdAndUpdate(
            { _id: id },
            {
                $set: updateprofile
            }
        )
        await update.save()
        res.status(200).json({ message: 'Update successfully' })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router