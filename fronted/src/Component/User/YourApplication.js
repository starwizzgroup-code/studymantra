import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'

const YourApplication = () => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [applications, setapplication] = useState([])

    useEffect(() => {
        const get_application = async () => {
            try {
                const res = await axios.post(`${URL}/getuser_application`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setapplication(res?.data)
            } catch (err) {
                if (err?.response?.status === 400 || err?.response?.status === 403 || err?.response?.status === 500) {
                    alert(err?.response?.data?.message)
                }
            }
        }
        if (token) {
            get_application()
        }
    }, [token, URL])

    return (
        <div className='yourapplication-top-page college-course-page'>
            <h3>Applications</h3>
            <table>
                <thead>
                    <tr>
                        <th>College Name</th>
                        <th>Course</th>
                        <th>Mode of Course</th>
                        <th>Specialization</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>State</th>
                        <th>CreatedAt</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        applications.length === 0 ? '' : applications.map((application, index) => {
                            return (
                                <tr>
                                    <td>{application?.collegename}</td>
                                    <td>{application?.course}</td>
                                    <td>{application?.modeofcourse}</td>
                                    <td>{application?.specialization}</td>
                                    <td>{application?.fullname}</td>
                                    <td>{application?.email}</td>
                                    <td>{application?.phone}</td>
                                    <td>{application?.city}</td>
                                    <td>{application?.state}</td>
                                    <td>{application?.createdAt.split(',')[0]}</td>
                                    <td><p>{application?.Status}</p></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>


        </div>
    )
}

export default YourApplication
