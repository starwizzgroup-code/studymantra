import React, { useState } from 'react'
import AddNewCourse from './AddNewCourse'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CollegeManageCourse from './CollegeManageCourse';
import { useNavigate } from 'react-router-dom'
import '../../Styles/AdminProfile.css'
import { FaAngleLeft } from "react-icons/fa6";

const ManageCourse = () => {
  const [show, setshow] = useState(false)
  const Navigate = useNavigate()

  return (
    <div className='top-page'>
      <div className='admin-profile'>
        <div className='child-profile'>
          {/* page title */}
          <div id='page-title'>
            <p onClick={() => Navigate(-1)}>Profile</p>
            <span><FaAngleLeft fontSize={14} /></span>
            <h1>Manage Course</h1>
          </div>
          {/* course page */}
          <div className='counselor-page'>
            <h1></h1>
            <button onClick={() => setshow(val => !val)}><AddRoundedIcon /> Add New</button>
          </div>

          {/* component */}
          {show ? <AddNewCourse /> : <CollegeManageCourse />}

        </div>
      </div>

    </div>
  )
}

export default ManageCourse
