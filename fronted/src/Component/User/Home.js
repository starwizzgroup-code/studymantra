import React, { useState } from 'react'
import UserHeader from './UserHeader'
import SearchCollege from './SearchCollege'
import Slider from '../Others/Slider'
import Explore from '../Others/Explore'
import FindUsPage from '../Others/FindUsPage'
import Footer from '../Others/Footer'

const Home = () => {
  const [showsearch, setshowsearch] = useState(false)
  const [showexplore, setshowexplore] = useState(false)
  const searchpopup = () => {
    setshowsearch(prev => !prev)
  }
  const explorepopup = () => {
    setshowexplore(prev => !prev)
  }

  return (
    <div className='top-page'>

      <UserHeader searchpopup={searchpopup} explorepopup={explorepopup} />
      <div className='admin-profile'>
        <div className='child-profile' style={{ width: '100%', padding: '0px' }}>

          {/* component */}
          {showsearch ? <SearchCollege searchpopup={searchpopup} />
            : showexplore ? <Explore/>
              :
              <>
                <Slider />
                <Explore />
                <FindUsPage />
                <Footer/>
              </>
          }

        </div>
      </div>

    </div>
  )
}

export default Home
