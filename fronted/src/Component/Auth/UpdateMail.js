import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'

const UpdateMail = () => {
    const { user, role, token } = useContext(AuthContext)
    const [ishide, sethide] = useState(true)
    const [status, setstatus] = useState()
    const [newemail, setnewemail] = useState()
    const [Otp, setotp] = useState()
    const [callone, setcallone] = useState(true)
    const [verifystatus, setverifystatus] = useState(true)
    const URL = process.env.REACT_APP_SERVER_URL


    const sendotp_toemail = async () => {
        if (!callone) return;
        if (!newemail) return;
        try {
            setcallone(false)
            const res = await axios.post(`${URL}/request-email-update`, { newemail }, {
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
        if(!verifystatus) return;
        if (!Otp) return;
        try {
            setverifystatus(false)
            const res = await axios.patch(`${URL}/verify-email-update`, { newemail, Otp }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setverifystatus(true)
            if (err?.response?.status === 400 || err?.response?.status === 500 || err?.response?.status === 404 ||err?.response?.status === 409) {
                alert(err?.response?.data?.message)
            }
        }
    }

    return (

        <div className='update-name-page'>

            <div className='updatenam-header'>
                <div>
                    <h3>Email</h3>
                    <p>{user?.email}</p>
                </div>
                <button onClick={() => sethide(prev => !prev)}>{ishide ? 'Update' : 'Cancel'}</button>
            </div>

            {
                !ishide ? <div>
                    {
                        !status ? <div className='update-sec'>
                            <input type="text" name='newemail' id='' placeholder='Enter new email' onChange={(e) => { setnewemail(e.target.value) }} required />
                            <button onClick={sendotp_toemail} style={{cursor:callone?'pointer':'not-allowed'}}>Change</button>
                        </div> :
                            <div className='update-sec'>
                                <p className='otpres' style={{ color: '#2563EB' }}>Otp is send to your {status}</p>
                                <input type="number" name='opt' id='' placeholder='Enter 6 digit otp to proceede' onChange={(e) => { setotp(e.target.value) }} style={{textAlign:'center'}} required />
                                <button onClick={verify_otp} style={{cursor:verifystatus?'pointer':'not-allowed'}}>Confirm</button>
                            </div>
                    }
                </div> : ''
            }
        </div>
    )
}

export default UpdateMail