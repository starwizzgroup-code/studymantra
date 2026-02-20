import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CounselorPermission from './CounselorPermission'
import CounselorProfile from './CounselorProfile'
import '../../Styles/AdminProfile.css'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

const CounselorView_UpdateProfile = () => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const { _id } = useParams()
    const Navigate = useNavigate()

    const [counselorPayload, setCounselorPayload] = useState({
        counselorId: _id,
        profile: {},
        permissions: {}
    });

    useEffect(() => {
        const fetch_counselordata = async () => {
            try {
                const res = await axios.post(`${URL}/getcounselordata/${_id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setCounselorPayload(data => ({
                    ...data,
                    profile: res?.data?.counselor,
                    permissions: res?.data?.permission
                }))
            } catch (err) {
                if (err?.response?.status === 400 || err?.response?.status === 404 || err?.response?.status === 403 || err?.response?.status === 500) {
                    alert(err?.response?.data?.message)
                }
            }
        }
        if (token) {
            fetch_counselordata()
        }
    }, [token, URL, _id])

    const updateCounselor_profile = async () => {
        try {
            const res = await axios.patch(`${URL}/update_counselor_profile`, { counselorPayload }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            if (err?.response?.status === 400 || err?.response?.status === 403 || err?.response?.status === 409 || err?.response?.status === 500) {
                alert(err?.response?.data?.message)
            }
        }
    }

    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <div id='page-title'>
                        <h1 id='back' onClick={() => Navigate(-1)}>Counselor</h1>
                        <span><KeyboardArrowRightRoundedIcon /></span>
                        <h1>{counselorPayload?.profile?.fullname}</h1>
                    </div>

                    {/* component */}
                    <CounselorPermission permission={counselorPayload?.permissions} setCounselorPayload={setCounselorPayload} />
                    <CounselorProfile profile={counselorPayload?.profile} setCounselorPayload={setCounselorPayload} updateCounselor_profile={updateCounselor_profile}/>

                </div>
            </div>
        </div >
    )
}

export default CounselorView_UpdateProfile

