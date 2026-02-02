import React from 'react'
import ChildCollegeApplications from './ChildCollegeApplications'
import '../../Styles/AdminProfile.css'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

const AdminCollegeApplication = () => {
    const Navigate = useNavigate()

    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <div id='page-title'>
                        <h1 id='back' onClick={()=>Navigate('/admin/dashboard"')}>Dashboard</h1>
                        <span><KeyboardArrowRightRoundedIcon /></span>
                        <h1>College Applications</h1>
                    </div>

                    {/* component */}
                    <ChildCollegeApplications />

                </div>
            </div>
        </div >
    )
}

export default AdminCollegeApplication
