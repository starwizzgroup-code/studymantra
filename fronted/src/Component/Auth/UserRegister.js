import React, { useState } from 'react'
import '../../Styles/UserRegister.css'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const UserRegister = () => {

    const URL = process.env.REACT_APP_SERVER_URL
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [callonce, setcallonce] = useState(true)
    const Navigate = useNavigate()
    const [userdata, setuserdata] = useState({
        fullname: '',
        email: '',
        DOB: '',
        gender: '',
        qualification: '',
        courselookingfor: '',
        city: '',
        state: '',
        phone: '',
        password: ''
    })

    // handle onchnage
    const handleonchnage = (e) => {
        const { name, value } = e.target
        setuserdata(data => ({ ...data, [name]: value }))
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const isValid = value.length >= 10 && hasLetter && hasNumber;
        setIsPasswordValid(isValid);
    }

    // register user
    const register_user = async (e) => {
        e.preventDefault()
        if (!callonce) return;
        const isempty = Object.values(userdata).some(val => val === undefined || val === null || val === '')
        if (isempty) return alert('Fill up all information')
        if (!isPasswordValid) return alert('Must contain letters, numbers, and be at least 10 characters long')
        try {
            setcallonce(false)
            const res = await axios.post(`${URL}/user_register`, { userdata })
            window.sessionStorage.setItem('appSessionauthToken', JSON.stringify(res.data.token))
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            if (err.response.status === 500 || err.response.status === 400 || err.response.status === 409) {
                alert(err.response.data.message)
            }
        }
    }

    return (
        <div className='user-register-page'>
            <div className='u-r-m-p'>

                <div style={{ width: '100%' }}>
                    {/* header */}
                    <div className='r-header'>
                        <h3>User Registration</h3>
                        <button onClick={() => { Navigate(-1) }}><ClearRoundedIcon /></button>
                    </div>

                    {/* form */}
                    <div className='registration-form' style={{ marginTop: '15px' }}>
                        <form onSubmit={register_user}>

                            {/* name and email */}
                            <div className='d-sec'>
                                <div>
                                    <label>Full name</label>
                                    <input type="text" name='fullname' id='' onChange={handleonchnage} placeholder='Full name' />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input type="text" name='email' id='' onChange={handleonchnage} placeholder='Email' />
                                </div>
                            </div>

                            {/* dob and gender */}
                            <div className='d-sec'>
                                <div>
                                    <label>Date of birth</label>
                                    <input type="date" name='DOB' id='' onChange={handleonchnage} placeholder='Date of birth' />
                                </div>
                                <div>
                                    <label>Gender</label>
                                    <select name='gender' onChange={handleonchnage}>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* qualication and looking for */}
                            <div className='d-sec'>
                                <div>
                                    <label>Qualification</label>
                                    <input type="text" name='qualification' id='' onChange={handleonchnage} placeholder='Qualification' />
                                </div>
                                <div>
                                    <label>Course You’re Looking For</label>
                                    <input type="text" name='courselookingfor' id='' onChange={handleonchnage} placeholder='BCA/MCA' />
                                </div>
                            </div>

                            {/* qualication and looking for */}
                            <div className='d-sec'>
                                <div>
                                    <label>City</label>
                                    <input type="text" name="city" id="" onChange={handleonchnage} placeholder='City' />
                                </div>
                                <div>
                                    <label>State</label>
                                    <input type="text" name="state" id="" onChange={handleonchnage} placeholder='State' />
                                </div>
                            </div>

                            <div className='address'>
                                <label>Phone</label>
                                <input type="tel" name="phone" id="" maxLength={10} onChange={handleonchnage} placeholder='10 digit phone' />
                            </div>

                            <div className='address'>
                                <label>Password</label>
                                <input type="text" name="password" id="" onChange={handleonchnage} placeholder='Use letters & numbers (min 10 characters)' />
                            </div>

                            <div className='already-acc'>
                                <p>Already have an account? <Link to={'/user-signup'} id='auth'><strong style={{ cursor: 'pointer' }}>SignIn</strong></Link></p>
                                <p>Register College <Link to={'/college/register'} id='auth'><strong style={{ cursor: 'pointer' }}>Register</strong></Link></p>
                                <p>Signin as <Link to={'/admin-signin'} id='auth'><strong style={{ cursor: 'pointer' }}>Admin</strong></Link></p>
                                <button style={{ cursor: callonce ? 'pointer' : 'not-allowed' }} type='submit'>Signup</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserRegister
