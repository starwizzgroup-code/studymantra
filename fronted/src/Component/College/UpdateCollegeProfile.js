import React, { useContext, useEffect, useState } from 'react'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import '../../Styles/CollegeProfile.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../../App'
import ChildCollegeUpdateProfile from './ChildCollegeUpdateProfile';
import { FaAngleLeft } from "react-icons/fa6";

const UpdateCollegeProfile = () => {
    const { user, role, token } = useContext(AuthContext)

    const Location = useLocation()
    const collegedata = Location.state?.user
    const Navigate = useNavigate()
    const [status, setstatus] = useState(true)
    const URL = process.env.REACT_APP_SERVER_URL

    // update college profile
    const [updateprofile, setupdateprofile] = useState(collegedata)

    // handle data
    const handlechanges = (e) => {
        const { name, value } = e.target
        setupdateprofile(prev => ({ ...prev, [name]: value }))
    }

    // updateprofile
    const update_profile = async () => {
        if (!status) return;
        const CollegeValiddata = { ...updateprofile }
        delete CollegeValiddata.logo
        delete CollegeValiddata.publicId
        const isempty = Object.values(CollegeValiddata).some(val => val === undefined || val === null || val === "")
        if (isempty) return alert('Fill  up all informations')
        const isconfirm = window.confirm('Are you sure you want to update profile')
        if (!isconfirm) return;
        try {
            setstatus(false)
            const res = await axios.patch(`${URL}/updateProfile`, { CollegeValiddata }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                Navigate('college/profile')
                window.location.reload()
            }, 2000);
        } catch (err) {
            if (err.response.status === 404 || err.response.status === 403 || err.response.status === 500) {
                alert(err.response.data.message)
                setstatus(true)
            }
        }
    }

    const UpdateProfilePic = async () => {
        try {
            const res = await axios.patch(`${URL}/updateProfilePic`, { updateprofile }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                Navigate('/college/profile')
                window.location.reload()
            }, 2000);
        } catch (err) {
            if (err?.response?.status === 400 || err?.response?.status === 404 || err?.response?.status === 500 || err?.response?.status === 409) {
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
                                <p onClick={() => Navigate(-1)}>Profile</p>
                                <span><FaAngleLeft fontSize={14} /></span>
                                <h1>Edit profile</h1>
                              </div>
                    <div class="app">

                        <ChildCollegeUpdateProfile
                            updateprofile={updateprofile}
                            handlechanges={handlechanges}
                            update_profile={update_profile}
                            status={status}
                            setupdateprofile={setupdateprofile}
                            UpdateProfilePic={UpdateProfilePic}
                            user={user} />

                    </div>

                </div>
            </div>

        </div>
    )
}

export default UpdateCollegeProfile
