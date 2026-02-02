import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'
import '../../Styles/CollegeApplications.css'
import { listItemSecondaryActionClasses } from '@mui/material/ListItemSecondaryAction'

const ChildUserEnquiry = () => {
  const { user, role, token } = useContext(AuthContext)
  const URL = process.env.REACT_APP_SERVER_URL
  const [enquiry, setenquiry] = useState([])
  const status = ['Pending', 'In-Progress', 'Closed']

  useEffect(() => {
    const get_enquiry = async () => {
      try {
        const res = await axios.post(`${URL}/userenquiry_Atdashboard`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setenquiry(res?.data)
      } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 403 || err?.response?.status === 500) {
          alert(err?.response?.data?.message)
        }
      }
    }
    if (token) {
      get_enquiry()
    }
  }, [token, URL])

  // take action approval, underreview, reject
  const takeaction = async (event, enquiry) => {
    const actionvalue = event.target.value
    const enquiryId = enquiry?.enquiryId
    if (!actionvalue) alert('Something went wrong')
    const isconfirm = window.confirm(`Are you sure you want to ${actionvalue} college?`)
    if (!isconfirm) return;
    try {
      const res = await axios.patch(`${URL}/takeactionOnenquiry`, { actionvalue, enquiryId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      window.location.reload()
    } catch (err) {
      if (err.response.status === 403 || err.response.status === 400 || err.response.status === 404 || err.response.status === 500) {
        alert(err.response.data.message)
      }
    }
  }

  return (
    <div className='colleageapplication-top-page'>

      {/* college applicaitons */}
      <div className='allcollege-applications'>

        {/* btn for pending and approval applications */}
        <div className='pending-approval-btn'>
          {status.length > 0 && (
            status.map((val) => {
              return (
                <button>{val}</button>
              )
            })
          )}
        </div>

        {/* all applications */}
        <div className='main-table-sec'>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Qualification</th>
                <th>Course looking for</th>
                <th>City</th>
                <th>State</th>
                <th>Status</th>
                <th>Action taken by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                enquiry.length > 0 && (
                  enquiry.map((enquiry, index) => {
                    return (
                      <tr>
                        <td>{enquiry?.fullname}</td>
                        <td>{enquiry?.phone}</td>
                        <td>{enquiry?.email}</td>
                        <td>{enquiry?.qualification}</td>
                        <td>{enquiry?.courselookingfor}</td>
                        <td>{enquiry?.city}</td>
                        <td>{enquiry?.state}</td>
                        <td id='status'><p>{enquiry?.Status}</p></td>
                        <td>{enquiry?.actiontakenBy?.counselorName}</td>
                        <td id='action'>
                          <select onChange={(event) => takeaction(event, enquiry)}>
                            <option value="">Select</option>
                            <option value="Pending">Pending</option>
                            <option value="In_Progress">In_Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    )
                  })
                )
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default ChildUserEnquiry
