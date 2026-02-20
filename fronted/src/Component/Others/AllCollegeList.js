import React, { useEffect, useState } from 'react'
import '../../Styles/CollegeList.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'

const AllCollegeList = () => {
    const URL = process.env.REACT_APP_SERVER_URL
    const [collegesList, setcollegeList] = useState([])
    const Navigate = useNavigate()
    const {data, error} = useFetch(`${URL}/collegeList`)
    useEffect(() => {
        if(data?.colleges){
            setcollegeList(data?.colleges)
        }
    }, [data])

    if(error) return alert(error)
    if(!data) return <p>Loading...</p>

    const collegeOverview = (college) => {
        const collegeId = college?._id
        if (!collegeId) return;
        Navigate(`/home/collegedetail/${collegeId}`)
    }

    return (
        <div className='college-list-toppage'>
            <div className='collegelist-chilapage'>
                {
                    collegesList.length > 0 && (
                        collegesList.map((college, index) => {
                            return (
                                <div class="college-card" onClick={()=>collegeOverview(college)}>
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
    )
}
export default AllCollegeList
