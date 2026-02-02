const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const User_Model = require('../Models/User_Register')

router.patch('/updateuserprofile', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { userdata } = req.body

    try {

        if (!id || !role || !userdata) res.status(400).res.status({ message: 'Missing data is require' })
        if (role !== 'user') res.status(403).json({ message: 'Access denied' })
        const user = await User_Model.findOneAndUpdate(
            { _id: id },
            {
                $set:  userdata 
            }
        )
        if(!user) return res.status(400).res.status({ message: 'Profile not update' })
        await user.save()
        res.status(200).json({ message: 'Update successfully' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router