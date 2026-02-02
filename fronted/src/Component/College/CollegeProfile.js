import React, { useContext } from 'react'
import CollegeHeader from './CollegeHeader'
import '../../Styles/CollegeProfile.css'
import building from '../../Image/building.jpg'
import { AuthContext } from '../../App'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import { useNavigate } from 'react-router-dom'

const CollegeProfile = () => {
    const { user, role, token } = useContext(AuthContext)
    const Navigate = useNavigate()

    // navigate edit profile
    const editprofile = () => {
        Navigate('/college/profile/editprofile', { state: { user } })
    }


    return (
        <div className='top-page'>

            <CollegeHeader />
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <h1 id='page-title'>Profile</h1>

                    <div className='wrapper-college-profile-sec'>

                        <div className='c-basic-details' style={{ display: 'flex' }}>
                            {/* logo */}
                            <div className='college-logo-sec'>
                                <img src={building} alt="" />
                            </div>
                            <div className='basic-info' style={{ marginLeft: '20px' }}>
                                <h1>{user?.collegename}</h1>
                                <div className='board-details'>
                                    <div>
                                        <p>Category</p>
                                        <span>{user?.institutecategory}</span>
                                    </div>
                                    <div>
                                        <p>Type</p>
                                        <span>{user?.type}</span>
                                    </div>
                                    <div>
                                        <p>Mode</p>
                                        <span>{user?.mode}</span>
                                    </div>
                                </div>
                                <div id='allboard'>
                                    {user?.boardauthority.length > 0 && (
                                        user?.boardauthority.map((board, index) => {
                                            return (
                                                <div id='board-name'>
                                                    <p>{board}</p>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                                <div className='board-details'>
                                    <div>
                                        <p>Email</p>
                                        <span><MailOutlineRoundedIcon fontSize='extrasmall' />{user?.email}</span>
                                    </div>
                                    <div>
                                        <p>Phone</p>
                                        <span><LocalPhoneRoundedIcon fontSize='extrasmall' />{user?.phone}</span>
                                    </div>
                                    <div>
                                        <p>Address</p>
                                        <span><LocationOnRoundedIcon fontSize='extrasmall' />{user?.address}</span>
                                    </div>
                                    <div>
                                        <p>Site Url</p>
                                        <span><InsertLinkRoundedIcon fontSize='extrasmall' />{user?.siteurl ? user?.siteurl : 'Not provided'}</span>
                                    </div>
                                    <div>
                                        <p>Review</p>
                                        <span>100</span>
                                    </div>
                                </div>
                                <button onClick={editprofile}>Edit Profile</button>
                            </div>
                        </div>
                        {/* about */}
                        <div className='college-about'>
                            <h3>About College</h3>
                            <p>{user?.about}</p>
                        </div>


                    </div>

                </div>
            </div>

        </div>
    )
}

export default CollegeProfile
