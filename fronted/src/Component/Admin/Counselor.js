import React, { useContext, useEffect, useState } from 'react'
import person from '../../Image/person.jpg'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AuthContext } from '../../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Counselor = () => {
  const { user, role, token } = useContext(AuthContext)
  const URL = process.env.REACT_APP_SERVER_URL
  const [allcounselor, setallcounselor] = useState([])
  const Navigate = useNavigate()

  useEffect(() => {
    const get_counselor = async () => {
      try {
        const res = await axios.post(`${URL}/getAllcounselor`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setallcounselor(res?.data)
      } catch (err) {
        if (err?.response?.status === 403 || err?.response?.status === 400 || err?.response?.status === 500) {
          alert(err?.response?.data?.message)
        }
      }
    }
    if (token) {
      get_counselor()
    }
  })

  const toupdate = async (counselor) => {
    Navigate(`/admin/Counselor/${counselor?.fullname}/${counselor?._id}`)
  }

  return (
    <div className='counselor-detail-page' style={{marginTop:'15px'}}>
      {allcounselor.length > 0 && (
        allcounselor.map((counselor, index) => {
          return (
            <div class="profile-card" onClick={()=>toupdate(counselor)}>
              <div class="profile-image">
                <img src={counselor?.profile} alt="Profile"/>
              </div>

              <div class="profile-content">
                <div class="profile-header">
                  <h2>
                    {counselor?.fullname}
                  </h2>
                </div>

                <div class="meta">
                  <span>{counselor?.workstatus}</span>
                  <span>{counselor?.jobposition}</span>
                  <span>{counselor?.department}</span>
                </div>

                <h3 class="qualification">Qualification: {counselor?.qualification}</h3>

                <p class="about">{counselor?.about}</p>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default Counselor
