import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import useAuth from '../../Hooks/useAuth';

const Managegallery = () => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error } = useAuth(`${URL}/getcollegegallery`, token)
    const [gallery, setgallery] = useState([])
    const [status, setstatus] = useState(true)

    useEffect(() => {
        if (data?.galleries) {
            setgallery(data?.galleries)
        }
    }, [data])

    if (error) return alert(error)
    if (!data) return <p>Loading...</p>

    // delete gallery
    const deletegallery = async (image) => {
        const postId = image?.postid
        if (!postId) return;
        // if (!status) return;
        try {
            setstatus(false)
            const res = await axios.delete(`${URL}/deletegallery/${postId}`, {
                data: { image },
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setstatus(true)
            if (err.response.status === 400 || err.response.status === 500 || err?.response?.status === 404) {
                alert(err.response.data.message)
            }
        }
    }

    return (
        <div className='top-gallery-page'>
            {
                gallery.length === 0 ? <p>No image created yet</p> : gallery.map((image, index) => {
                    return (
                        <div className='main-gallery-sec'>
                            <button onClick={() => deletegallery(image)} style={{ cursor: status ? 'cursor' : 'not-allowed' }}><ClearRoundedIcon /></button>
                            <img src={image.fileurl} alt="" />
                            <p>{image.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Managegallery
