import React, { useState, useEffect } from 'react'
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import { useNavigate, useParams } from 'react-router-dom';
import '../../Styles/CollegeDetailsPage.css'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import CollegeOverviewCourses from './CollegeOverviewCourses';
import CollegeOverviewBasicDetails from './CollegeOverviewBasicDetails';
import CollegeOverviewGallery from './CollegeOverviewGallery';
import LeaveYourReview from './LeaveYourReview';
import axios from 'axios'

const CollegeOverviewPage = () => {
    const Navigate = useNavigate()
    const { collegeId } = useParams()
    const [collegebasic, setcollege] = useState()
    const URL = process.env.REACT_APP_SERVER_URL

    // fetch college details
    useEffect(() => {
        const getcollegebasicdetails = async () => {
            try {
                const res = await axios.get(`${URL}/collegeoverviewbasic/${collegeId}`)
                setcollege(res?.data)
            } catch (err) {
                if (err?.response?.status === 400 || err?.response?.status === 404 || err?.response?.status === 500) {
                    alert(err?.response?.data?.message)
                }
            }
        }
        if (!collegeId || !URL) return;
        getcollegebasicdetails()
    }, [collegeId, URL])

    // navigate to createapplication
    const navigateto = () => {
        Navigate('/home/collegeoverview/application', { state: { collegebasic, collegeId } })
    }

    return (
        <div className='college-details-page'>
            <div className='collegedetails-child' style={{ marginBottom: '20px' }}>

                {/* go back */}
                <h1 id='page-title'><button onClick={() => Navigate('/user/home')}><KeyboardDoubleArrowLeftRoundedIcon /></button>College Overview</h1>


                {/* Componen */}
                {/* inside all component collegeid is get through the useparams */}
                <CollegeOverviewBasicDetails collegeId={collegeId} collegebasic={collegebasic} />
                <CollegeOverviewCourses collegeId={collegeId} collegebasic={collegebasic}/>
                <CollegeOverviewGallery collegeId={collegeId} />
                <LeaveYourReview collegeId={collegeId} />
                <button id='talktouniversity' onClick={navigateto}>Talk to University</button>

            </div>
        </div>
    )
}

export default CollegeOverviewPage
