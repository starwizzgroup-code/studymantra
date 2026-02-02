import React, { useContext, useState } from 'react'
import person from '../../Image/person.jpg'
import CounselorBankDetails from './CounselorBankDetails'
import CounselorAddress from './CounselorAddress'
import axios from 'axios'
import { AuthContext } from '../../App'
import DepartmentKeyRoles from './DepartmentKeyRoles'
import { useAsyncError } from 'react-router-dom'

const AddCounselor = () => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [callonce, setcallonce] = useState(true)

    const [counselordata, setcounselordata] = useState({
        profile: '',
        fullname: '',
        gender: '',
        dob: '',
        email: '',
        phone: '',
        workplace: '',
        workstatus: '',
        reportingmanager: '',
        department: '',
        jobposition: '',
        qualification: '',
        experience: '',
        worktype: '',
        maritalstatus: '',
        about: '',
        paddress: '',
        pcity: '',
        pstate: '',
        ppincode: '',
        caddress: '',
        ccity: '',
        cstate: '',
        cpincode: '',
        nation: '',
        religion: '',
        citizenindentification: '',
        holdername: '',
        bankname: '',
        accNumber: '',
        ifscCode: '',
        branchaddress: '',
        upiId: '',
        panCard: '',
        linkdInprofile: '',
        password: ''
    })

    const handlechange = (e) => {
        const { name, value } = e.target
        setcounselordata(data => ({ ...data, [name]: value }))
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const fileurl = reader.result
            setcounselordata(prev => ({ ...prev, profile: fileurl }))
        };
        reader.readAsDataURL(file);
    };

    const add_counselor = async (e) => {
        e.preventDefault()
        if(!callonce) return;
        const validdata = { ...counselordata }
        const isempty = Object.values(counselordata).some(val => val === undefined || val === '' || val === null)
        if (isempty) return alert('Fill up all information')
        try {
    setcallonce(false)
            const res = await axios.post(`${URL}/addnewcounselor`, { counselordata }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setcallonce(true)
            if (err.response.status === 500 || err.response.status === 403 || err.response.status === 409 || err.response.status === 400) {
                alert(err?.response?.data?.message)
            }
        }
    }


    return (
        <div className='addnew-counselor-sec' >
            <form onSubmit={add_counselor}>
                <div className='wrapper-counselor-sec'>

                    <div className='c-image-sec'>
                        <img src={counselordata?.profile ? counselordata?.profile : person} alt="" />
                        <div>
                            <label for="file">Upload</label>
                            <input type="file" name="file" id="file" onChange={handleFileChange} style={{ display: 'none' }} />
                        </div>
                    </div>
                    <div className='c-info-sec'>

                        <div className='inp-field'>
                            <label>Full Name</label>
                            <input type="text" name="fullname" id="" onChange={handlechange} placeholder='Full Name' />
                        </div>
                        <div className='inp-field'>
                            <label>Date of Birth</label>
                            <input type="date" name="dob" id="" onChange={handlechange} placeholder='' />
                        </div>
                        <div className='inp-field'>
                            <label>Email</label>
                            <input type="email" name="email" id="" onChange={handlechange} placeholder='Email' />
                        </div>
                        <div className='inp-field'>
                            <label>Phone</label>
                            <input type="tel" name="phone" id="" maxLength={10} onChange={handlechange} placeholder='Phone' />
                        </div>
                        <div className='inp-field'>
                            <label>Gender</label>
                            <select name='gender' onChange={handlechange}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='inp-field'>
                            <label>Work Place</label>
                            <select name='workplace' onChange={handlechange}>
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
                            <select name='workstatus' onChange={handlechange}>
                                <option value="">Select</option>
                                <option value="Workign">Working</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Maternity Leave">Maternity Leave</option>
                            </select>
                        </div>
                        <div className='inp-field'>
                            <label>Department</label>
                            <select name='department' onChange={handlechange}>
                                <option value="">Select Department</option>
                                <option value="Management & Leadership Department">Management & Leadership Department</option>
                                <option value="Sales & Business Development Department">Sales & Business Development Department</option>
                                <option value="Telesales & Admission Counselling Department">Telesales & Admission Counselling Department</option>
                                <option value="Admission Backend & Operations Department">Admission Backend & Operations Department</option>
                                <option value="Training, Quality & Compliance Department">Training, Quality & Compliance Department</option>
                                <option value="CRM, IT & Technology Department">CRM, IT & Technology Department</option>
                                <option value="Finance, Accounts & Payout Department">Finance, Accounts & Payout Department</option>
                                <option value="Human Resources (HR) Department">Human Resources (HR) Department</option>
                                <option value="Marketing, Branding & Communication Department">Marketing, Branding & Communication Department</option>
                                <option value="Legal, Documentation & Compliance Department">Legal, Documentation & Compliance Department</option>
                            </select>
                        </div>
                        <div className='inp-field'>
                            <DepartmentKeyRoles handlechange={handlechange} departmentval={counselordata?.department} />
                        </div>
                        <div className='inp-field'>
                            <label>Reporting Manager</label>
                            <select name='reportingmanager' onChange={handlechange}>
                                <option value="">Select</option>
                                <option value="Michael Anderson">Michael Anderson</option>
                                <option value="Emily Carter">Emily Carter</option>
                                <option value="James Wilson">James Wilson</option>
                            </select>
                        </div>
                        <div className='inp-field'>
                            <label>Qualification</label>
                            <input type="text" name="qualification" id="" onChange={handlechange} placeholder='Qualification' />
                        </div>
                        <div className='inp-field'>
                            <label>Experience</label>
                            <input type="text" name="experience" id="" onChange={handlechange} placeholder='Experience' />
                        </div>
                        <div className='inp-field'>
                            <label>Work type</label>
                            <select name='worktype' onChange={handlechange}>
                                <option value="">Select</option>
                                <option value="Commission Base">Commission Base</option>
                                <option value="Sallery Base">Sallery Base</option>
                            </select>
                        </div>
                        <div className='inp-field'>
                            <label>Marital Status</label>
                            <select name='maritalstatus' onChange={handlechange}>
                                <option value="">Select</option>
                                <option value="Married">Married</option>
                                <option value="Single">Single</option>
                                <option value="Divorced">Divorce</option>
                            </select>
                        </div>
                        <div className='inp-field'>
                            <label>Nation</label>
                            <input type="text" name="nation" id="" onChange={handlechange} placeholder='Nation' />
                        </div>
                        <div className='inp-field'>
                            <label>Religion</label>
                            <input type="text" name="religion" id="" onChange={handlechange} placeholder='Religion' />
                        </div>
                        <div className='inp-field'>
                            <label>Citizen Identification</label>
                            <input type="number" name="citizenindentification" id="" maxLength={12} onChange={handlechange} placeholder='xxxx xxxx xxxx' />
                        </div>
                        <div className='inp-field'>
                            <label>LinkdIn Profile <span>(optional)</span></label>
                            <input type="text" name="linkdInprofile" id="" onChange={handlechange} placeholder='https://xyzprofile.com' />
                        </div>
                        <div className='inp-field full-password'>
                            <label>Password <span>(Create an strong password)</span></label>
                            <input type="text" name="password" id="" onChange={handlechange} placeholder='Strong password' />
                        </div>

                    </div>
                </div>

                <div className='warpper-counselor-full-sec'>
                    <textarea rows="4" name='about' placeholder='About' onChange={handlechange}></textarea>
                    <CounselorAddress handlechange={handlechange} />
                    <CounselorBankDetails handlechange={handlechange} />

                    <button type='submit' id='add-counselor-btn' style={{cursor:callonce?'pointer':'not-allowed'}}>Add</button>

                </div>

            </form>
        </div>
    )
}

export default AddCounselor
