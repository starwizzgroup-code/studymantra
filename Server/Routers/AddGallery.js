const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Gallery_Model = require('../Models/Gallery_Model')
const cloudinary = require('cloudinary')
const CloudinaryAuth = require('../Middlewares/CloudinaryAuth')
const College_Model = require('../Models/College_register')

router.post('/addgallery', Middleware, async (req, res) => {

    const { filedata } = req.body
    const { id, role } = req.user

    try {
        if (!id || !role || !filedata) return res.status(404).json({ message: 'Missing require data' })
        if (role !== 'college') return res.status(400).json({ message: 'Access denied' })
        const college = await College_Model.findById({ _id: id })
        if (!college) return res.status(404).json({ message: 'College not found' })
        const cloudinaryAuth = await CloudinaryAuth()
        if (!cloudinaryAuth) return res.status(500).json({ message: 'Internal server error' })
        const result = await cloudinary.uploader.upload(filedata?.file,).catch((error) => {
            return res.status(500).json({ message: 'Cloudinary server error' })
        })
        const post = await Gallery_Model.create({
            collegeid: college?._id,
            postid: result?.public_id,
            fileurl: result?.secure_url,
            title: filedata?.title,
            createdAt: new Date().toLocaleString()
        })
        await post.save()
        return res.status(200).json({ message: 'Successfully added' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router