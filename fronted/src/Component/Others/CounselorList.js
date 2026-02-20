import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd';
import useFetch from '../../Hooks/useFetch';
import {useNavigate} from 'react-router-dom'

const CounselorList = () => {
    const Navigate = useNavigate()
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error } = useFetch(`${URL}/counselors`)
    const [counselorList, setcounselorList] = useState([])
    useEffect(() => {
        if (data?.counselors) {
            setcounselorList(data?.counselors)
        }
    }, [data])
    if (error) return alert(error)
    if (!data) return <p>Loading...</p>


    const counselorprofile = (counselor) => {
        const counselorId = counselor?._id
        if(!counselorId) return;
        Navigate(`/home/counselor/counselorOverview/${counselorId}`)
    }

    return (
        <div className='counselor-list-page'>
            <div className='child-counselorlist'>
                <div id='page-title'>
                    <h1>Connect with Our Counselors</h1>
                </div>

                <div className='counselor-slider'>
                    <div className='childcounselor-slider'>
                        <Carousel arrows infinite={false}>
                            {
                                counselorList.length > 0 && counselorList.map((counselor, index) => {
                                    return (
                                        <div>
                                            <div className='counselor-card' onClick={()=>counselorprofile(counselor)}>
                                                <div className='c-profile-pic'>
                                                    <img src={counselor?.profile} alt="" />
                                                </div>
                                                <div className='c-content'>
                                                    <h3>{counselor?.fullname}</h3>
                                                    <div>
                                                        <span>{counselor?.qualification}</span>
                                                        <span>{counselor?.experience} years of experience</span>
                                                    </div>
                                                    <p>{counselor?.about}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CounselorList
