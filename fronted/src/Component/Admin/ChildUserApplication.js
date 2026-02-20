import React, { useContext, useEffect, useState } from 'react'
import '../../Styles/CollegeApplications.css'
import { AuthContext } from '../../App'
import axios from 'axios'

const ChildUserApplication = ({userApplications}) => {
    const { user, role, token } = useContext(AuthContext)
    const status = ['Pending', 'UnderReview', 'Complete', 'Reject']

    const take_action = async (event, application) => {
        const actionvalue = event.target.value
        const applicationId = application?.applicationId
        if (!actionvalue || !applicationId) return alert('Something went wrong')
        const istrue = window.confirm(`Confirm application status`)
        if (!istrue) return;
        try {
            const res = await axios.patch(`${URL}/takeactionOnuser`, { actionvalue, applicationId }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            if (err?.response?.status === 403 || err?.response?.status || 400 || err?.response?.status || 500 || err?.response?.status === 404) {
                alert(err.response.data.message)
            }
        }
    }

    return (
        <div className='colleageapplication-top-page'>
            <div className='allcollege-applications'>

                <div className='pending-approval-btn'>
                    {status.length > 0 && (
                        status.map((val) => {
                            return (
                                <button>{val}</button>
                            )
                        })
                    )}
                </div>

                <div className='main-table-sec'>
                    <table>
                        <thead>
                            <tr>
                                <th>College Name</th>
                                <th>College Phone</th>
                                <th>College Email</th>
                                <th>Owner Name</th>
                                <th>Owner Phone</th>
                                <th>Course</th>
                                <th>Specialization</th>
                                <th>Mode</th>
                                <th>Full Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>State</th>
                                <th>createdAt</th>
                                <th>Status</th>
                                <th>Action taken by</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userApplications.length > 0 && (
                                    userApplications.map((application, index) => {
                                        return (
                                            <tr>
                                                <td>{application?.collegename}</td>
                                                <td>{application?.collegephone}</td>
                                                <td>{application?.collegeemail}</td>
                                                <td>{application?.ownername}</td>
                                                <td>{application?.ownerphone}</td>
                                                <td>{application?.course}</td>
                                                <td>{application?.specialization}</td>
                                                <td>{application?.modeofcourse}</td>
                                                <td>{application?.fullname}</td>
                                                <td>{application?.phone}</td>
                                                <td>{application?.email}</td>
                                                <td>{application?.city}</td>
                                                <td>{application?.state}</td>
                                                <td>{application?.createdAt.split(',')[0]}</td>
                                                <td id='status'><p>{application?.Status}</p></td>
                                                <td>{application?.actiontakenBy?.counselorName}</td>
                                                <td id='action' onChange={(event) => take_action(event, application)}>
                                                    <select>
                                                        <option value="">Select</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="UnderReview">UnderReview</option>
                                                        <option value="Complete">Complete</option>
                                                        <option value="Reject">Reject</option>
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

export default ChildUserApplication
