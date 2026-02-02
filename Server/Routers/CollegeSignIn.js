const express = require('express')
const router = express.Router()
const College_Model = require('../Models/College_register')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt')

router.post('/college_signin', async (req, res) => {

    const { collegedata } = req.body

    try {

        if (!collegedata) return res.status(400).json({ message: 'Missing require data' })
        const college = await College_Model.findOne({ email: collegedata?.email })
        if (!college) return res.status(404).json({ message: 'Invalid credentials' })
        const ispasswordmatch = await bcrypt.compare(
            collegedata?.password,
            college?.password
        )
        if (!ispasswordmatch) return res.status(404).json({ message: 'Invalid credentials' })
        const token = JWT.sign({ id: college?._id, role: college?.Role }, process.env.JWT_SECRET_KEY)
        if (!token) return res.status(404).json({ message: 'Something went wrong' })
        res.status(200).json({
            message: 'Successfully signin',
            token: token
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router