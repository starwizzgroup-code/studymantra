const express = require('express')
const router = express.Router()
const Admin_Model = require('../Models/Admin_Signin')
const JWT = require('jsonwebtoken')
const jwt_secret = require('dotenv').config()

router.post('/adminsignin', async (req, res) => {
    const { admincredential } = req.body

    try {
        const admin = await Admin_Model.findOne({
            name: admincredential?.name,
            email: admincredential?.email,
            password: admincredential?.password
        })
        if (!admin) return res.status(400).json({ message: 'Invalid credential' })
        // generatejwt
        const token = JWT.sign({ id: admin?._id, role: admin?.Role }, process.env.JWT_SECRET_KEY)
        res.status(200).json({
            message: 'admin signin successfully',
            token: token,
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router