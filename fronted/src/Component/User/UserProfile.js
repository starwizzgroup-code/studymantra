import React, { useContext, useState } from 'react'
import '../../Styles/CollegeProfile.css'
import { AuthContext } from '../../App';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FaAngleLeft } from "react-icons/fa6";

const UserProfile = () => {

    const { user, role, token } = useContext(AuthContext)
    const Navigate = useNavigate()
    const URL = process.env.REACT_APP_SERVER_URL
    const [status, setstatus] = useState(true)
    const [canupdate, setcanupdate] = useState(false)
    const [userdata, setuserdata] = useState(user ? user : {})

    // handledata
    const handleonchange = (e) => {
        const { name, value } = e.target
        setuserdata(data => ({ ...data, [name]: value }))
        setcanupdate(true)
    }

    const update_profile = async () => {
        if (!status) return;
        const UserValiddata = { ...userdata }
        delete UserValiddata?.profile
        delete UserValiddata?.publicId
        try {
            setstatus(false)
            const res = await axios.patch(`${URL}/updateProfile`, { UserValiddata }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setstatus(true)
            if (err?.response?.status === 400 || err?.response?.status === 403 || err?.response?.status === 500) {
                alert(err?.response?.data?.message)
            }
        }
    }

    const UpdateProfilePic = async () => {

        try {
            const res = await axios.patch(`${URL}/updateProfilePic`, { userdata }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
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
                        <p onClick={() => Navigate(-1)}>Home</p>
                        <span><FaAngleLeft fontSize={14} /></span>
                        <h1>Profile</h1>
                    </div>

                    <div className='user-profile-page'>
                        <Profile
                            userdata={userdata}
                            setuserdata={setuserdata}
                            update_profile={update_profile}
                            UpdateProfilePic={UpdateProfilePic}
                            canupdate={canupdate}
                            status={status}
                            handleonchange={handleonchange} />
                    </div>

                </div>


            </div>
        </div>
    )
}

export default UserProfile
