import React, { useContext, useEffect, useState } from 'react'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import '../../Styles/Explore.css'
import axios from 'axios'
import ProgramList from './ProgramList';
import CourseList from './CourseList';
import CollegeList from './CollegeList';

const Explore = () => {
  const { user, role, token } = useContext(AuthContext)
  const URL = process.env.REACT_APP_SERVER_URL
  const Navigate = useNavigate()
  const [programs, setprograms] = useState([])
  const [courses, setcourses] = useState([])
  const [colleges, setcolleges] = useState([])

  // get all program course university
  useEffect(() => {
    const fetchprogram = async () => {
      try {
        const res = await axios.post(`${URL}/exploreprogram`)
        setprograms(res?.data)
      } catch (err) {
        if (err.response.status === 500) {
          alert(err.response.data.message)
        }
      }
    }
    fetchprogram()
  }, [URL])

  // getCoursesByProgram
  const getCoursesByProgram = async (program) => {
    try {
      const res = await axios.post(`${URL}/getcourseByprogram`, { program })
      setcourses(res.data)
    } catch (err) {
      if (err.response.status === 500) {
        alert(err.response.data.message)
      }
    }
  }

  // get college by course
  const getcollegeBycourse = async (course) => {
    try {
      const res = await axios.post(`${URL}/getcollegBycourse`, { course })
      setcolleges(res?.data)
    } catch (err) {
      if(err.response.status === 500){
        alert(err.response.data.message)
      }
    }
  }

  return (
    <div className='explore-page'>
      <div className='child-explore-page'>

        {/* explore */}
        <div className='explore-panel'>

          <div className='explore-header'>
            <ProgramList programs={programs} getCoursesByProgram={getCoursesByProgram} />
          </div>

          <div className='both-panel'>
            {/* left panel */}
            <div className='explore-left-panel'>
              <CourseList courses={courses} getcollegeBycourse={getcollegeBycourse} />
            </div>

            {/* right panel */}
            <div className='explore-right-panel'>
              <CollegeList colleges={colleges}/>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Explore
