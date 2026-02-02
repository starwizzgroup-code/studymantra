const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Counselor_Model = require('../Models/CounselorModel')
const Permission_Model = require('../Models/PermissionModel')
const User_Model = require('../Models/User_Register')
const College_Model = require('../Models/College_register')
const bcrypt = require('bcrypt')

router.post('/addnewcounselor', Middleware, async (req, res) => {

    const { role, id } = req.user
    const { counselordata } = req.body
    const { customAlphabet } = await import("nanoid")
    const generate6DigitId = customAlphabet("0123456789", 6);
    const staffCode = generate6DigitId()
    const hashpassword = await bcrypt.hash(counselordata?.password, 10)

    try {

        if (!role || !id || !counselordata || !staffCode || !hashpassword) return res.status(400).json({ message: 'Require data is missing' })
        if (role !== 'admin') return res.status(403).json({ message: 'Access denied' })
        const college = await College_Model.findOne({
            $or: [
                { email: counselordata?.email },
                { phone: counselordata?.phone }
            ]
        })
        const user = await User_Model.findOne({
            $or: [
                { email: counselordata?.email },
                { phone: counselordata?.phone }
            ]
        })
        const counselor = await Counselor_Model.findOne({
            $or: [
                { email: counselordata?.email },
                { phone: counselordata?.phone }
            ]
        })
        if (user || college || counselor) return res.status(409).json({ message: 'Email or Phone already in use' })
        const newcounselor = await Counselor_Model.create({
            staffCode: staffCode,
            profile: counselordata?.profile,
            fullname: counselordata?.fullname,
            gender: counselordata?.gender,
            dob: counselordata?.dob,
            email: counselordata?.email,
            phone: counselordata?.phone,
            about: counselordata?.about,
            workplace: counselordata?.workplace,
            workstatus: counselordata?.workstatus,
            reportingmanager: counselordata?.reportingmanager,
            department: counselordata?.department,
            jobposition: counselordata?.jobposition,
            qualification: counselordata?.qualification,
            experience: counselordata?.experience,
            worktype: counselordata?.worktype,
            maritalstatus: counselordata?.maritalstatus,
            paddress: counselordata?.paddress,
            pcity: counselordata?.pcity,
            pstate: counselordata?.pstate,
            ppincode: counselordata?.ppincode,
            caddress: counselordata?.caddress,
            ccity: counselordata?.ccity,
            cstate: counselordata?.cstate,
            cpincode: counselordata?.cpincode,
            nation: counselordata?.nation,
            religion: counselordata?.religion,
            citizenidentification: counselordata?.citizenindentification,
            panCard: counselordata?.panCard,
            holderName: counselordata?.holdername,
            bankName: counselordata?.bankname,
            accNumber: counselordata?.accNumber,
            ifscCode: counselordata?.ifscCode,
            branchAddress: counselordata?.branchaddress,
            upiId: counselordata?.upiId,
            linkdInprofile: counselordata?.linkdInprofile,
            hashpassword: hashpassword,
            password: counselordata?.password,
            createdAt: new Date().toLocaleString()
        })
        const createpermission = await Permission_Model.create({
            counselorId: newcounselor?._id,
        })
        await createpermission.save()
        await newcounselor.save()
        res.status(200).json({ message: 'Successfully added' })

    } catch (err) {
        res.status(500).json({ message: 'Server erro' })
    }

})
module.exports = router