import React from 'react'
import { Carousel } from 'antd';
import '../../Styles/Cards.css'
import slider1 from '../../Image/slider1.jpg'
import slider2 from '../../Image/slider2.jpg'


const Slider = () => {

  return (
    <div id='slider'>
      <Carousel autoplay>
        <div>
          <img src={slider1} alt="" />
        </div>
        <div>
          <img src={slider2} alt="" />
        </div>
      </Carousel>
    </div>
  )
}

export default Slider
