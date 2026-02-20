const express = require('express')
const router = express.Router()
const Question_Model = require('../Models/QuestionAnswere')

router.post('/getAllQuestion', async (req, res) => {

    try {

        const questions = await Question_Model.find()
        if (!questions) return res.status(500).json({ message: 'Something went wrong' })
        return res.status(200).json({ questions: questions })

    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }

})
module.exports = router