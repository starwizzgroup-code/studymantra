import React from 'react'
import fb from '../../Image/fb.png'
import ig from '../../Image/ig.png'
import ins from '../../Image/in.png'
import yt from '../../Image/yt.png'
import tw from '../../Image/tw.png'

const FooterDisclaimer = () => {
  return (
    <div className='footer-desclaimer'>

      <div id='links-sec'>
        <div className='links'>
          <h3>About</h3>
        </div>
        <div className='links'>
          <h3>Why Study Mantra</h3>
        </div>
        <div className='links'>
          <h3>Our Services</h3>
        </div>
        <div className='links'>
          <h3>Become a Partner</h3>
        </div>
        <div className='links'>
          <h3>Contact Us</h3>
        </div>
        <div className='links'>
          <h3>Ask Any Quetion</h3>
        </div>
        <div className='links'>
          <h3>Privacy Policy</h3>
        </div>
      </div>
      {/* disclaimer */}
      <div id='disclaimer'>
        <p>The information provided on this website is for general informational and guidance purposes only. We act as an education consultancy and counseling platform to assist students in exploring colleges, universities, and courses. We are not a university or an awarding body.
          Admission, eligibility criteria, fees, course structure, rankings, approvals, scholarships, and placement details are subject to change and are governed solely by the respective universities, colleges, regulatory authorities, and government bodies. We do not guarantee admission, seat confirmation, scholarships, placements, or outcomes of any kind.
          All final admission decisions, offer letters, fee payments, and enrollments are made directly by the respective institutions. Students are advised to verify all information from official university or college websites before taking any decision.
          We shall not be held responsible for any loss, damage, or inconvenience arising due to reliance on the information provided on this website. Any action taken by users based on the information available here is strictly at their own risk.
          This website may contain links to third-party websites. We do not control or endorse the content, services, or accuracy of information provided by such external websites.</p>
      </div>
      <div className='social-links'>
        <div>
          <img src={fb} alt="" />
        </div>
        <div>
          <img src={ig} alt="" />
        </div>
        <div>
          <img src={ins} alt="" />
        </div>
        <div>
          <img src={yt} alt="" />
        </div>
        <div>
          <img src={tw} alt="" />
        </div>
      </div>

      <p id='rsrvd'>@2026 Study Mantra, Inc. All Rights Reserved</p>

    </div>
  )
}

export default FooterDisclaimer
