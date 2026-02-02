import React, { useState } from 'react'
import CollegeHeader from './CollegeHeader'
import AddNewCourse from './AddNewCourse'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CollegeManageCourse from './CollegeManageCourse';
import { useNavigate } from 'react-router-dom'
import '../../Styles/AdminProfile.css'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';

const ManageCourse = () => {
  const [show, setshow] = useState(false)
  const Navigate = useNavigate()

  return (
    <div className='top-page'>
      <div className='admin-profile'>
        <div className='child-profile'>
          {/* page title */}
          <div id='page-title'>
            <button onClick={() => Navigate(-1)}><KeyboardDoubleArrowLeftRoundedIcon /></button>
            <h1>Manage Courses</h1>
          </div>

          {/* course page */}
          <div className='counselor-page'>
            <h3>Manage Courses</h3>
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
