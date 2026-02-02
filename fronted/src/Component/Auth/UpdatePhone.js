import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../App'

const UpdatePhone = () => {
    const { user, role, token } = useContext(AuthContext)
    const [ishide, sethide] = useState(true)
    const [status, setstatus] = useState(false)
    const [newphone, setnewphone] = useState()
    const [Otp, setotp] = useState()
    const [callone, setcallone] = useState(true)
    const [verifystatus, setverifystatus] = useState(true)
    const URL = process.env.REACT_APP_SERVER_URL


    const sendotp_toemail = async () => {
        if (!callone) return;
        if (!newphone) return;
        try {
            setcallone(false)
            const res = await axios.post(`${URL}/request-phone-update`, { newphone }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setstatus(res?.data?.email)
        } catch (err) {
            setcallone(true)
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
            const res = await axios.patch(`${URL}/verify-phone-update`, { newphone, Otp }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setverifystatus(true)
            if (err?.response?.status === 400 || err?.response?.status === 500 || err?.response?.status === 404 || err?.response?.status === 409) {
                alert(err?.response?.data?.message)
            }
        }
    }

    return (
        <div className='update-name-page'>

            <div className='updatenam-header'>
                <div>
                    <h3>Phone</h3>
                    <p>{user?.phone}</p>
                </div>
                <button onClick={() => sethide(prev => !prev)}>{ishide ? 'Update' : 'Cancel'}</button>
            </div>

            <div className='update-name-page'>

                {
                    !ishide ? <div>
                        {!status ? <div className='update-sec'>
                            <input type="tel" name='phone' id='' maxLength={10} placeholder='Enter new phone' onChange={(e) => { setnewphone(e.target.value) }} />
                            <button onClick={sendotp_toemail} style={{ cursor: callone ? 'pointer' : 'not-allowed' }}>Change</button>
                        </div> :
                            <div className='update-sec'>
                                <p className='otpres' style={{ color: '#2563EB' }}>Otp is send to your {status}</p>
                                <input type="text" name='otp' id='' placeholder='Enter 6 digit otp' onChange={(e)=>{setotp(e.target.value)}} style={{ textAlign: 'center' }} />
                                <button onClick={verify_otp}>Confirm</button>
                            </div>}
                    </div> : ''
                }

            </div>

        </div>
    )
}

export default UpdatePhone
