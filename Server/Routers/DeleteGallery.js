const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Gallery_Model = require('../Models/Gallery_Model')
const College_Model = require('../Models/College_register')
const cloudinary = require('cloudinary')
const CloudinaryAuth = require('../Middlewares/CloudinaryAuth')

router.delete('/deletegallery/:postId', Middleware, async (req, res) => {

    const { postId } = req.params
    const { role, id } = req.user
    console.log('call ho gya')

    try {
        if (!role || !id || !postId) return res.status(400).json({ message: 'Missing require data' })
        const college = await College_Model.findById({ _id: id })
        if (!college) return res.status(404).json({ message: 'College not found' })
        const post = await Gallery_Model.findOne({ postid: postId })
        if (!post) return res.status(404).json({ message: 'Post not found' })
        const cloudinaryAuth = await CloudinaryAuth()
        const cloudinaryDlt = await cloudinary.uploader.destroy(post?.postid)
        if (!cloudinaryDlt) return res.status(500).json({ message: 'Internal server error' })
        const galleryDlt = await Gallery_Model.deleteOne({ postid: post?.postid })
        if (!galleryDlt) return res.status(500).json({ message: 'Unable to delete' })
        return res.status(200).json({ message: 'Successfully deleted' })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router