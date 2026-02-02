import React, { useState } from 'react'
import '../../Styles/UserRegister.css'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { LoadingOutlined } from "@ant-design/icons";

const CollegeRegister = () => {

    const Navigate = useNavigate()
    // college register data
    const [collegeRegisterData, setCollegeRegisterData] = useState({
        institutecategory: '',
        type: '',
        boardauthority: '',
        mode: '',
        collegename: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        ownername: '',
        ownerphone: ''
    })
    const [isvalid, setisvalid] = useState()
    const [callonce, setcallonce] = useState(true)

    // handlechange
    const handlechange = (e) => {
        const { name, value } = e.target;

        setCollegeRegisterData(data => {
            const updated = { ...data, [name]: value };
            // run password check ONLY when user types password
            if (name === "password") {
                const hasLetter = /[A-Za-z]/.test(updated.password);
                const hasNumber = /[0-9]/.test(updated.password);
                const isshort = updated.password.length < 10;
                setisvalid(hasLetter && hasNumber && !isshort);
            }
            return updated;
        });
    };



    // register college
    const registercollege = async (e) => {
        e.preventDefault()
        if (!callonce) return;
        const isempty = Object.values(collegeRegisterData).some(val => val === "" || val === null || val === undefined)
        if (isempty) return alert('Fill up all information')
        if (!isvalid) return alert('Password must include a letter, number, and be 10+ characters long')
        try {
            setcallonce(false)
            const res = await axios.post('http://localhost:8000/college_register', { collegeRegisterData })
            window.sessionStorage.setItem('appSessionauthToken', JSON.stringify(res.data.token))
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setcallonce(true)
            if (err?.response?.status === 400 || err?.response?.status === 500 || err?.response?.status === 401) {
                alert(err.response.data.message)
            }
        }
    }

    return (
        <div className='user-register-page'>
            <div className='u-r-m-p'>

                {/* header */}
                <div className='r-header'>
                    <h3>College Registration</h3>
                    <button onClick={()=>{Navigate(-1)}}><ClearRoundedIcon /></button>
                </div>

                {/* form */}
                <div className='registration-form' style={{ marginTop: '15px' }}>
                    <form onSubmit={registercollege}>

                        {/* qualication and looking for */}
                        <div className='d-sec'>
                            <div>
                                <label>Institute Category</label>
                                <select name='institutecategory' onChange={handlechange}>
                                    <option value="">Select</option>
                                    <option value="University" key="">University</option>
                                    <option value="College" key="">College</option>
                                    <option value="Institute" key="">Institute</option>
                                    <option value="School/Board" key="">School/Board</option>
                                </select>
                            </div>
                            <div>
                                {
                                    collegeRegisterData?.institutecategory === 'School/Board' ?
                                        <div style={{ width: '100%' }}>
                                            <label>Choose School</label>
                                            <select name='type' onChange={handlechange}>
                                                <option value="">Select</option>
                                                <option value="Government">Government</option>
                                                <option value="Private">Private</option>
                                            </select>
                                        </div> :
                                        collegeRegisterData?.institutecategory === 'Institute' ?
                                            <div style={{ width: '100%' }}>
                                                <label> Choose Institute</label>
                                                <select name='type' onChange={handlechange}>
                                                    <option value="">Select</option>
                                                    <option value="Engineering Institute">Engineering Institute</option>
                                                    <option value="Medical Institute">Medical Institute</option>
                                                    <option value="IT/Computer Institute">IT/Computer Institute</option>
                                                    <option value="Polytechnic Institute">Polytechnic Institute</option>
                                                    <option value="Teacher Training Institute">Teacher Training Institute</option>
                                                </select>
                                            </div> :
                                            collegeRegisterData?.institutecategory === 'College' ?
                                                <div style={{ width: '100%' }}>
                                                    <label>Choose College</label>
                                                    <select name='type' onChange={handlechange}>
                                                        <option value="">Select</option>
                                                        <option value="Government College">Government College</option>
                                                        <option value="Private College">Private College</option>
                                                        <option value="Autonomous College">Autonomous College</option>
                                                        <option value="Affiliated College">Affiliated College</option>
                                                    </select>
                                                </div> :
                                                collegeRegisterData?.institutecategory === 'University' ?
                                                    <div style={{ width: '100%' }}>
                                                        {/* for university */}
                                                        <label>Choose University</label>
                                                        <select name='type' onChange={handlechange}>
                                                            <option value="">Select</option>
                                                            <option value="Central University">Central University</option>
                                                            <option value="State University">State University</option>
                                                            <option value="Private University">Private University</option>
                                                            <option value="Open University">Open University</option>
                                                            <option value="Deemed University">Deemed University</option>
                                                        </select>
                                                    </div> : ''
                                }

                            </div>
                        </div>

                        {/* qualication and looking for */}
                        <div className='d-sec'>
                            <div>
                                <label>Board/Authority</label>
                                <select name='boardauthority' onChange={handlechange}>
                                    <option value="">Select</option>
                                    <option value="UGC">UGC</option>
                                    <option value="AI/CTE">AI/CTE</option>
                                    <option value="PCI">PCI</option>
                                    <option value="NMC">NMC</option>
                                    <option value="BCI">BCI</option>
                                    <option value="NCTE">NCTE</option>
                                    <option value="State Education Board">State Education Board</option>
                                    <option value="CBSE">CBSE</option>
                                    <option value="ICSE">ICSE</option>
                                </select>
                            </div>
                            <div>
                                <label>Mode of Institute</label>
                                <select name='mode' onChange={handlechange}>
                                    <option value="">Select</option>
                                    <option value="Online">Online</option>
                                    <option value="Distance">Distance</option>
                                    <option value="Regular/Full-Time">Regular/Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>

                        <div className='address'>
                            <label>College/Institute Name</label>
                            <input type="text" name="collegename" onChange={handlechange} id="" placeholder='College/Institute Name' />
                        </div>

                        {/* qualication and looking for */}
                        <div className='d-sec'>
                            <div>
                                <label>Email</label>
                                <input type="Email" name='email' onChange={handlechange} id='' placeholder='Email' />
                            </div>
                            <div>
                                <label>Phone</label>
                                <input type="tel" name='phone' maxLength={10} onChange={handlechange} id='' placeholder='Phone' />
                            </div>
                        </div>

                        <div className='address'>
                            <label>Address (Correct Address)</label>
                            <input type="text" name="address" onChange={handlechange} id="" placeholder='Address' />
                        </div>

                        <div style={{ width: '100%', marginTop: '20px' }}>
                            <h3>Contact Person</h3>
                            {/* owner details */}
                            <div className='d-sec' style={{ marginTop: '10px' }}>
                                <div>
                                    <label>Full Name</label>
                                    <input type="text" name='ownername' onChange={handlechange} id='' placeholder='Owner FullName' />
                                </div>
                                <div>
                                    <label>Phone</label>
                                    <input type="tel" name='ownerphone' maxLength={10} onChange={handlechange} id='' placeholder='Owner Phone +91' />
                                </div>
                            </div>
                        </div>

                        <div className='address' style={{ marginBottom: '10px' }}>
                            <label>Password</label>
                            <input type="text" name="password" onChange={handlechange} id="" placeholder='Password must include a letter, number, and be 10+ characters long' />
                        </div>

                        <div className='already-acc'>
                            <p>Already register? <Link to={'/college-signup'} id='auth'><strong>SignIn</strong></Link></p>
                            <p>Register User <Link to={'/user/register'} id='auth'><strong style={{ cursor: 'pointer' }}>Register</strong></Link></p>
                            <button type='submit' style={{cursor:callonce?'pointer':'not-allowed'}}><span>Register</span></button>
                        </div>

                    </form>
                </div>

            </div >
        </div >
    )
}

export default CollegeRegister
