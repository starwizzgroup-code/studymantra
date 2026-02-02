import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const Managegallery = () => {
    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [gallery, setgallery] = useState([])
    const [status, setstatus] = useState(true)

    // get college gallery
    useEffect(() => {
        const get_gallery = async () => {
            try {
                const res = await axios.post(`${URL}/getcollegegallery`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setgallery(res?.data)
            } catch (err) {
                if (err.response.status === 404 || err.response.status === 403 || err.response.status === 500) {
                    alert(err.response.data.message)
                }
            }
        }
        if (token) {
            get_gallery()
        }
    }, [token, URL])

    // delete gallery
    const deletegallery = async (image) => {
        if (!status) return;
        try {
            setstatus(false)
            const res = await axios.delete(`${URL}/deletegallery`, {
                data: { image },
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            if (err.response.status === 400 || err.response.status === 500) {
                alert(err.response.data.message)
                setstatus(true)
            }
        }
    }

    return (
        <div className='top-gallery-page'>
            {
                gallery.length === 0 ? <p>No image created yet</p> : gallery.map((image, index) => {
                    return (
                        <div className='main-gallery-sec'>
                            <button onClick={() => deletegallery(image)} style={{cursor: status?'cursor':'not-allowed'}}><ClearRoundedIcon /></button>
                            <img src={image.file} alt="" />
                            <p>{image.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Managegallery
