import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'

const CounselorCallRequest = ({ counselorId }) => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [callOnce, setcallOnce] = useState(true)
    const [callRequestData, setcallRequestData] = useState({
        city: user?.city || '',
        state: user?.state || '',
        coursename: '',
        modeofcourse: '',
        specialization: ''
    })

    const handlechanges = (e) => {
        const { name, value } = e.target
        setcallRequestData(prev => ({ ...prev, [name]: value }))
    }

    const sumbitApplication = async (e) => {
        e.preventDefault()
        if (!callOnce) return;
        const isempty = Object.values(callRequestData).some(val => val === null || val === '' || val === undefined)
        if (isempty) return alert('Fill up all informations')
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/counselorCallRequest`, { callRequestData, counselorId }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setcallOnce(true)
            const status = err?.response?.status
            if (status === 400 || status === 409 || status === 404 || status === 500) {
                alert(err?.response?.data?.message || 'Something went wrong')
            }
        }
    }

    return (
        <div className='create-call-request'>

            <div id='page-title'>
                <h1>Create call request</h1>
            </div>

            <div className='call-request-form'>
                <form>
                    <div className='req-inp'>
                        <label>Fullname</label>
                        <input type="text" name="fullname" id="" value={user?.fullname} placeholder='Full name' />
                    </div>
                    <div className='req-inp'>
                        <label>Phone</label>
                        <input type="tel" maxLength={10} name="phone" id="" value={user?.phone} placeholder='Phone' />
                    </div>
                    <div className='req-inp'>
                        <label>Email</label>
                        <input type="email" name="email" id="" value={user?.email} placeholder='Email' />
                    </div>
                    <div className='req-inp'>
                        <label>Gender</label>
                        <select name='gender' value={user?.gender}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='req-inp'>
                        <label>City</label>
                        <input type="text" name="city" id="" value={callRequestData?.city} onChange={handlechanges} placeholder='City' />
                    </div>
                    <div className='req-inp'>
                        <label>State</label>
                        <input type="text" name="state" id="" value={callRequestData?.state} onChange={handlechanges} placeholder='State' />
                    </div>
                    <div className='req-inp'>
                        <label>Course name</label>
                        <select name='coursename' value={callRequestData?.coursename} onChange={handlechanges}>
                            <option value="">Select</option>
                            <option value="BA">BA</option>
                            <option value="BSc">BSc</option>
                            <option value="BCom">BCom</option>
                            <option value="BTech">BTech</option>
                            <option value="BCA">BCA</option>
                            <option value="BBA">BBA</option>
                            <option value="MA">MA</option>
                            <option value="MSc">MSc</option>
                            <option value="MCom">MCom</option>
                            <option value="MTech">MTech</option>
                            <option value="MCA">MCA</option>
                            <option value="MBA">MBA</option>
                            <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                            <option value="Advanced Diploma">Advanced Diploma</option>
                            <option value="PG Diploma">PG Diploma</option>
                            <option value="Short-Term Certificate">Short-Term Certificate</option>
                            <option value="Skill Certificate">Skill Certificate</option>
                            <option value="Professional Certificate">Professional Certificate</option>
                        </select>
                    </div>
                    <div className='req-inp'>
                        <label>Mode of course</label>
                        <select name='modeofcourse' value={callRequestData?.modeofcourse} onChange={handlechanges}>
                            <option value="">Select</option>
                            <option value="Online">Online</option>
                            <option value="Distance">Distance</option>
                            <option value="Regular/Full-Time">Regular/Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Deemed">Deemed</option>
                        </select>
                    </div>
                    <div className='req-inp' style={{ width: '100%' }}>
                        <label>Specialization</label>
                        <input type="text" name="specialization" id="" value={callRequestData?.specialization} placeholder='Specialization' onChange={handlechanges} />
                    </div>
                    <button onClick={sumbitApplication} style={{cursor:callOnce?'pointer':'not-allowed'}}>Submit request</button>
                </form>
            </div >

        </div >
    )
}

export default CounselorCallRequest
