import React, { useEffect, useState } from 'react'
import building from '../../Image/building.jpg'

const CollegeOverviewBasicDetails = ({ collegeId, collegebasic }) => {
    const URL = process.env.REACT_APP_SERVER_URL

    return (
        <div className='college-basic-details' style={{ marginTop: '30px' }}>
            <div className='child-sec'>
                <div className='c-o-log-img'>
                    <img src={collegebasic?.profile ? collegebasic?.profile : building} alt="" />
                </div>
                <div className='c-o-d'>
                    <h1>{collegebasic?.collegename}</h1>
                    <p id='url'><a href={collegebasic?.siteurl}>{collegebasic?.siteurl}</a></p>
                    <div className='ic-t'>
                        <div>
                            <span>Institute</span>
                            <p>{collegebasic?.institutecategory}</p>
                        </div>
                        <div>
                            <span>Type</span>
                            <p>{collegebasic?.type}</p>
                        </div>
                        <div>
                            <span>Mode</span>
                            <p>{collegebasic?.mode}</p>
                        </div>
                    </div>
                    <div className='approval-board'>
                        {collegebasic?.boardauthority.length > 0 && (
                            collegebasic?.boardauthority.map((board, index) => {
                                return (
                                    <div className='board-name-div'>
                                        <p>{board}</p>
                                    </div>
                                )
                            })
                        )}
                    </div>
                    {/* <p>Review: 000</p> */}
                </div>
            </div>
            <div id='about'>
                <p>{collegebasic?.about}</p>
            </div>
        </div>
    )
}

export default CollegeOverviewBasicDetails
