import React, { useContext, useState } from 'react'
import person from '../../Image/person.jpg'
import axios from 'axios';
import { AuthContext } from '../../App';

const Profile = ({ users }) => {
    const URL = process.env.REACT_APP_SERVER_URL
    const { user, role, token } = useContext(AuthContext)

    const [status, setstatus] = useState(true)
    const [canupdate, setcanupdate] = useState(false)
    const [userdata, setuserdata] = useState(users)


    // handledata
    const handleonchange = (e) => {
        const { name, value } = e.target
        setuserdata(data => ({ ...data, [name]: value }))
        setcanupdate(true)
    }

    // handle image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const url = reader.result
            setuserdata(prev => ({ ...prev, profile: url }))
        };
        reader.readAsDataURL(file);
    };

    const update_profile = async () => {
        if (!status) return;
        try {
            setstatus(false)
            const res = await axios.patch(`${URL}/updateuserprofile`, { userdata }, {
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

    return (
        <div class="app">

            <div class="main" style={{ display: 'flex' }}>
                <div class="headers">
                    <div class="userprofile-img-sec">

                        <div className='userprofile-img'>
                            <img src={userdata?.profile ? userdata?.profile : person} alt="" />
                        </div>
                        <div>
                            <label for='file'>Change</label>
                            <input type="file" name="profile" id="file" onChange={handleImageChange} style={{ display: 'none' }} />
                        </div>
                    </div>
                </div>

                <div class="title">
                    <h2 style={{ marginBottom: '5px' }}>{user?.fullname}</h2>
                </div>
            </div>

            <div class="card">
                <div class="form-grid">
                    <div class="field">
                        <label>Full Name</label>
                        <input type='text' name='fullname' value={userdata?.fullname} onChange={handleonchange} placeholder='Full Name' />
                    </div>

                    <div class="field">
                        <label>Email</label>
                        <input type='text' name='email' id='' value={userdata?.email} placeholder='Email' disabled />
                    </div>

                    <div class="field">
                        <label>Phone</label>
                        <input type='tel' name='phone' maxLength={10} value={userdata?.phone} placeholder='Phone' disabled />
                    </div>

                    <div class="field">
                        <label>DOB</label>
                        <input type='date' name='DOB' id='' value={userdata?.DOB} onChange={handleonchange} placeholder='DOB' />
                    </div>

                    <div class="field">
                        <label>City</label>
                        <input type='text' name='city' id='' value={userdata?.city} onChange={handleonchange} placeholder='City' />
                    </div>

                    <div class="field">
                        <label>State</label>
                        <input type='email' name='state' value={userdata?.state} onChange={handleonchange} placeholder='State' />
                    </div>

                    <div class="field">
                        <label>Gender</label>
                        <select name='gender' onChange={handleonchange}>
                            <option>{userdata?.gender}</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Otherb</option>
                        </select>
                    </div>

                </div>
                <p id='createdat'>CreatedAt: {user?.createdAt.split(' ')[0]}</p>

                {canupdate && (
                    <div class="actions">
                        <button class="btn-outline" onClick={() => window.location.reload()}>Discard Changes</button>
                        <button class="btn-primary" onClick={update_profile} style={{cursor:status?'pointer':'not-allowed'}}>Save Changes</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
