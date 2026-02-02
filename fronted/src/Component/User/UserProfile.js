import React, { useContext, useState } from 'react'
import '../../Styles/CollegeProfile.css'
import { AuthContext } from '../../App';
import Profile from './Profile';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

    const { user, role, token } = useContext(AuthContext)
    const Navigate = useNavigate()

    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <div id='page-title'>
                        <button onClick={() => Navigate('/home')}><KeyboardDoubleArrowLeftRoundedIcon /></button>
                        <h1>Profile</h1>
                    </div>

                    <div className='user-profile-page'>
                        <Profile users={user} />
                    </div>

                </div>


            </div>
        </div>
    )
}

export default UserProfile
