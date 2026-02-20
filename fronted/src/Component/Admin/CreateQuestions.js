import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'

const CreateQuestions = () => {
    const { user, role, token } = useContext(AuthContext)
    const [callOnce, setcallOnce] = useState(true)
    const URL = process.env.REACT_APP_SERVER_URL
    const [questionData, setquestionData] = useState({
        question: '',
        answere: ''
    })

    const handlechanges = (e) => {
        const { name, value } = e.target
        setquestionData(prev => ({ ...prev, [name]: value }))
    }

    const addquestion = async () => {
        if (!callOnce) return;
        const isempty = Object.values(questionData).some(val => val === '' || val === undefined || val === null)
        if (isempty) return alert('Fill up all informations')
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/createnewQuestion`, { questionData }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setcallOnce(true)
            if (err?.response?.status === 400 || err?.response?.status === 400 || err?.response?.status === 403 || err?.response?.status === 409) {
                alert(err?.response?.data?.message)
            }
        }
    }

    return (
        <div className='createquestions-page'>
            <div className='createquestions-childpage'>
                <input type="text" name="question" id="" onChange={handlechanges} placeholder='Enter your question here...' />
                <div>
                    <textarea cols="30" rows="3" name='answere' onChange={handlechanges} placeholder='Enter the correct answer here...'></textarea>
                    <button onClick={addquestion} style={{cursor:callOnce?'pointer':'not-allowed'}}>Add Question</button>
                </div>
            </div>
        </div>
    )
}

export default CreateQuestions
