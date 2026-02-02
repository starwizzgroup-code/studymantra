const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Counselor_Model = require('../Models/CounselorModel')
const nodemailer = require('nodemailer')
const dontenv = require('dotenv').config()

router.post('/sendsigninlink_toCounselor', Middleware, async (req, res) => {
    const { id, role } = req.user
    const { counselorId } = req.body

    try {

        if (!role || !counselorId) return res.status(400).json({ message: 'Missing require data' })
        if (role !== 'admin') return res.status(403).json({ message: 'Access denied' })
        const counselor = await Counselor_Model.findById({ _id: counselorId })
        if (!counselor) return res.status(404).josn({ message: 'Counselor not found' })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            }
        })
        const mailOptions = {
            from: `"Study Mantra" ${process.env.ADMIN_EMAIL}`,
            to: counselor?.email,
            subject: 'Sign In to Your Study Mantra Account',
            text: 'Use the secure link below to sign in to your Study Mantra counselor account. Do not share this link with anyone',
            html: `<p>Hello,</p>
  <p>You have requested to sign in to your <strong>Study Mantra</strong> counselor account.</p>
  <p>
  <strong>SignIn Credentials:</strong><br/>
  Email: ${counselor?.email}<br/>
  Password: ${counselor?.password}
</p>
  <p>Please click the button below to securely sign in:</p>
  <p style="margin: 20px 0;">
    <a 
      href="http://localhost:3000/counselor-Singin/9f3c2a7e6b1d4f0a8c5e7d9b2a1c4e6f8d0b3a5c7e9f1a2b4d6" 
      style="
        background-color:#1e40af;
        color:#ffffff;
        padding:12px 20px;
        text-decoration:none;
        border-radius:10px;
        display:inline-block;
        font-weight:bold;
      "
    >
      Sign In to Your Account
    </a>
  </p>
  <p>If you did not request this, please ignore this email. Your account remains secure.</p>
  <p style="margin-top:30px;">
    Regards,<br/>
    <strong>Study Mantra Team</strong>
  </p>`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err)
                res.status(400).json({ message: 'Something went wrong mail not send' })
            } else {
                res.status(200).json({ message: 'Successfully send' })
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
})
module.exports = router