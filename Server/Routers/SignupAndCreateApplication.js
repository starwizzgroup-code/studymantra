const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Application_Model = require('../Models/ApplicationModel')
const User_Register_Model = require('../Models/User_Register')
const College_Model = require('../Models/College_register')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()

router.post('/singupandcreateapplication', async (req, res) => {

    const { application, user } = req.body
    const { v4: uuidv4 } = await import('uuid')
    const applicationId = uuidv4()

    try {
        if (!application || !applicationId) return res.status(400).json({ message: 'Missing require data' })
        const college = await College_Model.findById({ _id: application?.collegeid }).select('-password')
        if (!college) return res.status(404).json({ message: 'College Not Available Yet' })
        if (!user && !user?._id) {
            // singup user and create application 
            const user = await User_Register_Model.findOne({
                $or: [
                    { phone: application?.phone },
                    { email: application?.email },
                ]
            })
            const colleges = await College_Model.findOne({
                $or: [
                    { phone: application?.phone },
                    { email: application?.email },
                ]
            })
            if (user || colleges) return res.status(409).json({ message: 'Phone or Email Already Exists' })
            const newuser = await User_Register_Model.create({
                Role: 'user',
                fullname: application?.fullname,
                profile: application.profile ? application?.profile : '',
                email: application?.email,
                DOB: '',
                gender: application?.gender,
                city: application?.city,
                state: application?.state,
                phone: application?.phone,
                password: application?.password,
                createdAt: new Date().toLocaleString()
            })
            await newuser.save()

            // create application
            const newapplication = await Application_Model.create({
                Status: 'Pending',
                applicationId: applicationId,
                userid: newuser?._id,
                collegeid: college?._id,
                collegename: college?.collegename,
                ownername: college?.ownername,
                ownerphone: college?.phone,
                collegephone: college?.collegephone,
                collegeemail: college?.email,
                modeofcourse: application?.modeofcourse,
                course: application?.coursename.toUpperCase(),
                specialization: application?.specialization,
                fullname: application?.fullname,
                email: application?.email,
                phone: application?.phone,
                city: application?.city,
                state: application?.state,
                createdAt: new Date().toLocaleString()
            })
            await newapplication.save()
            const token = JWT.sign({ id: newuser?._id, role: newuser?.Role }, process.env.JWT_SECRET_KEY)
            if (!token) return res.status(400).json({ message: 'Something went wrong' })
            res.status(200).json({
                token: token,
                message: 'Successfully'
            })

        }

        const findapplication = await Application_Model.findOne({
            userid: user?._id,
            collegeid: college?._id,
            course: application?.coursename,
            specialization: application?.specialization,
            modeofcourse: application?.modeofcourse
        })
        if (findapplication) res.status(409).json({ message: 'You have already applied for this course at the selected college.' })
        const newapplication = await Application_Model.create({
            applicationId: applicationId,
            userid: user?._id,
            collegeid: college?._id,
            collegename: college?.collegename,
            ownername: college?.ownername,
            ownerphone: college?.phone,
            collegephone: college?.collegephone,
            collegeemail: college?.email,
            modeofcourse: application?.modeofcourse,
            course: application?.coursename.toUpperCase(),
            specialization: application?.specialization,
            fullname: application?.fullname,
            email: application?.email,
            phone: application?.phone,
            city: application?.city,
            state: application?.state,
            createdAt: new Date().toLocaleString()
        })
        await newapplication.save()
        res.status(200).json({ message: 'Successfully' })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router