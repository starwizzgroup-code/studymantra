import React from 'react'
import FooterImportantLinks from './FooterImportantLinks'
import FooterTopCollegesCourses from './FooterTopCollegesCourses'
import FooterDisclaimer from './FooterDisclaimer'
import '../../Styles/Footer.css'

const Footer = () => {
    return (
        <div className='top-footer'>
            <div className='tnfooter'>
                <FooterImportantLinks />
                <FooterTopCollegesCourses />
                <FooterDisclaimer/>
            </div>
        </div>
    )
}

export default Footer
