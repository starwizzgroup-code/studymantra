import React from 'react'
import UserHeader from './UserHeader'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import { useNavigate } from 'react-router-dom';
import YourApplication from './YourApplication';
import '../../Styles/ManageCourse.css'
import '../../Styles/AdminProfile.css'

const Application = () => {

  const Navigate = useNavigate()

  return (
    <div className='top-page'>

      {/* <UserHeader /> */}
      <div className='admin-profile'>
        <div className='child-profile'>
          {/* page title */}
          <div id='page-title'>
            <button onClick={() => Navigate(-1)}><KeyboardDoubleArrowLeftRoundedIcon /></button>
            <h1>Your Applications</h1>
          </div>

          {/* component */}
          <YourApplication />

        </div>
      </div>

    </div>
  )
}

export default Application
