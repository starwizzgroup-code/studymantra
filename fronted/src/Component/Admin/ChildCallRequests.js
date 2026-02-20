import React, { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../App'

const ChildCallRequests = ({ callRequest }) => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL

    const takeaction = async (value, request) => {
        const requestId = request?.requestId
        if (!value || !requestId) return;

        try {

            const res = await axios.patch(`${URL}/requestAction/${requestId}`, { value }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            window.location.reload()
        } catch (err) {
            const status = err?.response?.status
            if (status === 400 || status === 404 || status === 500) {
                alert(err?.response?.data?.message || 'Something went wrong')
            }
        }

    }

    return (
        <div className='colleageapplication-top-page'>

            {/* college applicaitons */}
            <div className='allcollege-applications'>

                {/* btn for pending and approval applications */}
                {/* <div className='pending-approval-btn'>
                    {status.length > 0 && (
                        status.map((val) => {
                            return (
                                <button>{val}</button>
                            )
                        })
                    )}
                </div> */}

                {/* all applications */}
                <div className='main-table-sec'>
                    <table>
                        <thead>
                            <tr>
                                <th>Counselor Name</th>
                                <th>Fullname</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>State</th>
                                <th>CourseName</th>
                                <th>Mode</th>
                                <th>Specialization</th>
                                <th>createdAt</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                callRequest.length > 0 && (
                                    callRequest.map((request, index) => {
                                        return (
                                            <tr>
                                                <td>{request?.counselorName}</td>
                                                <td>{request?.fullName}</td>
                                                <td>{request?.phone}</td>
                                                <td>{request?.email}</td>
                                                <td>{request?.city}</td>
                                                <td>{request?.state}</td>
                                                <td>{request?.coursename}</td>
                                                <td>{request?.mode}</td>
                                                <td>{request?.specialization}</td>
                                                <td>{request?.createdAt.split('T')[0]}</td>
                                                <td id='status'><p>{request?.Status}</p></td>
                                                <td id='action'>
                                                    <select onChange={(e) => takeaction(e.target.value, request)}>
                                                        <option value="">Select</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Complete">Complete</option>
                                                        <option value="Reject">Reject</option>
                                                        <option value="Interested">Interested</option>
                                                        <option value="Not interested">Not interested</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default ChildCallRequests
