const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const Question_Model = require('../Models/QuestionAnswere')

router.post('/createnewQuestion', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { questionData } = req.body
    const { v4: uuidv4 } = await import('uuid')
    const questionId = uuidv4()

    try {

        if (!role || !id || !questionData || !questionId) return res.status(400).json({ message: 'Missing require data' })
        if (role !== 'admin') return res.status(403).json({ message: 'Access denied' })
        const findquestion = await Question_Model.findOne({
            $or: [
                { question: questionData?.question },
                { answere: questionData?.answere }
            ]
        })
        if (findquestion) return res.status(409).json({ message: 'This question or answere already exists.' })
        const createQuestion = await Question_Model.create({
            questionId: questionId,
            question: questionData?.question,
            answere: questionData?.answere,
            createdAt: new Date()
        })
        if (!createQuestion) return res.status(500).json({ message: 'Something went wrong' })
        return res.status(200).json({ message: 'Successfully created' })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router