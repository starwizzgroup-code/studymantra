import React from 'react'

const CounselorAddress = ({ handlechange, profile}) => {
    return (
        <div style={{ width: '100%'}}>
            <div className='fulladdress-sec'>
                <h3>Address</h3>

                <div className='permanent-address-sec'>
                    <div className='inp-field adrs'>
                        <label>Permanent Address</label>
                        <input type="text" name="paddress" id="" onChange={handlechange} value={profile?.paddress} placeholder='Address' />
                    </div>
                    <div className='inp-field adrs'>
                        <label>City</label>
                        <input type="text" name="pcity" id="" onChange={handlechange} value={profile?.pcity} placeholder='City' />
                    </div>
                    <div className='inp-field adrs'>
                        <label>State</label>
                        <input type="text" name="pstate" id="" onChange={handlechange} value={profile?.pstate} placeholder='State' />
                    </div>
                    <div className='inp-field adrs'>
                        <label>Pincode</label>
                        <input type="number" name="ppincode" id="" onChange={handlechange} value={profile?.ppincode} placeholder='Pincode' />
                    </div>
                </div>

                <div className='permanent-address-sec'>
                    <div className='inp-field adrs'>
                        <label>Current Address</label>
                        <input type="text" name="caddress" id="" onChange={handlechange} value={profile?.caddress} placeholder='Address' />
                    </div>
                    <div className='inp-field adrs'>
                        <label>City</label>
                        <input type="text" name="ccity" id="" onChange={handlechange} value={profile?.ccity} placeholder='City' />
                    </div>
                    <div className='inp-field adrs'>
                        <label>State</label>
                        <input type="text" name="cstate" id="" onChange={handlechange} value={profile?.cstate} placeholder='State' />
                    </div>
                    <div className='inp-field adrs'>
                        <label>Pincode</label>
                        <input type="number" name="cpincode" id="" onChange={handlechange} value={profile?.cpincode} placeholder='Pincode' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CounselorAddress
