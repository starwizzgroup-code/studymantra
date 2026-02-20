import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ChildUserApplication from './ChildUserApplication'
import useAuth from '../../Hooks/useAuth';
import { AuthContext } from '../../App';

const AdminUserApplications = () => {
    const {user, role, token} = useContext(AuthContext)
    const Navigate = useNavigate()
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error } = useAuth(`${URL}/userapplication_atdashboard`, token)
    const [userApplications, setuserApplications] = useState([])

    useEffect(() => {
        if (data?.applications) {
            setuserApplications(data?.applications)
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
                        <h1>User Application</h1>
                    </div>

                    {/* component */}
                    <ChildUserApplication userApplications={userApplications} />

                </div>
            </div>
        </div >
    )
}

export default AdminUserApplications
