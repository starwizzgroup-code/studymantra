const express = require('express')
const router = express.Router()
const Counselor_Model = require('../Models/CounselorModel')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt')

router.post('/counselor_signIn', async (req, res) => {

    const { counselorauth } = req.body
    try {
        if (!counselorauth) return res.status(400).json({ message: 'Missing require data' })
        const counselor = await Counselor_Model.findOne({ email: counselorauth?.email })
        if (!counselor) res.status(404).json({ message: 'Invalid credentials' })
        const ispasswordmatch = await bcrypt.compare(
            counselorauth?.password,
            counselor?.hashpassword
        )
        if (!ispasswordmatch) res.status(404).json({ message: 'Invalid credentials' })
        const token = JWT.sign({ id: counselor?._id, role: counselor?.Role }, process.env.JWT_SECRET_KEY)
        if (!token) return res.status(401).json({ message: 'Invalid credentials' })
        res.status(200).json({
            token: token,
            message: 'Successfully signin'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
})
module.exports = router