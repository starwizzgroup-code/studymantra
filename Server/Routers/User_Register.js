const express = require('express')
const router = express.Router()
const JWT = require('jsonwebtoken')
const User_Model = require('../Models/User_Register')
const Inquiry_Model = require('../Models/Inquiry_Model')
const dotenv = require('dotenv').config()
const College_Model = require('../Models/College_register')
const bcrypt = require('bcrypt')

router.post('/user_register', async (req, res) => {

    const { userdata } = req.body
    const { v4: uuidv4 } = await import('uuid')
    const enquiryId = uuidv4()
    const hashpassword = await bcrypt.hash(userdata?.password, 10)

    try {

        if (!userdata) return res.status(400).json({ message: 'Missing require data' })
        const user = await User_Model.findOne({
            $or: [
                { email: userdata?.email },
                { phone: userdata?.phone }
            ]
        })
        const college = await College_Model.findOne({
            $or: [
                { email: userdata?.email },
                { phone: userdata?.phone }
            ]
        })

        if (user || college) return res.status(409).json({ message: 'Email or Phone already registered' })
        const newuser = await User_Model.create({
            fullname: userdata?.fullname,
            profile: '',
            email: userdata?.email,
            DOB: userdata?.DOB,
            gender: userdata?.gender,
            city: userdata?.city,
            state: userdata?.state,
            phone: userdata?.phone,
            password: hashpassword,
            createdAt: new Date().toLocaleString()
        })
        await newuser.save()
        const token = JWT.sign({ id: newuser?._id, role: newuser?.Role }, process.env.JWT_SECRET_KEY)

        // inquiry
        const inquiry = await Inquiry_Model.create({
            enquiryId: enquiryId,
            userid: newuser?._id,
            Status: 'Pending',
            fullname: userdata?.fullname,
            email: userdata?.email,
            DOB: userdata?.DOB,
            gender: userdata?.gender,
            qualification: userdata?.qualification,
            courselookingfor: userdata?.courselookingfor.toUpperCase(),
            city: userdata?.city,
            state: userdata?.state,
            phone: userdata?.phone,
        })
        await inquiry.save()

        if (token) return res.status(200).json({
            message: 'Successfull register',
            token: token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router