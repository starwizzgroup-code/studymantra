import React from 'react'
import CounselorCallRequest from './CounselorCallRequestForm'

const CounselorOverviewProfile = ({Profile, counselorId}) => {
  return (
    <div className='counseloroverview-profile'>
      <div className='profile-pic-content'>
        <img src={Profile?.profile} alt="" />
        <div className='profile-content'>
            <h3>{Profile?.fullname}</h3>
            <div>
                <span>{Profile?.qualification}</span>
                <span>{Profile?.experience} years of experience</span>
            </div>
        </div>
      </div>
      <p id='counselor-about'>{Profile?.about}</p>

      <CounselorCallRequest counselorId={counselorId}/>
    </div>
  )
}

export default CounselorOverviewProfile
