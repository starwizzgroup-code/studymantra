import React, { useContext, useState } from 'react'
import '../../Styles/AllLeftPanel.css'
import { Link, useNavigate } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { AuthContext } from '../../App'
import logo from '../../Image/studymantra.svg'
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const UserHeader = ({ searchpopup, explorepopup }) => {
    const { user, role, token } = useContext(AuthContext)
    const [navpopup, setnavpopup] = useState(true)
    const Navigate = useNavigate()
    const showsearch = () => {
        searchpopup()
    }
    const showexplore = () => {
        explorepopup()
    }
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
                        <img src={logo} alt="" id='logo' />
                    </div>

                </div>

                {/* logout */}
                <div className='header-leftside'>
                    <button onClick={shownavpopup} id='showicon'>{!navpopup ? <DensityMediumRoundedIcon fontSize='small' color='black' /> : <ClearRoundedIcon fontSize='small' color='black' />}</button>
                    {navpopup && (
                        <div className='nav-and-btns'>
                            {token && (
                                <div className='navbar-sec'>
                                    <ul>
                                        <li><Link to={'/home'} id='link'><span>Home</span></Link></li>
                                        <li><Link to={'/home/explore'} id='link'><span>Explore</span></Link></li>
                                        <li><Link to={'/user/profile'} id='link'><span>Profile</span></Link></li>
                                        <li><Link to={'/user/applications'} id='link'><span>Applications</span></Link></li>
                                        <li><Link to={'/user/setting'} id='link'><span>Setting</span></Link></li>
                                    </ul>
                                </div>
                            )}
                            <div className='header-btns'>
                                <button className='btn' onClick={showexplore}>Explore Program</button>
                                <button className='btn' onClick={()=>Navigate('/home/topUniversity')}>Top University</button>
                                {/* <button className='btn'>More</button> */}
                                <button className='search-btn' onClick={showsearch}><SearchRoundedIcon fontSize='small' /> Search</button>
                                {!token ? <button className='btn' onClick={() => Navigate('/user-signup')}>SignIn</button> : <button onClick={sign_out}>SignOut</button>}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default UserHeader
