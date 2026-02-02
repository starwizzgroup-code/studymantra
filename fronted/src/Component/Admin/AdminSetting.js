import React from 'react'
import '../../Styles/AdminSetting.css'
import UpdateName from '../Auth/UpdateName'
import UpdatePhone from '../Auth/UpdatePhone'
import UpdateMail from '../Auth/UpdateMail'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import { useNavigate } from 'react-router-dom'

const AdminSetting = () => {
    const Navigate = useNavigate()

    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <div id='page-title'>
                        <button onClick={() => Navigate(-1)}><KeyboardDoubleArrowLeftRoundedIcon /></button>
                        <h1>Settings</h1>
                    </div>

                    {/* component */}
                    <div className='component'>
                        <UpdateName />
                        <UpdatePhone />
                        <UpdateMail />
                    </div>


                </div>
            </div>

        </div>
    )
}

export default AdminSetting
