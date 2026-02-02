import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { useNavigate} from 'react-router-dom';

const CollegeManageCourse = () => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [courses, setcourses] = useState([])
    const Navigate = useNavigate()

    // get all college course
    useEffect(() => {
        const fetchcourse = async () => {
            try {
                const res = await axios.post(`${URL}/getcollegecourse`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setcourses(res.data)
            } catch (err) {
                console.log(err)
                if (err.response.status === 400 || err.response.status === 403 || err.response.status === 500) {
                    alert(err.response.data.message)
                }
            }
        }
        if (token) {
            fetchcourse()
        }
    }, [token, URL])

    // edit course
    const coursedetail = (course) => {
        Navigate('/college/manage-course/editcourse', {state: {course}})
    }

    return (
        <div className='college-course-page'>
            <h3>All courses</h3>

            <table style={{marginTop:'20px'}}>
                <thead style={{width:'100%'}}>
                    <tr>
                        <th>Category</th>
                        <th>Course Name</th>
                        <th>Mode</th>
                        <th>Level</th>
                        <th>Department</th>
                        <th>Specialization</th>
                        <th>Duration</th>
                        <th>Eligibility</th>
                        <th>Yealry Fee</th>
                        <th>Total Fee</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses.length === 0 ? <p>No courses available yet</p> : courses.map((course, index) => {
                            return (
                                <tr>
                                    <td>{course?.coursecategory}</td>
                                    <td>{course?.coursename}</td>
                                    <td>{course?.modeofcourse}</td>
                                    <td>{course?.courselevel}</td>
                                    <td>{course?.department}</td>
                                    <td>{course?.specialization}</td>
                                    <td>{course?.duration}Years</td>
                                    <td>{course?.eligibility}</td>
                                    <td>{course?.yearlyfee}</td>
                                    <td>{course?.duration * course?.yearlyfee}</td>
                                    <td><button id='edit-btn' onClick={()=>coursedetail(course)}><CreateRoundedIcon fontSize='extrasmall'/></button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CollegeManageCourse
