import React, { useEffect, useState } from 'react'
import useFetch from '../../Hooks/useFetch'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import { useNavigate } from 'react-router-dom'
import '../../Styles/CollegeList.css'
import { FaAngleLeft } from "react-icons/fa6";

const TopUniversity = () => {
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error } = useFetch(`${URL}/topUniversity`) //custom 
    const [TopColleges, SetTopColleges] = useState([])
    const Navigate = useNavigate()
    useEffect(() => {
        if (data?.colleges) {
            SetTopColleges(data?.colleges)
        }
    }, [data])

    if (error) {
        return alert(error)
    }
    if (!TopColleges) {
        return <p>Loading...</p>
    }

    const getcollegeDetails = (college) => {
        const collegeId = college?._id
        if (!collegeId) return;
        Navigate(`/home/collegedetail/${collegeId}`)
    }

    return (
        <div className='top-page'>

            {/* <UserHeader /> */}
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <div id='page-title'>
                        <p onClick={() => Navigate(-1)}>Home</p>
                        <span><FaAngleLeft fontSize={14} /></span>
                        <h1>Top colleges & Universities</h1>
                    </div>

                    <div className='top-collegesUniversities-page'>
                        {
                            TopColleges.length > 0 && (
                                TopColleges.map((college, index) => {
                                    return (
                                        <div class="college-card" onClick={() => getcollegeDetails(college)}>
                                            <div class="logo">
                                                <img src={college?.profile} alt="college logo" />
                                            </div>
                                            <h2 class="college-name">{college?.collegename}</h2>
                                            <div class="tags">
                                                <span>{college?.institutecategory}</span>
                                                <span>{college?.mode}</span>
                                            </div>
                                            <p class="college-type">{college?.type}</p>
                                        </div>

                                    )
                                })
                            )
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}

export default TopUniversity
