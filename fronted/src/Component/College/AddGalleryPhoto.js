import React, { useContext, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { AuthContext } from '../../App'
import axios from 'axios'

const AddGalleryPhoto = () => {

    const { user, role, token } = useContext(AuthContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [status, setstatus] = useState(true)
    const [filedata, setfiledata] = useState({
        file: '',
        title: ''
    })

    // handle file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const fileurl = reader.result
            setfiledata(prev => ({ ...prev, file: fileurl }))
        };
        reader.readAsDataURL(file);
    };

    // clear image
    const clearimage = (e) => {
        e.preventDefault()
        setfiledata(prev => ({ ...prev, file: '' }))
    }

    // add gallery
    const add_gallery = async (e) => {
        e.preventDefault()
        // if (!status) return;
        const isempty = Object.values(filedata).some(val => val === undefined || val === '' || val === null)
        if (isempty) return alert('Fill up all information')
        try {
            setstatus(false)
            const res = await axios.post(`${URL}/addgallery`, {filedata}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            if(err.response.status === 400 || err.response.status === 404 || err.response.status === 500){
                alert(err.response.data.message)
            }
        }
    }

    return (
        <div className='add-gallery-page'>
            <div className='add-gallery-sec'>

                <form onSubmit={add_gallery}>
                    <div className='main-sec-file'>
                        {
                            !filedata?.file ? <div className='sel-files'>
                                <label for="file" style={{ cursor: 'pointer' }}><AddRoundedIcon fontSize='large' /></label>
                                <input type="file" name="file" id="file" onChange={handleFileChange} style={{ display: 'none' }} />
                            </div> :
                                <div className='sel-files'>
                                    <button onClick={clearimage}><ClearRoundedIcon /></button>
                                    <img src={filedata?.file} alt="" />
                                </div>
                        }
                    </div>

                    <div>
                        <input type="text" name="title" id="" onChange={(e) => setfiledata(prev => ({ ...prev, title: e.target.value }))} placeholder='Title of image' />
                        <button type='submit'>{status ? 'Add' : 'Wait'}</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddGalleryPhoto
