import React, { useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import '../../Styles/Gallery.css'
import AddGalleryPhoto from './AddGalleryPhoto';
import Managegallery from './Managegallery';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";

const CollegeGallry = () => {

  const [hide, sethide] = useState(true)
  const Navigate = useNavigate()

  return (
    <div className='top-page'>
      <div className='admin-profile'>
        <div className='child-profile'>
          {/* page title */}
          <div id='page-title'>
                      <p onClick={() => Navigate(-1)}>Profile</p>
                      <span><FaAngleLeft fontSize={14} /></span>
                      <h1>Gallery</h1>
                    </div>

          {/* course page */}
          <div className='counselor-page'>
            <h3>Manage Courses</h3>
            <button onClick={() => sethide(prev => !prev)}><AddRoundedIcon /> Add New</button>
          </div>

          {/*component  */}
          {
            !hide ? <AddGalleryPhoto /> : <Managegallery />
          }

        </div>
      </div>

    </div>
  )
}

export default CollegeGallry
