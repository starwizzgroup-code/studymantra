import React, { useContext, useState } from 'react'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import '../../Styles/CollegeProfile.css'
import { useLocation, useNavigate } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios'
import { AuthContext } from '../../App'
import EditCollegeBoradAuthority from './EditCollegeBoradAuthority';

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

    // handle file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const fileurl = reader.result
            setupdateprofile(prev => ({
                ...prev,
                logo: fileurl
            }))
        };
        reader.readAsDataURL(file);
    };

    // updateprofile
    const update_profile = async () => {
        if (!status) return;
        const isempty = Object.values(updateprofile).some(val => val === undefined || val === null || val === "")
        if (isempty) return alert('Fill  up all informations')
        const isconfirm = window.confirm('Are you sure you want to update profile')
        if (!isconfirm) return;
        try {
            setstatus(false)
            const res = await axios.patch(`${URL}/update_college_profile`, { updateprofile }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                Navigate(-1)
            }, 2000);
        } catch (err) {
            if (err.response.status === 404 || err.response.status === 403 || err.response.status === 500) {
                alert(err.response.data.message)
                setstatus(true)
            }
        }
    }

    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <h3 id='page-title'><button onClick={() => Navigate(-1)}><KeyboardDoubleArrowLeftRoundedIcon /></button>Edit Profile</h3>

                    <div class="app">

                        <div class="main">
                            <div class="headers">
                                <div class="logos">
                                    {
                                        !updateprofile?.logo ? <div>
                                            <label for='file'><AddRoundedIcon /></label>
                                            <input type="file" name="file" id="file" onChange={handleFileChange} style={{ display: 'none' }} />
                                        </div> :
                                            <img src={updateprofile?.logo} alt="" />
                                    }
                                </div>

                                <div class="title">
                                    <h2 style={{ marginBottom: '5px' }}>{user?.collegename}</h2>
                                    <span class="badge">{updateprofile?.Status}</span>
                                </div>
                            </div>

                            <div class="card">
                                <div class="form-grid">
                                    <div class="field">
                                        <label>College Name</label>
                                        <input type='text' name='collegename' value={updateprofile?.collegename} onChange={handlechanges} placeholder='College Name' />
                                    </div>

                                    <div class="field">
                                        <label>Institute Category</label>
                                        <input type='text' name='' value={updateprofile?.institutecategory} disabled />
                                    </div>

                                    <div class="field">
                                        <label>Type</label>
                                        <input type='text' name='' value={updateprofile?.type} disabled />
                                    </div>

                                    <div class="field">
                                        <label>Mode</label>
                                        <input type='text' value={updateprofile?.mode} disabled />
                                    </div>

                                    <div class="field">
                                        <label>Email</label>
                                        <input type='email' name='email' value={updateprofile?.email} placeholder='Enter email' />
                                    </div>

                                    <div class="field">
                                        <label>Phone</label>
                                        <input type='tel' name='phone' maxLength={10} value={updateprofile?.collegephone} onChange={handlechanges} placeholder='Enter 10 digit phone' />
                                    </div>

                                    <div class="field">
                                        <label>Address</label>
                                        <input type='text' name='address' value={updateprofile?.address} onChange={handlechanges} placeholder='Address' />
                                    </div>

                                    <div class="field">
                                        <label>Site url</label>
                                        <input type='text' name='siteurl' value={updateprofile?.siteurl} onChange={handlechanges} placeholder='https://example.com' />
                                    </div>

                                    <div class="field full-height">
                                        <EditCollegeBoradAuthority updateprofile={updateprofile} setupdateprofile={setupdateprofile}/>
                                    </div>

                                    <div class="field-full">
                                        <label>About</label>
                                        <textarea rows={7} name='about' value={updateprofile?.about} onChange={handlechanges}></textarea>
                                    </div>

                                    <div class="field">
                                        <label>Owner Name</label>
                                        <input type='text' name='ownername' value={updateprofile?.ownername} onChange={handlechanges} placeholder='Owner name' />
                                    </div>

                                    <div class="field">
                                        <label>Owner Phone</label>
                                        <input type='tel' name='ownerphone' maxLength={10} value={updateprofile?.phone} placeholder='Owner Phone' />
                                    </div>
                                </div>

                                <div class="actions">
                                    <button class="btn-outline" onClick={() => window.location.reload()}>Discard Changes</button>
                                    <button class="btn-primary" onClick={update_profile} style={{cursor:status?'pointer':'not-allowed'}}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default UpdateCollegeProfile
