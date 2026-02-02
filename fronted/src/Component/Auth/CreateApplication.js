import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../Styles/UserRegister.css'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { AuthContext } from '../../App';
import axios from 'axios'
import { Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";

const CreateApplication = () => {
  const { user, role, token } = useContext(AuthContext)
  const URL = process.env.REACT_APP_SERVER_URL
  const Navigate = useNavigate()
  const location = useLocation()
  const state = location?.state
  const iscourselocked = state?.course?.coursename
  const isspecializationloccked = state?.course?.specialization
  const [isValid, setIsValid] = useState()
  const [status, setstatus] = useState(true)

  const [application, setapplication] = useState({
    collegeid: state?.collegeId,
    collegename: state?.collegebasic?.collegename,
    coursename: state?.course?.coursename,
    specialization: state?.course?.specialization,
    modeofcourse: '',
    fullname: user?.fullname,
    email: user?.email,
    phone: user?.phone,
    gender: user?.gender,
    city: user?.city,
    state: user?.state,
    password: ''
  })

  // handle onchange
  const handlechnages = (e) => {
    const { name, value } = e.target
    setapplication(data => {
      const updated = { ...data, [name]: value };
      if (name === "password") {
        const hasLetter = /[A-Za-z]/.test(updated.password);
        const hasNumber = /[0-9]/.test(updated.password);
        const isshort = updated.password.length < 10;
        setIsValid(hasLetter && hasNumber && !isshort);
      }
      return updated;
    });
  }

  const sumbit_application = async (e) => {
    e.preventDefault()
    if (!status) return;
    const validdata = { ...application }
    if (token) {
      delete validdata.password;
    }
    const isempty = Object.values(validdata).some(val => val === null || val === undefined || val === '')
    if (isempty) return alert('Fill up all information')
    try {
      setstatus(false)
      const res = await axios.post(`${URL}/singupandcreateapplication`, { application, user })
      window.localStorage.setItem('appSessionauthToken', JSON.stringify(res?.data?.token))
      setTimeout(() => {
        Navigate('/home')
      }, 2000)
    } catch (err) {
      setstatus(true)
      if (err?.response?.status === 409 || err?.response?.status === 400 || err?.response?.status === 404 || err?.response?.status === 500) {
        alert(err?.response?.data?.message)
      }
    }
  }

  return (
    <div className='user-register-page'>
      <div className='u-r-m-p'>

        <div style={{ width: '100%' }}>
          {/* header */}
          <div className='r-header'>
            <h3>Apply to College</h3>
            <button onClick={() => Navigate(-1)}><ClearRoundedIcon /></button>
          </div>

          {/* form */}
          <div className='registration-form' style={{ marginTop: '15px' }}>
            <form onSubmit={sumbit_application}>

              {/* name and email */}
              <div className='address'>
                <label>College Name</label>
                <input type="text" name='collegename' id='' value={application?.collegename} disabled />
              </div>

              <div className='d-sec'>
                <div>
                  <label>Course</label>
                  <input type="text" name="coursename" id="" value={application?.coursename} onChange={!iscourselocked ? handlechnages : undefined} placeholder='Course Name' />
                </div>
                <div>
                  <label>Specialization</label>
                  <input type="text" name="specialization" id="" value={application?.specialization} onChange={!isspecializationloccked ? handlechnages : undefined} placeholder='Specialization' />
                </div>
              </div>

              <div className='address'>
                <label>Mode of Course</label>
                <select name='modeofcourse' onChange={handlechnages}>
                  <option value="">Select</option>
                  <option value="Online">Online</option>
                  <option value="Distance">Distance</option>
                  <option value="Regular/Full-Time">Regular/Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Deemed">Deemed</option>
                </select>
              </div>

              <div className='d-sec'>
                <div>
                  <label>Full Name</label>
                  <input type="text" name="fullname" id="" value={application?.fullname} onChange={!token ? handlechnages : undefined} placeholder='Full Name' />
                </div>
                <div>
                  <label>Phone</label>
                  <input type="tel" name="phone" id="" maxLength={10} value={application?.phone} onChange={!token ? handlechnages : undefined} placeholder='Phone' />
                </div>
              </div>

              <div className='d-sec'>
                <div>
                  <label>Email</label>
                  <input type="email" name='email' id='' value={application?.email} onChange={!token ? handlechnages : undefined} placeholder='email' />
                </div>
                <div>
                  <label>Gender</label>
                  <select name='gender' onChange={handlechnages}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className='d-sec'>
                <div>
                  <label>City</label>
                  <input type="text" name="city" id="" value={application?.city} onChange={handlechnages} placeholder='City' />
                </div>
                <div>
                  <label>State</label>
                  <input type="text" name="state" id="" value={application?.state} onChange={handlechnages} placeholder='State' />
                </div>
              </div>

              {!token && (
                <div className='address'>
                  <label>Set Your Password</label>
                  <input type="text" name='password' id='' value={application?.password} onChange={!token ? handlechnages : undefined} placeholder='At least 10 characters, including letters and numbers' />
                </div>
              )}

              <div className='already-acc'>
                <button type='submit'
                  style={{
                    cursor: status ? 'pointer' : 'not-allowed'
                  }}>{!status ? <LoadingOutlined style={{ fontSize: 15, color: "white" }} Spin /> : ''} <span>Submit Application</span></button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreateApplication
