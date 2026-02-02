import React, { useState } from 'react'
import '../../Styles/UserRegister.css'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const CollegeSignIn = () => {
    const URL = process.env.REACT_APP_SERVER_URL
    const [callonce, setcallonce] = useState(true)
    const Navigate = useNavigate()

    const [collegedata, setcollegedata] = useState({
        email: '',
        password: ''
    })
    const handlechanges = (e) => {
        const { name, value } = e.target
        setcollegedata(data => ({ ...data, [name]: value }))
    }

    const college_signin = async (e) => {
        e.preventDefault()
        if (!callonce) return;
        const isempty = Object.values(collegedata).some(val => val === undefined || val === "" || val === null)
        if (isempty) return alert('Fill up all informations')
        try {
    setcallonce(false)
            const res = await axios.post(`${URL}/college_signin`, { collegedata })
            window.sessionStorage.setItem('appSessionauthToken', JSON.stringify(res?.data?.token))
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setcallonce(true)
            if(err?.response?.status === 400 || err?.response?.status === 404 || err?.response?.status === 500){
                alert(err?.response?.data?.message)
            }
        }
    }


    return (
        <div className='user-register-page'>
            <div className='u-r-m-p' style={{ width: '400px' }}>

                {/* header */}
                <div className='r-header'>
                    <h3>College SignIn</h3>
                    <button onClick={()=>{Navigate(-1)}}><ClearRoundedIcon /></button>
                </div>

                {/* form */}
                <div className='registration-form' style={{ marginTop: '15px' }}>
                    <form onSubmit={college_signin}>

                        {/* email, pass */}
                        <div className='address'>
                            <label>Email</label>
                            <input type="email" name="email" id="" placeholder='Email' onChange={handlechanges} />
                        </div>
                        <div className='address'>
                            <label>Password</label>
                            <input type="password" name="password" id="" placeholder='Password' onChange={handlechanges} />
                        </div>

                        <div className='already-acc'>
                            <p>Don't have an account? <Link to={'/college/register'} id='auth'><strong>Register</strong></Link></p>
                            <button type='submit' style={{cursor:callonce?'pointer':'not-allowed'}}>SingIn</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default CollegeSignIn
