import React, { useContext, useEffect, useState } from 'react'
import '../../Styles/CollegeApplications.css'
import axios from 'axios'
import { AuthContext } from '../../App'

const ChildCollegeApplications = () => {
    const URL = process.env.REACT_APP_SERVER_URL
    const { user, role, token } = useContext(AuthContext)
    const [college_applications, setcollege_applications] = useState([])
    const status = ['Pending', 'Approval', 'Reject', 'UnderReview']

    // fetch all college application
    useEffect(() => {
        const fetch_college_application = async () => {
            try {
                const res = await axios.post(`${URL}/collegeapplications`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setcollege_applications(res?.data)
            } catch (err) {
                if (err.response.status === 403 || err.response.status === 500 ) {
                    alert(err.response.data.message)
                }
            }
        }
        if (token) {
            fetch_college_application()
        }
    }, [URL, token])

    // take action approval, underreview, reject
    const takeaction = async (e, college) => {
        const action = e.target.value
        if (action) {
            const isconfirm = window.confirm(`Are you sure you want to ${action} college?`)
            if (isconfirm) {
                try {
                    const res = await axios.patch(`${URL}/tackaction`, { college, action }, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    window.location.reload()
                } catch (err) {
                    if (err.response.status === 403 || err.response.status || 400 || err.response.status || 500) {
                        alert(err.response.data.message)
                    }
                }
            }
        }
    }

    return (
        <div className='colleageapplication-top-page'>

            {/* college applicaitons */}
            <div className='allcollege-applications'>

                {/* btn for pending and approval applications */}
                <div className='pending-approval-btn'>
                    {status.length > 0 && (
                        status.map((val) => {
                            return (
                                <button>{val}</button>
                            )
                        })
                    )}
                </div>

                {/* all applications */}
                <div className='main-table-sec'>
                    <table>
                        <thead>
                            <tr>
                                <th>College Name</th>
                                <th>Institute category</th>
                                <th>Type</th>
                                <th>Board/Authority</th>
                                <th>Mode</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Owner Name</th>
                                <th>Owner Phone</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                college_applications.length > 0 && (
                                    college_applications.map((college, index) => {
                                        return (
                                            <tr>
                                                <td>{college?.collegename}</td>
                                                <td>{college?.institutecategory}</td>
                                                <td>{college?.type}</td>
                                                <td>{college?.boardauthority}</td>
                                                <td>{college?.mode}</td>
                                                <td>{college?.email}</td>
                                                <td>{college?.collegephone}</td>
                                                <td>{college?.address}</td>
                                                <td>{college?.ownername}</td>
                                                <td>{college?.collegephone}</td>
                                                <td>{college?.createdAt.split(',')[0]}</td>
                                                <td id='status'><p>{college?.Status}</p></td>
                                                <td id='action'>
                                                    <select onChange={(e) => takeaction(e, college)}>
                                                        <option value="">Select</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="UnderReview">Under Review</option>
                                                        <option value="Approval">Approval</option>
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

export default ChildCollegeApplications
