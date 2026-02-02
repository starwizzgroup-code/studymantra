import React from 'react'
import UpdatePhone from '../Auth/UpdatePhone'
import UpdateMail from '../Auth/UpdateMail'
import UpdatePassword from '../Auth/UpdatePassword'
import { useNavigate } from 'react-router-dom'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';

const UserSettings = () => {

    const Navigate = useNavigate()

    return (
        <div className='top-page'>

            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <h1 id='page-title'><button onClick={() => Navigate(-1)}><KeyboardDoubleArrowLeftRoundedIcon /></button>Setting</h1>

                    {/* component */}
                    <div style={{width:'600px',marginTop:'15px'}}>
                        <UpdatePhone />
                        <UpdateMail />
                        <UpdatePassword />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default UserSettings
