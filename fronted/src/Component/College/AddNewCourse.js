import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'


const AddNewCourse = () => {
  const { user, role, token } = useContext(AuthContext)
  const URL = process.env.REACT_APP_SERVER_URL
  const [status, setstatus] = useState(true)

  const [coursedata, setcoursedata] = useState({
    coursecategory: '',
    modeofcourse: '',
    courselevel: '',
    coursename: '',
    department: '',
    specialization: '',
    duration: '',
    eligibility: '',
    yearlyfee: ''
  })

  // handle chages
  const handlechanges = (e) => {
    const { name, value } = e.target
    setcoursedata(prev => ({ ...prev, [name]: value }))
  }

  const addcourse = async (e) => {
    e.preventDefault()
    if (!status) return;
    const isempty = Object.values(coursedata).some(val => val === "" || val === null || val === undefined)
    if (isempty) return alert('Fill up all information')
    try {
      setstatus(false)
      const res = await axios.post(`${URL}/addcourse`, { coursedata }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } catch (err) {
      setstatus(true)
      if (err.response.status === 500 || err.response.status === 404 || err.response.status === 400) {
        alert(err.response.data.message)
      }
    }
  }

  return (
    <div className='addnewcourse-page'>

      <div className='course-form'>

        <form onSubmit={addcourse}>

          {/* course category and mode */}
          <div className='m-c-sec'>
            <div className='c-sec'>
              <label>Course Category</label>
              <select name="coursecategory" onChange={handlechanges}>
                <option value="">Select</option>
                <option value="Diploma">Diploma</option>
                <option value="Academic Course">Academic course</option>
                <option value="Professional Course">Professional course</option>
                <option value="Vocational Course">Vocational course</option>
                <option value="Skill Development Course">Skill Development course</option>
                <option value="Counselling/Training Programs">Counselling/Training Programs</option>
                <option value="Computer Course">Computer Course</option>
                <option value="Paramedical">Paramedical</option>
              </select>
            </div>
            <div className='c-sec'>
              <label>Mode of Course</label>
              <select name='modeofcourse' onChange={handlechanges}>
                <option value="">Select</option>
                <option value="Online">Online</option>
                <option value="Distance">Distance</option>
                <option value="Regular/Full-Time">Regular/Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Deemed">Deemed</option>
              </select>
            </div>
          </div>

          {/* course level and type */}
          <div className='m-c-sec'>
            <div className='c-sec'>
              <label>Course Level</label>
              <select name='courselevel' onChange={handlechanges}>
                <option value="">Select</option>
                <option value="UG">UG</option>
                <option value="PG">PG</option>
                <option value="Diploma">Diploma</option>
                <option value="Certificate">Certificate</option>
                <option value="Counselling">Counselling</option>
                <option value="Schooling">Schooling</option>
              </select>
            </div>
            {
              coursedata?.courselevel === 'UG' ? <div className='c-sec'>
                <label>UG Courses</label>
                <select name='coursename' onChange={handlechanges}>
                  <option value="">Select</option>
                  <option value="BA">BA</option>
                  <option value="BSc">BSc</option>
                  <option value="BCom">BCom</option>
                  <option value="BTech">BTech</option>
                  <option value="BCA">BCA</option>
                  <option value="BBA">BBA</option>
                </select>
              </div> : coursedata?.courselevel === 'PG' ? <div className='c-sec'>
                <label>PG Courses</label>
                <select name='coursename' onChange={handlechanges}>
                  <option value="">Select</option>
                  <option value="MA">MA</option>
                  <option value="MSc">MSc</option>
                  <option value="MCom">MCom</option>
                  <option value="MTech">MTech</option>
                  <option value="MCA">MCA</option>
                  <option value="MBA">MBA</option>
                </select>
              </div> : coursedata?.courselevel === 'Diploma' ? <div className='c-sec'>
                <label>Diploma Courses</label>
                <select name='coursename' onChange={handlechanges}>
                  <option value="">Select</option>
                  <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                  <option value="Advanced Diploma">Advanced Diploma</option>
                  <option value="PG Diploma">PG Diploma</option>
                </select>
              </div> : coursedata?.courselevel === 'Certificate' ? <div className='c-sec'>
                <label>Certificate Courses</label>
                <select name='coursename' onChange={handlechanges}>
                  <option value="">Select</option>
                  <option value="Short-Term Certificate">Short-Term Certificate</option>
                  <option value="Skill Certificate">Skill Certificate</option>
                  <option value="Professional Certificate">Professional Certificate</option>
                </select>
              </div> : coursedata?.courselevel === 'Schooling' ? <div className='c-sec'>
                <label>Schooling Courses</label>
                <select name='coursename' onChange={handlechanges}>
                  <option value="">Select</option>
                  <option value="Primary(1-5)">Primary(1-5)</option>
                  <option value="Secondary(6-10)">Secondary(6-10)</option>
                  <option value="Senio-Secondary(11-12)">Senio-Secondary(11-12)</option>
                </select>
              </div> : ''
            }
          </div>

          <div className='m-c-sec'>
            <div className='c-sec'>
              <label>Department</label>
              <select name='department' onChange={handlechanges}>
                <option value="">Select</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Techonology">Information Techonology</option>
                <option value="Management">Management</option>
                <option value="Commerce">Commerce</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
                <option value="Medical">Medical</option>
                <option value="Engineering">Engineering</option>
                <option value="Education">Education</option>
                <option value="Law">Law</option>
              </select>
            </div>
            <div className='c-sec'>
              <label>Specialization</label>
              <input type="text" name="specialization" id="" onChange={handlechanges} placeholder='Specialization' />
            </div>
          </div>

          <div className='m-c-sec'>
            <div className='c-sec'>
              <label>Duration</label>
              <input type="number" name="duration" id="" onChange={handlechanges} placeholder='Duration' />
            </div>
            <div className='c-sec'>
              <label>Eligibility</label>
              <input type="text" name="eligibility" id="" onChange={handlechanges} placeholder='Eligibility' />
            </div>
          </div>

          <div className='address'>
              <label>Yearly Fee</label>
              <input type="text" name="yearlyfee" id="" onChange={handlechanges} placeholder='Yearly Fee' />
            </div>

          <button>{status ? 'Add' : 'Wait'}</button>

        </form>

      </div>

    </div>
  )
}

export default AddNewCourse
