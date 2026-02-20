import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import YourApplication from './YourApplication';
import '../../Styles/ManageCourse.css'
import useAuth from '../../Hooks/useAuth';
import { AuthContext } from '../../App';
import { FaAngleLeft } from "react-icons/fa6";

const Application = () => {
  const { user, role, token } = useContext(AuthContext)
  const URL = process.env.REACT_APP_SERVER_URL
  const { data, error } = useAuth(`${URL}/getuser_application`, token)
  const [Applications, setApplication] = useState([])
  const Navigate = useNavigate()

  useEffect(() => {
    if (data?.applications) {
      setApplication(data?.applications)
    }
  }, [data])
  if (error) return alert(error)
  if (!data) return <p>Loading...</p>

  return (
    <div className='top-page'>

      {/* <UserHeader /> */}
      <div className='admin-profile'>
        <div className='child-profile'>
          {/* page title */}
          <div id='page-title'>
            <p onClick={() => Navigate(-1)}>Home</p>
            <span><FaAngleLeft fontSize={14} /></span>
            <h1>Applicaitons</h1>
          </div>

          {/* component */}
          <YourApplication Applications={Applications} />

        </div>
      </div>

    </div>
  )
}

export default Application
