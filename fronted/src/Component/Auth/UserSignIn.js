import React, { useState } from 'react'
import '../../Styles/UserRegister.css'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons"

const UserSignIn = () => {
    const Navigate = useNavigate()
    const URL = process.env.REACT_APP_SERVER_URL
    const [callonce, setcallonce] = useState(true)

    const [userdata, setuserdata] = useState({
        email: '',
        password: ''
    }) //userlogin data

    const handlechanges = (e) => {
        const { name, value } = e.target
        setuserdata(data => ({ ...data, [name]: value }))
    }

    const signin = async (e) => {
        e.preventDefault()
        if (!callonce) return;
        const isempty = Object.values(userdata).some(val => val === '' || val === undefined || val === null)
        if (isempty) return alert('Fill up all information')
        try {
            setcallonce(false)
            const res = await axios.post(`${URL}/usersignin`, { userdata })
            window.sessionStorage.setItem('appSessionauthToken', JSON.stringify(res?.data?.token))
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setcallonce(true)
            if (err?.response?.status === 400 || err?.response?.status === 401 || err?.response?.status === 500) {
                alert(err?.response?.data?.message)
            }
        }
    }

    return (
        <div className='user-register-page'>
            <div className='u-r-m-p' style={{ width: '400px' }}>

                {/* header */}
                <div className='r-header'>
                    <h3>User SignIn</h3>
                    <button onClick={()=>{Navigate(-1)}}><ClearRoundedIcon /></button>
                </div>

                {/* form */}
                <div className='registration-form' style={{ marginTop: '15px' }}>
                    <form onSubmit={signin}>

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
                            <button type='submit' style={{cursor:callonce?'pointer':'not-allowed'}}><span>SingIn</span></button>
                            <p style={{ marginTop: '10px' }}>Don't have an account? <Link to={'/register'} id='auth'><strong>Register</strong></Link></p>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default UserSignIn
