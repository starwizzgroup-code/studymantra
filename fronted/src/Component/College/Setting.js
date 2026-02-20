import React from 'react'
import '../../Styles/AdminSetting.css'
import UpdatePhone from '../Auth/UpdatePhone'
import UpdateMail from '../Auth/UpdateMail'
import UpdatePassword from '../Auth/UpdatePassword'
import { useNavigate } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa6";

const Setting = () => {
  const Navigate = useNavigate()

  return (
    <div className='top-page'>

      {/* <CollegeHeader /> */}
      <div className='admin-profile'>
        <div className='child-profile'>
          {/* page title */}
          <div id='page-title'>
            <p onClick={() => Navigate(-1)}>Home</p>
            <span><FaAngleLeft fontSize={14} /></span>
            <h1>Setting</h1>
          </div>

          {/* component */}
          <div className='component-sec'>
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
