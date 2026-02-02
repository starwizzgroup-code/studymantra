import React, { useState } from 'react'
import AddCounselor from './AddCounselor'
import '../../Styles/AdminCounselor.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Counselor from './Counselor';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { useNavigate } from 'react-router-dom';

const AdminMainCounsellor = () => {
    const [isshow, setisshow] = useState(true)
    const Navigate = useNavigate()

    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <div id='page-title'>
                        <h1 id='back' onClick={() => Navigate('/admin/dashboard"')}>Dashboard</h1>
                        <span><KeyboardArrowRightRoundedIcon /></span>
                        <h1>Counselors</h1>
                    </div>

                    {/* all counselor and add new one */}
                    <div className='counselor-page'>
                        <h3>Counselor</h3>
                        <button onClick={() => setisshow(prev => !prev)}><AddRoundedIcon /> Add New</button>
                    </div>

                    {/* component */}
                    {!isshow ? <AddCounselor /> : <Counselor />}

                </div>
            </div>

        </div>
    )
}

export default AdminMainCounsellor
