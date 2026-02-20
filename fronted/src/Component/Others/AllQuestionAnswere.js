import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../App'
import useFetch from '../../Hooks/useFetch'

const AllQuestionAnswere = () => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [allQuestion, setallQuestion] = useState([])
    const {data, error} = useFetch(`${URL}/getAllQuestion`)
    useEffect(() => {
        if(data?.questions){
            setallQuestion(data?.questions)
        }
    }, [data])
    if(error) return alert(error)
        if(!data) return <p>Loading...</p>

    const dltquestion = async (question) => {
        const questionId = question?.questionId
        if (!questionId) return;
        try {
            const res = await axios.delete(`${URL}/dltQuestion/${questionId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
           window.location.reload()
        } catch (err) {
            if (err?.response?.status === 400 || err?.response?.status === 500) {
                alert(err?.response?.data?.message)
            }
        }
    }

    return (
        <div className='showquestionandanswere'>
            {
                allQuestion.length > 0 && (
                    allQuestion.map((question, index) => {
                        return (
                            <div>
                                <details>
                                    <summary>{question?.question}</summary>
                                    <p>{question?.answere}</p>
                                    {role === 'admin' && user?.Role === 'admin' && <button onClick={() => dltquestion(question)}>Delete</button>}
                                </details>
                                <hr/>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

export default AllQuestionAnswere
