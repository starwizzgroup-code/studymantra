import React, { useEffect, useState } from 'react'
import '../../Styles/Explore.css'

const ProgramList = ({ programs, getCoursesByProgram }) => {
    const [selectedprogram, setselectedprogram] = useState()
    useEffect(() => {
        if (programs.length > 0) {
            setselectedprogram(programs[0])
        }
    }, [programs])

    useEffect(() => {
        if(!selectedprogram) return;
        getCoursesByProgram(selectedprogram)
    }, [selectedprogram])

    return (
        <div className='programlist-page'>
            {
                programs.length === 0 ? '' : programs.map((program, index) => {
                    return (
                        <div className='program' onClick={()=>setselectedprogram(program)}>
                            <h1>{program} Courses</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProgramList
