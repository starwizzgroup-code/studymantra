const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Question_Model = require('../Models/QuestionAnswere')

router.delete('/dltQuestion/:questionId', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { questionId } = req.params

    try {

        if (!id || !role || !questionId) return res.status(400).json({ message: 'Missing require data' })
        if (role !== 'admin') return res.status(403).json({ message: 'Access denied' })
        const question = await Question_Model.findOneAndDelete({ questionId: questionId })
        if (!question) return res.status(500).json({ message: 'Server error' })
        return res.status(200).json({ message: 'Successfully delete' })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router