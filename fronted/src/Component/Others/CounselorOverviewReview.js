import React, { useContext, useState } from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { AuthContext } from '../../App';
import axios from 'axios'

const CounselorOverviewReview = ({ Reviews, counselorId }) => {
  const { user, role, token } = useContext(AuthContext)
  const URL = process.env.REACT_APP_SERVER_URL
  const [review, setreview] = useState()
  const [callOnce, setcallOnce] = useState(true)

  // add new review
  const addReview = async () => {
    if (!callOnce) return;
    if (!review) return alert('Review cannot be empty')
    try {
      setcallOnce(false)
      const res = await axios.post(`${URL}/counselorReview`, { review, counselorId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } catch (err) {
      setcallOnce(true)
      const status = err?.response?.status
      if (status === 400 || status === 403 || status === 404 || status === 409 || status === 500) {
        alert(err?.response?.data?.message || 'Something went wrong')
      }
    }
  }

  return (
    <div className='counseloroverview-review'>

      <div id='page-title'>
        <h1>Review</h1>
      </div>

      <div className='counselor-review'>
        {
          Reviews.length > 0 && Reviews.map((review, index) => {
            return (
              <div className='c-review-sec'>
                <img src={review?.profilePic} alt="" />
                <div>
                  <h3>{review?.fullname}</h3>
                  <p>{review?.text}</p>
                </div>
              </div>
            )
          })
        }
      </div>

      {token && <div className='create-review-page'>
        <textarea cols="30" rows="3" onChange={(e) => { setreview(e.target.value) }} placeholder='Write your review'></textarea>
        <button onClick={addReview} style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}><SendRoundedIcon /></button>
      </div>}


    </div>
  )
}

export default CounselorOverviewReview
