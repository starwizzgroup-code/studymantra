import React from 'react'
import building from '../../Image/building.jpg'
import { useNavigate } from 'react-router-dom'

const CollegeList = ({ colleges }) => {
    const Navigate = useNavigate()
    const getCollegegdetails = async (college) => {
        const collegeId = college?._id
        Navigate(`/home/collegedetail/${collegeId}`)
    }

    return (
        <div className='collegelist-page'>
            {
                colleges.length > 0 && colleges.map((college, index) => {
                    return (
                        <div className='college-popup' onClick={() => getCollegegdetails(college)}>
                            <div className='collegelogo-sec'>
                                <img src={college?.profile} alt="" />
                            </div>
                            <div className='collegedetails-sec'>
                                <p id='collegecategory'>{college?.institutecategory}</p>
                                <h3>{college?.collegename}</h3>
                                <div>
                                    <p style={{ marginRight: '15px' }}>{college?.type}</p>
                                    <p>{college?.mode}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CollegeList
