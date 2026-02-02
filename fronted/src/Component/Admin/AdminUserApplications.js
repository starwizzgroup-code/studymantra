import React from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ChildUserApplication from './ChildUserApplication'

const AdminUserApplications = () => {
    const Navigate = useNavigate()

    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <div id='page-title'>
                        <h1 id='back' onClick={() => Navigate('/admin/dashboard"')}>Dashboard</h1>
                        <span><KeyboardArrowRightRoundedIcon /></span>
                        <h1>User Applications</h1>
                    </div>

                    {/* component */}
                    <ChildUserApplication/>

                </div>
            </div>
        </div >
    )
}

export default AdminUserApplications
