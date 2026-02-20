const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const cloudinary = require('cloudinary')
const CloudinaryAuth = require('../Middlewares/CloudinaryAuth')
const College_Model = require('../Models/College_register')
const User_Model = require('../Models/User_Register')

router.patch('/updateProfilePic', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { updateprofile } = req.body
    const { userdata } = req.body

    const UpdateImageOnCloudinary = async (publicId, file) => {
        CloudinaryAuth()
        if (!publicId) {
            const upload = await cloudinary.uploader.upload(file)
            return {
                public_id: upload?.public_id,
                url: upload?.secure_url
            }
        }
        if (publicId) {
            const deleteFromCloudinary = await cloudinary.uploader.destroy(publicId)
            const uploadnew = await cloudinary.uploader.upload(file)
            return {
                public_id: uploadnew?.public_id,
                url: uploadnew?.secure_url
            }
        }
    }

    try {

        if (role === 'college') {
            if (!role || !id || !updateprofile) return res.status(400).json({ message: 'Missing require data' })
            const college = await College_Model.findById({ _id: id })
            if (!college) return res.status(404).json({ message: 'Not found' })
            if (college?.profile === updateprofile?.profile) return res.status(409).json({ message: 'No new image selected.' })
            const Update = await UpdateImageOnCloudinary(college?.publicId, updateprofile?.profile)
            if (!Update) return res.status(500).json({ message: 'Cloudinary server error' })
            const updateDB = await College_Model.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        profile: Update?.url,
                        publicId: Update?.public_id
                    }
                }
            )
            if (!updateDB) return res.status(500).json({ message: 'Profile not update try again' })
            return res.status(200).json({ message: 'Successfully updated' })
        } else if (role === 'user') {
            if (!role || !id || !userdata) return res.status(400).json({ message: 'Missing require data' })
            const user = await User_Model.findById({ _id: id })
            if (!user) return res.status(404).json({ message: 'Not found' })
            if (user?.profile === userdata?.profile) return res.status(409).json({ message: 'No new image selected.' })
            const Update = await UpdateImageOnCloudinary(user?.publicId, userdata?.profile)
            if (!Update) return res.status(500).json({ message: 'Cloudinary server error' })
            const updateDB = await User_Model.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        profile: Update?.url,
                        publicId: Update?.public_id
                    }
                }
            )
            if (!updateDB) return res.status(500).json({ message: 'Profile not update try again' })
            return res.status(200).json({ message: 'Successfully updated' })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router