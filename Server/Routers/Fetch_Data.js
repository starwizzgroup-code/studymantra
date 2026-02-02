const express = require('express')
const router = express.Router()
const middleware = require('../Middleware')
const college_register = require('../Models/College_register')
const admin_model = require('../Models/Admin_Signin')
const user_model = require('../Models/User_Register')
const counselor_model = require('../Models/CounselorModel')

router.post('/getdata', middleware, async (req, res) => {
    try {

        const { id, role } = req.user
        if (role === 'college') {
            const findcollege = await college_register.findOne({ _id: id })
            if (findcollege) {
                return res.status(200).json(findcollege)
            } else {
                return res.status(400).json({ message: 'account not found with this credential' })
            }
        } else if (role === 'admin') {
            const findadmin = await admin_model.findOne({ _id: id })
            if (findadmin) {
                res.status(200).json(findadmin)
            } else {
                return res.status(400).json({ message: 'account not found with this credential' })

            }
        } else if (role === 'user') {
            const finduser = await user_model.findById({ _id: id })
            if (finduser) {
                return res.status(200).json(finduser)
            } else {
                res.status(400).json({ message: 'account not found with this credential' })
            }
        } else if (role === 'counselor') {
            const finduser = await counselor_model.findById({ _id: id })
            if (finduser) {
                return res.status(200).json(finduser)
            } else {
                res.status(400).json({ message: 'account not found with this credential' })
            }
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error', err })
    }

})
module.exports = router