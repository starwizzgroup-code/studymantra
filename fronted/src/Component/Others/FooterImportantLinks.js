import React from 'react'
import logo from '../../Image/studymantra.svg'

const FooterImportantLinks = () => {
  return (
    <div className='top-footer-links'>
      <div>
        <img src={logo} alt="" id='footer-logo'/>
      </div>
      <div>
        <h3>Important Links</h3>
        <ul id='footerul'>
            <li>Top University</li>
            <li>Top Colleges</li>
            <li>About Us</li>
        </ul>
      </div>
      <div>
        <h3>Study in Abroad</h3>
        <ul id='footerul'>
            <li>Canada</li>
            <li>Germany</li>
            <li>USA</li>
        </ul>
      </div>
      <div>
        <h3>MBBS Study in India/Abroad</h3>
        <ul id='footerul'>
            <li>Canada</li>
            <li>Germany</li>
            <li>USA</li>
        </ul>
      </div>
    </div>
  )
}

export default FooterImportantLinks
