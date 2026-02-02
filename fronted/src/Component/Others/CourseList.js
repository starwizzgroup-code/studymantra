import React, { useEffect, useState } from 'react'

const CourseList = ({ courses, getcollegeBycourse }) => {
    const [selectedcourse, setselectescourse] = useState()
    useEffect(() => {
        if (courses.length > 0) {
            setselectescourse(courses[0])
        }
    }, [courses])

    // get college by course
    useEffect(() => {
        if(!selectedcourse) return;
        getcollegeBycourse(selectedcourse)
    }, [selectedcourse])

    return (
        <div className='courselist-page'>
            {
                courses.length === 0 ? '' : courses.map((course, index) => {
                    return (
                        <div className='course' onClick={()=>setselectescourse(course)}>
                            <p>{course}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CourseList
