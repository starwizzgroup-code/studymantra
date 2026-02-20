import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ChildUserEnquiry from './ChildUserEnquiry';
import useAuth from '../../Hooks/useAuth';
import { AuthContext } from '../../App';

const AdminUserEnquiry = () => {
    const {user, role, token} = useContext(AuthContext)
    const Navigate = useNavigate()
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error } = useAuth(`${URL}/userenquiry_Atdashboard`, token)
    const [enquiry, setenquiry] = useState([])
    useEffect(() => {
        if (data?.enquries) {
            setenquiry(data?.enquries)
        }
    }, [data])
    if (error) return alert(error)
    if (!data) return <p>Loading...</p>

    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <div id='page-title'>
                        <h1 id='back' onClick={() => Navigate('/admin/dashboard"')}>Dashboard</h1>
                        <span><KeyboardArrowRightRoundedIcon /></span>
                        <h1>User Enquiry</h1>
                    </div>

                    {/* component */}
                    <ChildUserEnquiry enquiry={enquiry}/>

                </div>
            </div>
        </div >
    )
}

export default AdminUserEnquiry
