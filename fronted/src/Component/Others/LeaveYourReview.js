import React, { useContext, useEffect, useState } from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { AuthContext } from '../../App'
import axios from 'axios'
import person from '../../Image/person.jpg'

// use inside collegedetailspage
const LeaveYourReview = ({ collegeId }) => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [status, setstatus] = useState(true)
    const [review, setreview] = useState([])
    const [reviewdata, setreviewdata] = useState({
        review: ''
    })

    useEffect(() => {
        const getreview = async () => {
            try {
                const res = await axios.get(`${URL}/collegeoverviewreview/${collegeId}`)
                setreview(res?.data)
            } catch (err) {
                if (err?.response?.status === 400 || err?.response?.status === 500) {
                    alert(err?.response?.data?.message)
                }
            }
        }
        if (!collegeId || !URL) return;
        getreview()
    }, [URL, collegeId])

    // add review
    const add_review = async () => {
        if (!status) return;
        if(!collegeId) return;
        const isempty = Object.values(reviewdata).some(val => val === null || val === undefined || val === '')
        if (isempty) return alert('Fill up all information')
        try {
            setstatus(false)
            const res = await axios.post(`${URL}/leavereview`, {collegeId, reviewdata, user }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setstatus(true)
            if (err?.response?.status === 400 || err?.response?.status === 403 || err?.response?.err === 500 || err?.response?.status === 409) {
                alert(err?.response?.data?.message)
            }
        }
    }

    return (
        <div className='collegereview-leavereview-page'>
            <h3 id='page-title'>Review</h3>
            <div className='leave-review-child'>

                <div className='allreview-sec'>
                    {
                        review.length > 0 && (
                            review.map((review, index) => {
                                return (
                                    <div className='rev-sec'>
                                        <img src={review?.profile ? review?.profile : person} alt="" id='review-user' />
                                        <div className='review-content'>
                                            <h2>{review?.username}</h2>
                                            <p>{review?.review}</p>
                                            <p>{review?.createdAt}</p>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {
                    token && (
                        <div className='leaveyourreview'>
                            <textarea placeholder='Leave your review' rows={1}
                                value={reviewdata?.review}
                                onInput={(e) => {
                                    e.target.style.height = "auto";
                                    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
                                }}
                                onChange={(e) => setreviewdata(prev => ({ ...prev, review: e.target.value }))}
                            ></textarea>
                            <button onClick={add_review} style={{ cursor: status ? 'pointer' : 'not-allowed' }}><SendRoundedIcon /></button>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default LeaveYourReview
