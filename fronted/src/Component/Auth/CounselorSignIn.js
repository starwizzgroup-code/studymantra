import React, { useState } from 'react'
import { LoadingOutlined } from "@ant-design/icons"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import axios from 'axios'

const CounselorSignIn = () => {
    const URL = process.env.REACT_APP_SERVER_URL
    const [callOnce, setcallOnce] = useState(true)
    const [counselorauth, setcounselorauth] = useState({
        email: '',
        password: ''
    })

    const handlechanges = (e) => {
        const { name, value } = e.target
        setcounselorauth(prev => ({ ...prev, [name]: value }))
    }

    const singIn_Counselor = async (e) => {
        e.preventDefault()
        if (!callOnce) return;
        const isempty = Object.values(counselorauth).some(val => val === null || val === undefined || val === '')
        if (isempty) return;
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/counselor_signIn`, { counselorauth })
            window.sessionStorage.setItem('appSessionauthToken', JSON.stringify(res?.data?.token))
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setcallOnce(true)
            if (err?.response?.status === 400 || err?.response?.status === 401 || err?.response?.status === 404 || err?.response?.status === 500) {
                alert(err?.response?.data?.message)
            }
        }
    }

    return (
        <div className='user-register-page'>
            <div className='u-r-m-p' style={{ width: '400px' }}>

                {/* header */}
                <div className='r-header'>
                    <h3>Counselor SignIn</h3>
                    <button><ClearRoundedIcon /></button>
                </div>

                {/* form */}
                <div className='registration-form' style={{ marginTop: '15px' }}>
                    <form onSubmit={singIn_Counselor}>

                        {/*email, pass */}
                        <div className='address'>
                            <label>Email</label>
                            <input type="email" name="email" id="" onChange={handlechanges} placeholder='Email' required />
                        </div>
                        <div className='address'>
                            <label>Password</label>
                            <input type="text" name="password" id="" onChange={handlechanges} placeholder='Password' required />
                        </div>
                        <div className='forget-pass'>
                            <p>Forget password</p>
                        </div>

                        <div className='already-acc'>
                            <button type='submit' style={{cursor:callOnce?'pointer':'not-allowed'}}><span>SingIn</span></button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default CounselorSignIn
