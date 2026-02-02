import React from 'react'
import '../../Styles/AdminSetting.css'
import UpdatePhone from '../Auth/UpdatePhone'
import UpdateMail from '../Auth/UpdateMail'
import UpdatePassword from '../Auth/UpdatePassword'
import { useNavigate } from 'react-router-dom'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';

const Setting = () => {
  const Navigate = useNavigate()

  return (
    <div className='top-page'>

      {/* <CollegeHeader /> */}
      <div className='admin-profile'>
        <div className='child-profile'>
          {/* page title */}
          <div id='page-title'>
            <button onClick={() => Navigate(-1)}><KeyboardDoubleArrowLeftRoundedIcon /></button>
            <h1>Settings</h1>
          </div>

          {/* component */}
          <div className='component-sec' style={{ width: '700px', marginTop: '15px' }}>
            <UpdatePhone />
            <UpdateMail />
            <UpdatePassword />

          </div>
        </div>
      </div>

    </div>
  )
}

export default Setting
