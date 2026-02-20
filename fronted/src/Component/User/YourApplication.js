import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'

const YourApplication = ({ Applications }) => {

    return (
        <div className='yourapplication-top-page college-course-page'>
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
                        Applications.length > 0 && (
                            Applications.map((application, index) => {
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
                                        <td>{application?.createdAt.split('T')[0]}</td>
                                        <td><p>{application?.Status}</p></td>
                                    </tr>
                                )
                            })
                        )
                    }
                </tbody>
            </table>


        </div>
    )
}

export default YourApplication
