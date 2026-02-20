const express = require('express')
const router = express.Router()
const CollegeModel = require('../Models/College_register')
const JWT = require('jsonwebtoken')
const jwt_secret = require('dotenv').config()
const User_Model = require('../Models/College_register')
const Counselor_Model = require('../Models/CounselorModel')
const bcrypt = require('bcrypt')

router.post('/college_register', async (req, res) => {

    const { collegeRegisterData } = req.body
    const hashpassword = await bcrypt.hash(collegeRegisterData?.password, 10)
    try {
        if (!collegeRegisterData || !hashpassword) return res.status(400).json({ message: 'Missing require data' })
        const college = await CollegeModel.findOne({ $or: [{ email: collegeRegisterData.email }, { phone: collegeRegisterData.phone }] })
        const user = await User_Model.findOne({ $or: [{ email: collegeRegisterData?.email }, { phone: collegeRegisterData?.phone }] })
        const counselor = await Counselor_Model.findOne({ $or: [{ email: collegeRegisterData?.email }, { phone: collegeRegisterData?.phone }] })
        if (college || user || counselor) return res.status(401).json({ message: 'Email or Phone number already exist' })

        // register college
        const register_college = await CollegeModel.create({
            institutecategory: collegeRegisterData?.institutecategory,
            type: collegeRegisterData?.type,
            boardauthority: collegeRegisterData?.boardauthority,
            mode: collegeRegisterData?.mode,
            collegename: collegeRegisterData?.collegename,
            email: collegeRegisterData?.email,
            collegephone: collegeRegisterData?.phone,
            address: collegeRegisterData.address,
            logo: '',
            siteurl: '',
            about: '',
            ownername: collegeRegisterData?.ownername,
            phone: collegeRegisterData?.ownerphone,
            password: hashpassword,
            createdAt: new Date().toLocaleString()
        })
        await register_college.save()
        // jwt
        const token = JWT.sign({ id: register_college._id, role: register_college.Role }, process.env.JWT_SECRET_KEY)
        res.status(200).json({
            message: 'college register successful',
            token: token,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error try again later' })
    }

})
module.exports = router