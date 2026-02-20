import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../../Hooks/useAuth'

const CollegeOverviewGallery = ({ collegeId }) => {
    const URL = process.env.REACT_APP_SERVER_URL
    const [gallery, setgallery] = useState([])


    useEffect(() => {
        const getgallery = async () => {
            try {
                const res = await axios.get(`${URL}/collegeoverviewgallery/${collegeId}`)
                setgallery(res?.data)
            } catch (err) {
                if (err?.response?.status === 400 || err?.response?.status === 404 || err?.response?.status === 500) {
                    alert(err?.response?.data?.message)
                }
            }
        }
        if (!collegeId || !URL) return;
        getgallery()
    }, [collegeId, URL])

    return (
        <div className='collegeoverview-gallery-page'>
            <h3 id='page-title'>Gallery</h3>
            <div className='child-collegegallery'>
                {
                    gallery.length > 0 && (
                        gallery.map((img, index) => {
                            return (
                                <div className='gallery-sec'>
                                    <img src={img?.file} alt="" />
                                    <p>{img?.title}</p>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default CollegeOverviewGallery
