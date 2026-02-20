import React, { useContext, useState } from 'react'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../App'
import CreateQuestions from './CreateQuestions';
import AllQuestionAnswere from '../Others/AllQuestionAnswere';
import '../../Styles/QuestionsAnswere.css'

const Questions_Answere = () => {
    const {user, role, token } = useContext(AuthContext)
    const Navigate = useNavigate()

    return (
        <div className='top-page'>
            <div className='admin-profile'>
                <div className='child-profile' style={{width:'60%'}}>
                    <div id='page-title'>
                        <h1 id='back' onClick={() => Navigate('/admin/dashboard')}>Dashboard</h1>
                        <span><KeyboardArrowRightRoundedIcon /></span>
                        <h1>Manage Question & Answere</h1>
                    </div>

                    <CreateQuestions/>
                    <AllQuestionAnswere/>

                </div>


            </div>
        </div>
    )
}

export default Questions_Answere
