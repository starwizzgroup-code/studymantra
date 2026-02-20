import React, { useContext, useEffect, useState } from 'react'
import useAuth from '../../Hooks/useAuth'
import { AuthContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ChildCallRequests from './ChildCallRequests';

const AdminCallRequest = () => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error } = useAuth(`${URL}/getCallrequest`, token)
    const [callRequest, setcallRequest] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        if (data?.callRequests) {
            setcallRequest(data?.callRequests)
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
                        <h1>Call Requests</h1>
                    </div>

                    {/* component */}
                    <ChildCallRequests callRequest={callRequest}/>

                </div>
            </div>
        </div >
    )
}

export default AdminCallRequest
