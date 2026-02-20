import React, { useContext, useEffect, useState } from 'react'
import ChildCollegeApplications from './ChildCollegeApplications'
import '../../Styles/AdminProfile.css'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import axios from 'axios'
import { AuthContext } from '../../App'
import useAuth from '../../Hooks/useAuth';

const AdminCollegeApplication = () => {
    const { user, role, token} = useContext(AuthContext)
    const Navigate = useNavigate()
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error } = useAuth(`${URL}/collegeapplications`, token)
    const [college_applications, setcollege_applications] = useState([])
    useEffect(() => {
        if (data?.applications) {
            setcollege_applications(data?.applications)
        }
    }, [data])

    if (error) return alert(error)
    if (!data) return <p>Loading</p>

    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <div id='page-title'>
                        <h1 id='back' onClick={() => Navigate('/admin/dashboard"')}>Dashboard</h1>
                        <span><KeyboardArrowRightRoundedIcon /></span>
                        <h1>College Applications</h1>
                    </div>

                    {/* component */}
                    <ChildCollegeApplications college_applications={college_applications} />

                </div>
            </div>
        </div >
    )
}

export default AdminCollegeApplication
