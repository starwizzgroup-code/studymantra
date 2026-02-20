import React from 'react'
import EditCollegeBoradAuthority from './EditCollegeBoradAuthority';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import building from '../../Image/building.jpg'

const ChildCollegeUpdateProfile = ({ updateprofile, handlechanges, setupdateprofile, update_profile, status, user, UpdateProfilePic}) => {
    // handle file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const fileurl = reader.result
            setupdateprofile(prev => ({
                ...prev,
                profile: fileurl
            }))
        };
        reader.readAsDataURL(file);
    };

    return (
        <div class="main">
            <div class="headers" style={{ display: 'flex' }}>
                <div class="logos">
                    <img src={updateprofile?.profile ? updateprofile?.profile : building} alt="" />
                    <div>
                        <label for='file'><AddRoundedIcon /></label>
                        <input type="file" name="file" id="file" onChange={handleFileChange} style={{ display: 'none' }} />
                    </div>
                    <button onClick={UpdateProfilePic}>Change</button>
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
                        <EditCollegeBoradAuthority updateprofile={updateprofile} setupdateprofile={setupdateprofile} />
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
                    <button class="btn-primary" onClick={update_profile} style={{ cursor: status ? 'pointer' : 'not-allowed' }}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default ChildCollegeUpdateProfile
