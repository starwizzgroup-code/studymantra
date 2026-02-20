import React, { useContext, useEffect, useState } from 'react'
import '../../Styles/AdminDashboard.css'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import person from '../../Image/person.jpg'
import { AuthContext } from '../../App'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AdminProfile = () => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [shownav, setshownav] = useState(false)
    const [paneldata, setpaneldata] = useState()

    useEffect(() => {
        const get_summary_data = async () => {
            try {
                const res = await axios.post(`${URL}/adminpaneldata`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setpaneldata(res?.data)
            } catch (err) {
                if (err?.response?.status === 400 || err?.response?.status === 403 || err?.response?.status === 500) {
                    alert(err?.response?.data?.message)
                }
            }
        }
        if (token) {
            get_summary_data()
        }
    })

    const Sign_out = () => {
        window.localStorage.clear()
        window.location.reload()
    }

    return (
        <div className='admin-dashboard-page'>
            <div className='child-dashboard'>

                <div className='welcome-sec'>
                    <div>
                        <h3>Admin Dashboard</h3>
                        <p>Welcome back admin</p>
                    </div>
                    <div className='adminnav-sec'>
                        <div className='admin-profile-sec' onClick={() => setshownav(prev => !prev)}>
                            <img src={person} alt="" />
                        </div>
                        {shownav && (
                            <div className='adminnavbar-sec'>
                                <ul>
                                    <li><Link id='link'>Profile</Link></li>
                                    <li><Link to={'/admin/counsellors'} id='link'>Counselor</Link></li>
                                    <li><Link to={'/admin/manageQuetions'} id='link'>Questions</Link></li>
                                    <li><Link to={'/admin/call-requests'} id='link'>Call Request</Link></li>
                                    <li>Notice</li>
                                    <li><Link to={'/admin/settings'} id='link'>Setting</Link></li>
                                    {token && <li><button id='admin-logout' onClick={Sign_out}>SignOut</button></li>}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className='summary-sec'>

                    <div className='warpper-cards-sec'>
                        {/* cards */}
                        <div className='cards-sec'>

                            {/* user */}
                            <div className='cards' style={{ marginBottom: '10px' }}>
                                <Link id='dashoard-link'>
                                    <div className='icon'>
                                        <PersonRoundedIcon fontSize='large' />
                                    </div>
                                    <div className='card-details'>
                                        <p>Total User</p>
                                        <span>{paneldata?.users?.length}</span>
                                    </div>
                                </Link>
                            </div>

                            {/* user */}
                            <div className='cards' style={{ marginBottom: '10px' }}>
                                <Link id='dashoard-link' to={'/admin/college-applications'}>
                                    <div className='icon'>
                                        <ApartmentRoundedIcon fontSize='large' />
                                    </div>
                                    <div className='card-details'>
                                        <p>Total Colleges</p>
                                        <span>{paneldata?.colleges?.length}</span>
                                        <p id='view'>View All</p>
                                    </div>
                                </Link>
                            </div>

                            {/* user */}
                            <div className='cards'>
                                <Link id='dashoard-link' to={'/admin/user-applications'}>
                                    <div className='icon'>
                                        <InsertDriveFileRoundedIcon fontSize='large' />
                                    </div>
                                    <div className='card-details'>
                                        <p>Total Applications</p>
                                        <span>{paneldata?.applications?.length}</span>
                                        <p id='view'>View All</p>
                                    </div>
                                </Link>
                            </div>

                            {/* user */}
                            <div className='cards'>
                                <Link id='dashoard-link' to={'/admin/enquiry'}>
                                    <div className='icon'>
                                        <MailRoundedIcon fontSize='large' />
                                    </div>
                                    <div className='card-details'>
                                        <p>Total Enquiries</p>
                                        <span>{paneldata?.enquiries?.length}</span>
                                        <p id='view'>View All</p>
                                    </div>
                                </Link>
                            </div>

                        </div>

                        {/* big cards */}
                        <div className='big-cards-sec'>

                            <div className='cards big-card' style={{ marginBottom: '10px' }}>
                                <div className='icon'>
                                    <SchoolRoundedIcon fontSize='large' />
                                </div>
                                <div className='card-details'>
                                    <p>Total Courses</p>
                                    <span>{paneldata?.courses?.length}</span>
                                    <p>View and manage user reviews and ratings</p>
                                </div>
                            </div>

                            <div className='cards big-card'>
                                <div className='icon'>
                                    <AutoAwesomeRoundedIcon fontSize='large' />
                                </div>
                                <div className='card-details'>
                                    <p>Reviews</p>
                                    <span>{paneldata?.reviews?.length}</span>
                                    <p>Manage all available courses across colleges</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    {/* application */}
                    <div className='admin-applications'>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default AdminProfile
