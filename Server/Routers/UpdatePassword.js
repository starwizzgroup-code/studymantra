const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Otp_Model = require('../Models/OtpModel')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()
const User_Model = require('../Models/User_Register')
const College_Model = require('../Models/College_register')

router.post('/request-password-update', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { newpassword } = req.body
    const { customAlphabet } = await import("nanoid")
    const generate6DigitId = customAlphabet("0123456789", 6);
    const Otp = generate6DigitId()

    try {

        if (!id || !role || !newpassword) return res.status(400).json({ message: 'Missing require data' })
        let user;
        if (role === 'user') {
            user = await User_Model.findById({ _id: id })
        }
        if (role === 'college') {
            user = await College_Model.findById({ _id: id })
        }
        if (!user) return res.status(404).json({ message: 'User not found' })
        const createOtp = await Otp_Model.create({
            Role: role,
            userid: id,
            email: user?.email,
            otp: Otp,
        })
        await createOtp.save()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,   // your Gmail
                pass: process.env.ADMIN_PASSWORD // Gmail App Password
            }
        })
        const mailOptions = ({
            from: `"Study Mantra" <${process.env.ADMIN_EMAIL}>`,
            to: user?.email,
            subject: 'Password Reset Request',
            text: 'This OTP is for updating your password. Do not share it with anyone.',
            html: `
            <p>Your One-Time Password OTP is:</p>
            <h1 style="color:blue">${Otp}</h1>
            <p>This OTP is valid for <strong>2 minutes</strong>. Please do not share this code with anyone.</p>`
        })
        transporter.sendMail(mailOptions, (err, suc) => {
            if (err) {
                res.status(400).json({ message: 'Something went wrong mail not send' })
            } else {
                res.status(200).json({
                    message: 'Otp is send to your email',
                    email: user?.email
                })
            }
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})


router.patch('/verify-password-update', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { newpassword, Otp } = req.body

    try {

        if (!id || !role || !newpassword || !Otp) return res.status(400).json({ message: 'Missing require data' })
        const dbOtp = await Otp_Model.findOne({
            Role: role,
            userid: id,
            otp: Otp,
            isAvailable: true
        })
        if (!dbOtp) return res.status(404).json({ message: 'Enter otp is expire or invalid' })
        if (role === 'college') {
            const update = await College_Model.findByIdAndUpdate(
                { _id: id },
                { $set: { password: newpassword } }
            )
            if (!update) return res.status(400).json({ message: 'password update failed' })
        }
        const deleteotp = await Otp_Model.deleteOne({
            Role: role,
            userid: id,
            otp: Otp,
            isAvailable: true
        })
        return res.status(200).json({ message: 'password updated successfully' })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})


module.exports = router