const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Gallery_Model = require('../Models/Gallery_Model')

router.post('/addgallery', Middleware, async (req, res) => {

    const { filedata } = req.body
    const { id, role } = req.user
    const { v4: uuidv4 } = await import('uuid')
    const postId = uuidv4()

    try {

        if (!id || !role || !filedata) return res.status(404).json({ message: 'Missing require data' })
        if (role !== 'college') return res.status(400).json({ message: 'Access denied' })
        const post = await Gallery_Model.create({
            collegeid:id,
            postid: postId,
            file: filedata?.file,
            title: filedata?.title,
            createdAt: new Date().toLocaleString()
        })
        await post.save()
        res.status(200).json({message: 'Successfully added'})

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

})

module.exports = router