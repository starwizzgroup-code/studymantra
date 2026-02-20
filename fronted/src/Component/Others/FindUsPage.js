import React from 'react'
import studymarntralogo from '../../Image/studymantra.svg'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import whatsappicons from '../../Image/whatsapp icon.png'

const FindUsPage = () => {
    return (
        <div className='findusepage'>
            <div className='child-finduspage'>
                <h3 style={{ fontSize: '18px' }}>Find Us</h3>
                <div className='tnchild-finduppage' style={{ marginTop: '10px' }}>
                    <img src={studymarntralogo} alt="" id='finduslogo' />
                    <div className='findus-content'>
                        <div className='findus-sec'>
                            <p>New Student</p>
                            <h3><LocalPhoneRoundedIcon fontSize='extrasmall' /> 1800-420-5437</h3>
                        </div>
                        <div className='findus-sec'>
                            <p>Existing Student</p>
                            <h3 style={{ marginBottom: '15px' }}><LocalPhoneRoundedIcon fontSize='extrasmall' /> 1800-420-5437</h3>
                            <p>Existing Student</p>
                            <h3><img src={whatsappicons} alt="" /> +91 8592749384</h3>
                            <p>Email</p>
                            <h3>studymantra@gmail.com</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindUsPage
