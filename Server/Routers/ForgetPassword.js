const express = require('express')
const router = express.Router()
const College_Model = require('../Models/College_register')
const User_Model = require('../Models/User_Register')
const Otp_Model = require('../Models/OtpModel')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt')

router.post('/request-Forgot-Password', async (req, res) => {

    const { forgotPasswordData } = req.body
    const { customAlphabet } = await import("nanoid")
    const generate6DigitId = customAlphabet("0123456789", 6);
    const Otp = generate6DigitId()

    try {
        if (!forgotPasswordData?.email || !Otp) return res.status(400).json({ message: 'Missing require data' })
        let user;
        user = await College_Model.findOne({ email: forgotPasswordData?.email })
        user = await User_Model.findOne({ email: forgotPasswordData?.email })
        if (!user) return res.status(404).json({ message: 'No account found with this email' })
        const createOtp = await Otp_Model.create({
            Role: user?.Role,
            userid: user?._id,
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
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: 'Something went wrong mail not send' })
            } else {
                return res.status(200).json({
                    message: 'Otp is send to your email',
                    email: user?.email,
                    role: user?.Role,
                    userId: user?._id
                })
            }
        })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }

})

router.patch('/verify-forgot-password', async (req, res) => {

    const { forgotPasswordData } = req.body
    const hashPassword = await bcrypt.hash(forgotPasswordData?.password, 10)

    try {

        if (!forgotPasswordData || !hashPassword) return res.status(400).json({ message: 'Missing require data' })
        let user;
        if (forgotPasswordData?.role === 'user') {
            user = await User_Model.findById({ _id: forgotPasswordData?.userId })
        } else if (forgotPasswordData?.role === 'college') {
            user = await College_Model.findById({ _id: forgotPasswordData?.userId })
        }
        if (!user) return res.status(404).json({ message: 'Not found' })
        const otp = await Otp_Model.findOne({
            Role: user?.Role,
            userid: user?._id,
            email: user?.email,
            otp: forgotPasswordData?.otp,
        })
        if (!otp) return res.status(400).json({ message: 'Enter otp is invalid or expire' })
        let update;
        if (forgotPasswordData?.role === 'user') {
            update = await User_Model.findByIdAndUpdate(
                { _id: user?._id },
                { $set: { password: hashPassword } }
            )
        } else if (forgotPasswordData?.role === 'college') {
            update = await College_Model.findByIdAndUpdate(
                { _id: user?._id },
                { $set: { password: hashPassword } }
            )
        }
        if (!update) return res.status(500).json({ message: 'Server error' })
        return res.status(200).json({ message: 'Password successfully updated' })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router