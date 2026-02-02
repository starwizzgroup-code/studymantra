import React, { useState } from 'react'
import '../../Styles/UserRegister.css'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const AdminLogin = () => {
    const AdminSecretkey = process.env.REACT_APP_ADMIN_SECRET_KEY
    const API_URL = process.env.REACT_APP_SERVER_URL
    const Navigate = useNavigate()

    const [status, setstatus] = useState(true)
    const [admincredential, setadmincredential] = useState({
        name: '',
        email: '',
        password: '',
        secretkey: ''
    })

    // handle chnages
    const handlechnages = (e) => {
        const { name, value } = e.target
        setadmincredential(data => ({ ...data, [name]: value }))
    }

    const adminsignin = async (e) => {
        e.preventDefault()
        try {
            if (!status) return;
            const isempty = Object.values(admincredential).some(val => val === "" || val === undefined || val === null)
            if (isempty) return alert('Fill up all information')
            if (admincredential?.secretkey !== AdminSecretkey) {
                alert('Enter a valid secret key')
                setstatus(true)
            }
            const res = await axios.post(`${API_URL}/adminsignin`, { admincredential })
            window.sessionStorage.setItem('appSessionauthToken', JSON.stringify(res.data.token))
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.message)
            } else if (err.response.status === 500) {
                alert(err.response.data.message)
            }
        }
    }

    return (
        <div className='user-register-page'>
            <div className='u-r-m-p' style={{ width: '400px' }}>

                {/* header */}
                <div className='r-header'>
                    <h3>Admin Signin</h3>
                    <button onClick={() => { Navigate(-1) }}><ClearRoundedIcon /></button>
                </div>

                {/* form */}
                <div className='registration-form' style={{ marginTop: '15px' }}>
                    <form onSubmit={adminsignin}>

                        {/* name and email */}
                        <div className='d-sec' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ width: '100%', marginBottom: '10px' }}>
                                <label>Full name</label>
                                <input type="text" name='name' id='' onChange={handlechnages} placeholder='Full name' />
                            </div>
                            <div style={{ width: '100%' }}>
                                <label>Email</label>
                                <input type="text" name='email' id='' onChange={handlechnages} placeholder='Email' />
                            </div>
                        </div>

                        <div className='address'>
                            <label>Password</label>
                            <input type="text" name="password" id="" onChange={handlechnages} placeholder='Enter password' />
                        </div>

                        <div className='address'>
                            <label>Secret key</label>
                            <input type="text" name="secretkey" id="" onChange={handlechnages} placeholder='Enter an secret key' />
                        </div>

                        <div className='already-acc'>
                            <p>Already have an account? <Link to={'/user-signup'} id='auth'><strong style={{ cursor: 'pointer' }}>Signup</strong></Link></p>
                            <p>Register College <Link to={'/college/register'} id='auth'><strong style={{ cursor: 'pointer' }}>Register</strong></Link></p>
                            <p>Signin as <Link id='auth'><strong style={{ cursor: 'pointer' }}>Admin</strong></Link></p>
                            <button type='submit' style={{ cursor: status ? 'pointer' : 'not-allowed' }}>Signin</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default AdminLogin
