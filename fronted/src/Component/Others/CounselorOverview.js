import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa6";
import usefetch from '../../Hooks/useFetch'
import CounselorOverviewProfile from './CounselorOverviewProfile';
import CounselorOverviewReview from './CounselorOverviewReview';
import '../../Styles/CounselorOverview.css'

const CounselorOverview = () => {
    const URL = process.env.REACT_APP_SERVER_URL
    const Navigate = useNavigate()
    const { counselorId } = useParams()
    const { data, error } = usefetch(`${URL}/counselorOverviewDetails/${counselorId}`)
    const [counselorData, setcounselorData] = useState({
        counselorId: '',
        Profile: '',
        Review: ''
    })

    useEffect(() => {
        if (data) {
            setcounselorData(prev => ({
                ...prev,
                counselorId: data?.counselor?._id,
                Profile: data?.counselor || {},
                Review: data?.reviews || []
            }))
        }
    }, [data])
    if (error) return alert(error)
    if (!data) return <p>Loading...</p>


    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile'>
                    {/* page title */}
                    <div id='page-title'>
                        <p onClick={() => Navigate(-1)}>Home</p>
                        <span><FaAngleLeft fontSize={14} /></span>
                        <h1>Counselor Name</h1>
                    </div>

                    <div className='counselorOverview-page'>
                        <CounselorOverviewProfile Profile={counselorData?.Profile} counselorId={counselorData?.counselorId}/>
                        <CounselorOverviewReview Reviews={counselorData?.Review} counselorId={counselorData?.counselorId}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CounselorOverview
