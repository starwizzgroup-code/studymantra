import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'

const UpdatePassword = () => {
    const { user, role, token } = useContext(AuthContext)
    const [ishide, sethide] = useState(true)
    const [status, setstatus] = useState()
    const [newpassword, setnewpassword] = useState()
    const [Otp, setotp] = useState()
    const [callone, setcallone] = useState(true)
    const [verifystatus, setverifystatus] = useState(true)
    const URL = process.env.REACT_APP_SERVER_URL


    const sendotp_toemail = async () => {
        if (!callone) return;
        if (!newpassword) return;
        if (newpassword.length < 8) return alert('Paasword must 9 character long')
        try {
            setcallone(false)
            const res = await axios.post(`${URL}/request-password-update`, { newpassword }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setstatus(res?.data?.email)
        } catch (err) {
            setstatus(true)
            if (err?.response?.status === 400 || err?.response?.status === 500 || err?.response?.status === 404) {
                alert(err?.response?.data?.message)
            }
        }
    }

    const verify_otp = async () => {
        if (!verifystatus) return;
        if (!Otp) return;
        try {
            setverifystatus(false)
            const res = await axios.patch(`${URL}/verify-password-update`, { newpassword, Otp }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setverifystatus(true)
            if (err?.response?.status === 400 || err?.response?.status === 500 || err?.response?.status === 404) {
                alert(err?.response?.data?.message)
            }
        }
    }

    return (
        <div className='update-name-page'>

            <div className='updatenam-header'>
                <div>
                    <h3>Passwrod</h3>
                    <p>Fkade3974y293rcrc</p>
                </div>
                <button onClick={() => sethide(prev => !prev)}>{ishide ? 'Update' : 'Cancel'}</button>
            </div>

            {
                !ishide ? <div>
                    {
                        !status ? <div className='update-sec'>
                            <input type="text" name='newpassword' id='' placeholder='Enter new password' onChange={(e) => { setnewpassword(e.target.value) }} />
                            <button onClick={sendotp_toemail} style={{ cursor: callone ? 'pointer' : 'not-allowed' }}>Change</button>
                        </div> :
                            <div className='update-sec'>
                                <p className='otpres' style={{ color: '#2563EB' }}>Otp is send to your {status}</p>
                                <input type="number" name='otp' id='' placeholder='Enter 6 digit otp' onChange={(e) => { setotp(e.target.value) }} style={{ textAlign: 'center' }} />
                                <button onClick={verify_otp} style={{ cursor: verifystatus ? 'pointer' : 'not-allowed' }}>Confirm</button>
                            </div>
                    }
                </div> : ''
            }

        </div>
    )
}

export default UpdatePassword
