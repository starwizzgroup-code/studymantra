const express = require('express')
const router = express.Router()
const User_Model = require('../Models/User_Register')
const JWT = require('jsonwebtoken')
const dotnev = require('dotenv').config()
const bcrypt = require('bcrypt')

router.post('/usersignin', async (req, res) => {

    const { userdata } = req.body
    const hashpassword = await bcrypt.hash(userdata?.password, 10)
    try {

        if (!userdata) return res.status(400).json({ message: 'Missing require data' })
        const user = await User_Model.findOne({ email: userdata?.email })
        if (!user) return res.status(401).json({ message: 'Invalid Email or Password' })
        const ispasswordmatch = await bcrypt.compare(
            userdata?.password,
            user?.password
        )
        if (!ispasswordmatch) res.status(401).json({ message: 'Invalid Email or Password' })
        const token = JWT.sign({ id: user?._id, role: user?.Role }, process.env.JWT_SECRET_KEY)
        if (token) return res.status(200).json({
            message: 'Successfully signin',
            token: token
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router