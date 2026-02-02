import React, { useEffect, useState } from 'react'
import '../../Styles/CollegeDetailsPage.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CollegeOverviewCourses = ({ collegeId, collegebasic}) => {
    const URL = process.env.REACT_APP_SERVER_URL
    const [courses, setcourse] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        const getcollegecourse = async () => {
            try {
                const res = await axios.get(`${URL}/collegeoverviewcourse/${collegeId}`)
                setcourse(res?.data)
            } catch (err) {
                if (err?.response?.status === 400 || err?.response?.status === 404 || err?.response?.status === 500) {
                    alert(err?.response?.data?.message)
                }
            }
        }
        if (!URL || !collegeId) return;
        getcollegecourse()
    }, [URL, collegeId])

    const navigateto = (course) => {
        Navigate('/home/collegeoverview/application', { state: { course, collegeId, collegebasic} })
    }

    return (
        <div className='availbale-course-page'>
            <h1 id='page-title'>Available Courses</h1>
            <div className='available-course-sec'>
                {courses.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Department</th>
                                <th>Specialization</th>
                                <th>Mode of Course</th>
                                <th>Duration</th>
                                <th>Eligibility</th>
                                <th>Yearly Fee</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length > 0 ? courses.map((course, index) => {
                                return (
                                    <tr>
                                        <td>{course?.coursename}</td>
                                        <td>{course?.department}</td>
                                        <td>{course?.specialization}</td>
                                        <td>{course?.modeofcourse}</td>
                                        <td>{course?.duration}</td>
                                        <td>{course?.eligibility}</td>
                                        <td>{course?.yearlyfee}</td>
                                        <td><button id='apply' onClick={() => navigateto(course)}>Apply</button></td>
                                    </tr>
                                )
                            }) : ''}
                        </tbody>
                    </table>
                )

                }

            </div>
        </div>
    )
}

export default CollegeOverviewCourses
