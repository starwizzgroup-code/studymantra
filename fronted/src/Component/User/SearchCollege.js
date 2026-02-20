import React, { useState } from 'react'
import '../../Styles/SearchCollege.css'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import axios from 'axios'
import building from '../../Image/building.jpg'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useNavigate } from "react-router-dom";

const SearchCollege = ({ searchpopup }) => {
  const URL = process.env.REACT_APP_SERVER_URL
  const [searchcollege, setsearchcolleges] = useState([])
  const Navigate = useNavigate()

  // search college
  const search_college = async (e) => {
    const query = e.target.value

    if (!query.trim()) {
      setsearchcolleges([])
      return;
    }
    const fetchcollege = async () => {
      try {
        const res = await axios.post(`${URL}/searchcollege`, { query })
        setsearchcolleges(res.data)
      } catch (err) {
        if (err.response.status === 500) {
          alert(err.response.data.message)
        }
      }
    }
    fetchcollege()
  }

  const getCollegedetails = async (college) => {
    const collegeId = college?._id
    Navigate(`/home/collegedetail/${collegeId}`)
  }

  return (
    <div className='search-college-page'>
      <div className='search-page'>

        <div className='search-bar-page'>
          <div className='search'>
            <form>
              <span><SearchRoundedIcon /></span>
              <input type="text" name="search" id="" onChange={search_college} placeholder='Search for college' />
            </form>
          </div>
          <button onClick={searchpopup}><ClearRoundedIcon /></button>
        </div>

        <div className='collegse-popup'>
          {searchcollege.length > 0 && (
            searchcollege.map((college, index) => (
              <div className='college-sec' key={index} onClick={() => getCollegedetails(college)}>
                <div className='college-logo-secc'>
                  <img src={college?.logo ? college?.logo : building} alt="" />
                </div>
                <div className='college-Details'>
                  <h3>{college?.collegename}</h3>
                  <p>{college?.institutecategory}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default SearchCollege
