const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Application_Model = require('../Models/ApplicationModel')
const Counselor_Model = require('../Models/CounselorModel')
const Admin_Model = require('../Models/Admin_Signin')

router.patch('/takeactionOnuser', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { actionvalue, applicationId } = req.body

    try {

        if (!id || !role || !actionvalue || !applicationId) return res.status(400).json({ message: 'Missing require data' })
        if (role !== 'admin' && role !== 'counselor') return res.status(403).json({ message: 'Access denied' })
        let actor;
        if (role === 'admin') {
            actor = await Admin_Model.findById({ _id: id })
        }
        if (role === 'counselor') {
            const counselor = await Counselor_Model.findById({ _id: id })
            if (!counselor) return res.status(404).json({ message: 'Counselor not found' })
            if (counselor?.workstatus === 'Inactive') return res.status(403).json({ message: 'Counselor is inactive. Action not allowed.' })
            actor = counselor
        }
        if (!actor) res.status(404).json({ message: 'Not found' })
        const update = await Application_Model.findOneAndUpdate(
            { applicationId: applicationId },
            {
                $set: {
                    Status: actionvalue,
                    actiontakenBy: {
                        counselorId: actor?._id,
                        counselorName: actor?.Role === 'counselor' ? actor?.fullname : 'Admin',
                        actionAt: new Date().toLocaleString()
                    }
                }
            }
        )
        await update.save()
        res.status(200).json('Successfully updated')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router