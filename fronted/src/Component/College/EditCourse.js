import React, { useContext, useEffect, useInsertionEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CollegeHeader from './CollegeHeader'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import '../../Styles/ManageCourse.css'
import { AuthContext } from '../../App';
import axios from 'axios'

const EditCourse = () => {
  const { user, role, token } = useContext(AuthContext)
  const URL = process.env.REACT_APP_SERVER_URL
  const Navigate = useNavigate()
  const location = useLocation()
  const coursedata = location.state?.course
  const [status, setstatus] = useState(true)

  // course data
  const [updatecourse, setupdatecourse] = useState(coursedata)

  // handle onchange
  const handlechnages = (e) => {
    const { name, value } = e.target
    console.log(value, name)
    setupdatecourse(data => ({ ...data, [name]: value }))
  }

  // update course
  const update_course = async (e) => {
    e.preventDefault()
    if (!status) return;
    const isempty = Object.values(updatecourse).some(val => val === null || val === undefined || val === '')
    if (isempty) return alert('Fill up all information')
    try {
      setstatus(false)
      const res = await axios.patch(`${URL}/updatecourse`, { updatecourse }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTimeout(() => {
        Navigate(-1)
      }, 2000);
    } catch (err) {
      if (err.response.status === 404 || err.response.status === 400 || err.response.status === 500) {
        alert(err.response.data.message)
      }
      setstatus(true)
    }
  }

  return (
    <div className='top-page'>
      <div className='admin-profile'>
        <div className='child-profile'>
          {/* page title */}
          <h3 id='page-title'><button onClick={() => Navigate(-1)}><KeyboardDoubleArrowLeftRoundedIcon /></button>Edit Course</h3>

          {/* edit course */}
          <div className='edit-course-page'>
            <p>Only Course fee, Mode, Eligibility can be edit</p>

            <form onSubmit={update_course}>

              <div className='edit-course'>
                <div className='e-course-sec'>
                  <label>Category</label>
                  <input type="text" name="category" id="" value={updatecourse?.coursecategory} placeholder='Category' />
                </div>
                <div className='e-course-sec'>
                  <label>Mode of Course</label>
                  <select name='modeofcourse' value={updatecourse?.modeofcourse} onChange={handlechnages}>
                    <option value="Online">Online</option>
                    <option value="Distance">Distance</option>
                    <option value="Regular/Full-Time">Regular/Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className='e-course-sec'>
                  <label>Level</label>
                  <input type="text" name="level" id="" value={updatecourse?.courselevel} placeholder='Level' />
                </div>
              </div>

              <div className='edit-course'>
                <div className='e-course-sec'>
                  <label>Department</label>
                  <input type="text" name="category" id="" value={updatecourse?.department} placeholder='Category' />
                </div>
                <div className='e-course-sec'>
                  <label>Duration</label>
                  <input type="text" name="mode" id="" value={updatecourse?.duration} placeholder='Mode of course' />
                </div>
                <div className='e-course-sec'>
                  <label>Eligibility</label>
                  <input type="text" name="eligibility" id="" value={updatecourse?.eligibility} onChange={handlechnages} placeholder='Level' />
                </div>
              </div>
              <div className='edit-course-fee' style={{ marginBottom: '10px' }}>
                <label>Total Fee</label>
                <input type="number" name="yearlyfee" id="" value={updatecourse?.yearlyfee} onChange={handlechnages} placeholder='Total Fee' />
              </div>

              <button type='submit' style={{ cursor: status ? 'pointer' : 'not-allowed' }}>{status ? 'Update' : 'Wait'}</button>

            </form>

          </div>

        </div>
      </div>

    </div>
  )
}

export default EditCourse
