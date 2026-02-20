import React, { useState } from 'react'
import '../../Styles/UserRegister.css'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgetPassword = () => {
    const URL = process.env.REACT_APP_SERVER_URL
    const Navigate = useNavigate()
    const [callOnce, setcallOnce] = useState(true)
    const [isOtpsend, setisOtpsend] = useState(false)
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
        password: '',
        otp: '',
        role: '', //after mail send
        userId: '' //after mail send
    })

    const handleChanges = (e) => {
        const { name, value } = e.target
        setForgotPasswordData(prev => ({ ...prev, [name]: value }))
    }

    const sendotp_toemail = async (e) => {
        e.preventDefault()
        if (!callOnce) return;
        if (!forgotPasswordData?.email) return alert('Enter email')
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/request-Forgot-Password`, { forgotPasswordData })
            setisOtpsend(res?.data?.email)
            setForgotPasswordData(prev => ({
                ...prev, 
                role: res?.data?.role,
                userId: res?.data?.userId
            }))
        } catch (err) {
            setcallOnce(true)
            if (err?.response?.status === 400 || err?.response?.status === 500 || err?.response?.status === 404) {
                alert(err?.response?.data?.message)
            }
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault()
        // if (!callOnce) return;
        const isEmpty = Object.values(forgotPasswordData).some(val => val === undefined || val === null || val === '')
        if(isEmpty) return alert('Fill up all information')
        try {
            setcallOnce(false)
            const res = await axios.patch(`${URL}/verify-forgot-password`, { forgotPasswordData })
        } catch (err) {
            setcallOnce(true)
            if (err?.response?.status === 400 || err?.response?.status === 500 || err?.response?.status === 404) {
                alert(err?.response?.data?.message)
            }
        }
    }


    return (
        <div className='user-register-page'>
            <div className='u-r-m-p' style={{ width: '400px' }}>

                {/* header */}
                <div className='r-header'>
                    <h3>Forget password</h3>
                    <button onClick={() => { Navigate(-1) }}><ClearRoundedIcon /></button>
                </div>

                {/* form */}
                <div className='registration-form' style={{ marginTop: '15px' }}>
                    <form>

                        {/*email, pass */}
                        {!isOtpsend ? <div>
                            <div className='address'>
                                <label>Email</label>
                                <input type="email" name="email" id="" onChange={handleChanges} placeholder='Email' required />
                            </div>
                            <button onClick={sendotp_toemail}>Confirm</button>
                        </div> :
                            <div>
                                <p className='otpres' style={{ color: '#2563EB' }}>6 Digit otp is send to {isOtpsend}</p>
                                <div className='address'>
                                    <label>New password</label>
                                    <input type="password" name="password" id="" onChange={handleChanges} placeholder='Password' required />
                                </div>
                                <div className='address'>
                                    <label>Enter 6 digit otp</label>
                                    <input type="number" name="otp" id="" onChange={handleChanges} placeholder='Enter 6 digit otp' required />
                                </div>
                                <button onClick={verifyOtp}>Verify</button>
                            </div>}
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ForgetPassword
