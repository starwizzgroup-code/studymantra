import React, { useContext, useState } from 'react'
import '../../Styles/AllLeftPanel.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import logo from '../../Image/studymantra.svg'

const CollegeHeader = () => {
    const { user, role, token } = useContext(AuthContext)
    const [navpopup, setnavpopup] = useState(true)
    // signout
    const sign_out = () => {
        window.sessionStorage.clear()
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    const shownavpopup = () => {
        setnavpopup(prev => !prev)
    }

    return (
        <div className='wrapper-leftpanel'>
            <div className='mini-left-panel'>

                {/* logo navbar sec */}
                <div className='logo-navbar-sec'>

                    {/* logo */}
                    <div className='logo-sec'>
                        <img src={logo} alt="" id='logo'/>
                    </div>
                </div>

                {/* logout */}
                <div className='header-leftside'>
                    <button onClick={shownavpopup} id='showicon'>{!navpopup ? <DensityMediumRoundedIcon fontSize='small' color='black' /> : <ClearRoundedIcon fontSize='small' color='black' />}</button>
                    {/* navbar */}
                    {navpopup && (
                        <div className='nav-and-btns'>
                            {token && (
                                <div className='navbar-sec'>
                                    <ul>
                                        <li><Link to={'/college/profile'} id='link'><span>Profile</span></Link></li>
                                        <li><Link to={'/college/manage-courses'} id='link'><span>Course</span></Link></li>
                                        <li><Link to={'/college/gallery'} id='link'><span>Gallery</span></Link></li>
                                        <li><Link to={'/college/settings'} id='link'><span>Setting</span></Link></li>
                                        {/* <li><span>Notifications</span></li> */}
                                    </ul>
                                </div>
                            )}
                            <div className='header-btns'>
                                <button className='btn' onClick={sign_out}>SignOut</button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default CollegeHeader
