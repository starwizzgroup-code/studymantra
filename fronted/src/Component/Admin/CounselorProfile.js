import React, { useState } from 'react'
import CounselorAddress from './CounselorAddress'
import CounselorBankDetails from './CounselorBankDetails'
import person from '../../Image/person.jpg'
import { Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons"

const CounselorProfile = ({ profile, setCounselorPayload, updateCounselor_profile, signIn_counselor }) => {

  const [status, setstatus] = useState(false)
  const [islinksend, setislinksend] = useState(true) //avoid multiple call for send counselor signin link
  const handlechange = (e) => {
    const { name, value } = e.target
    setCounselorPayload(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: value
      }
    }))
    setstatus(true)
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileurl = reader.result
      setCounselorPayload(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          profile: fileurl
        }
      }))
    };
    reader.readAsDataURL(file);
    setstatus(true)
  };

  const update_profile = (e) => {
    e.preventDefault()
    if (!status) return;
    updateCounselor_profile()
    setstatus(true)
  }


  // send signin link
  const send_signInlink = async () => {
    if (!islinksend) return;
    setislinksend(false)
    signIn_counselor()
  }

  return (
    <div className='addnew-counselor-sec' style={{ padding: '0px', boxShadow: 'none', marginTop: '50px' }}>
      <form onSubmit={update_profile}>
        <div className='wrapper-counselor-sec'>

          <div className='c-image-sec'>
            <img src={profile ? profile?.profile : person} alt="" />
            <div>
              <label for="file">Upload</label>
              <input type="file" name="file" id="file" onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
          </div>
          <div className='c-info-sec'>

            <div className='inp-field'>
              <label>Full Name</label>
              <input type="text" name="fullname" id="" value={profile?.fullname} onChange={handlechange} placeholder='Full Name' />
            </div>
            <div className='inp-field'>
              <label>Date of Birth</label>
              <input type="date" name="dob" id="" onChange={handlechange} value={profile?.dob} placeholder='' />
            </div>
            <div className='inp-field'>
              <label>Email</label>
              <input type="email" name="email" id="" onChange={handlechange} value={profile?.email} placeholder='Email' />
            </div>
            <div className='inp-field'>
              <label>Phone</label>
              <input type="number" name="phone" id="" onChange={handlechange} value={profile?.phone} placeholder='Phone' />
            </div>
            <div className='inp-field'>
              <label>Gender</label>
              <select name='gender' onChange={handlechange} value={profile?.gender}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className='inp-field'>
              <label>Work Place</label>
              <select name='workplace' onChange={handlechange} value={profile?.workplace}>
                <option value="">Select</option>
                <option value="Business Partner">Business Partner</option>
                <option value="Work from Home">Work from Home</option>
                <option value="BIITS Office">BIITS Office</option>
                <option value="Registered Office">Registered Office</option>
                <option value="Corporate Office">Corporate Office</option>
                <option value="Business Partner Office">Business Partner Office</option>
                <option value="Study Mantra Office">Study Mantra Office</option>
                <option value="Carrer 11 Office">Carrer 11 Office</option>
              </select>
            </div>
            <div className='inp-field'>
              <label>Work Status</label>
              <select name='workstatus' onChange={handlechange} value={profile?.workstatus}>
                <option value="">Select</option>
                <option value="Workign">Working</option>
                <option value="Inactive">Inactive</option>
                <option value="Maternity Leave">Maternity Leave</option>
              </select>
            </div>
            <div className='inp-field'>
              <label>Department</label>
              <select name='department' onChange={handlechange} value={profile?.department}>
                <option value="">Select Department</option>
                <option value="Founder / Director">Founder / Director</option>
                <option value="Operations Head">Operations Head</option>
                <option value="Sales & Growth Head">Sales & Growth Head</option>
                <option value="Training & Quality Head">Training & Quality Head</option>
                <option value="CRM & Tech Support">CRM & Tech Support</option>
                <option value="Finance & Payout Team">Finance & Payout Team</option>
              </select>
            </div>
            <div className='inp-field'>
              <label>Job Position</label>
              <select name='jobposition' onChange={handlechange} value={profile?.jobposition}>
                <option value="">Select</option>
                <option value="HR Manager">HR Manager</option>
                <option value="HR Recruiter">HR Recruiter</option>
                <option value="Adminssion Counselor">Adminssion Counselor</option>
              </select>
            </div>
            <div className='inp-field'>
              <label>Reporting Manager</label>
              <select name='reportingmanager' onChange={handlechange} value={profile?.reportingmanager}>
                <option value="">Select</option>
                <option value="Michael Anderson">Michael Anderson</option>
                <option value="Emily Carter">Emily Carter</option>
                <option value="James Wilson">James Wilson</option>
              </select>
            </div>
            <div className='inp-field'>
              <label>Qualification</label>
              <input type="text" name="qualification" id="" onChange={handlechange} value={profile?.qualification} placeholder='Qualification' />
            </div>
            <div className='inp-field'>
              <label>Experience</label>
              <input type="text" name="experience" id="" onChange={handlechange} value={profile?.experience} placeholder='Experience' />
            </div>
            <div className='inp-field'>
              <label>Work type</label>
              <select name='worktype' onChange={handlechange} value={profile?.worktype}>
                <option value="">Select</option>
                <option value="Commission Base">Commission Base</option>
                <option value="Sallery Base">Sallery Base</option>
              </select>
            </div>
            <div className='inp-field'>
              <label>Marital Status</label>
              <select name='maritalstatus' onChange={handlechange} value={profile?.maritalstatus}>
                <option value="">Select</option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
                <option value="Divorced">Divorce</option>
              </select>
            </div>
            <div className='inp-field'>
              <label>Nation</label>
              <input type="text" name="nation" id="" onChange={handlechange} value={profile?.nation} placeholder='Nation' />
            </div>
            <div className='inp-field'>
              <label>Religion</label>
              <input type="text" name="religion" id="" onChange={handlechange} value={profile?.religion} placeholder='Religion' />
            </div>
            <div className='inp-field'>
              <label>Citizen Identification</label>
              <input type="number" name="citizenindentification" id="" onChange={handlechange} value={profile?.citizenidentification} placeholder='xxxx xxxx xxxx' />
            </div>
            <div className='inp-field'>
              <label>LinkdIn Profile <span>(optional)</span></label>
              <input type="text" name="linkdInprofile" id="" onChange={handlechange} value={profile?.linkdInprofile} placeholder='https://xyzprofile.com' />
            </div>

          </div>
        </div>

        <div className='warpper-counselor-full-sec'>
          <textarea rows="4" name='about' placeholder='About' value={profile?.about}></textarea>
          <CounselorAddress handlechange={handlechange} profile={profile} />
          <CounselorBankDetails handlechange={handlechange} profile={profile} />

          <div className='update-discard-btn'>
            <button onClick={() => { window.location.reload() }}>Discard</button>
            <button type='submit' style={{ cursor: status ? 'pointer' : 'not-allowed' }}>Update Changes</button>
            <button onClick={send_signInlink} style={{ cursor: islinksend ? 'pointer' : 'not-allowed' }}>
              {!islinksend ? <LoadingOutlined style={{ fontSize: 15, color: "black" }} Spin /> : ''} Send SignIn Link
            </button>
          </div>

        </div>

      </form >
    </div >
  )
}

export default CounselorProfile
