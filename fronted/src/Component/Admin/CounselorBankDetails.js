import React from 'react'

const CounselorBankDetails = ({handlechange, profile}) => {
    return (
        <div className='bank-details-sec'>
            <h3>Bank Details</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                <div className='inp-field'>
                    <label>Account Holder Name</label>
                    <input type="text" name="holdername" id=""  onChange={handlechange} value={profile?.holderName} placeholder='Holder Name' />
                </div>
                <div className='inp-field'>
                    <label>Bank Name</label>
                    <input type="text" name="bankname" id="" onChange={handlechange} value={profile?.bankName} placeholder='Bank Name' />
                </div>
                <div className='inp-field'>
                    <label>Account Number</label>
                    <input type="number" name="accNumber" id="" onChange={handlechange} value={profile?.accNumber} placeholder='Account Number' />
                </div>
                <div className='inp-field'>
                    <label>IFSC Code</label>
                    <input type="text" name="ifscCode" id="" maxLength={11} onChange={handlechange} value={profile?.ifscCode} placeholder='IFSC Code' />
                </div>
                <div className='inp-field'>
                    <label>Branch Address</label>
                    <input type="text" name="branchaddress" id="" onChange={handlechange} value={profile?.branchAddress} placeholder='Branch Address' />
                </div>
                <div className='inp-field'>
                    <label>UPI ID</label>
                    <input type="text" name="upiId" id="" onChange={handlechange} value={profile?.upiId} placeholder='UPI ID' />
                </div>
                <div className='inp-field'>
                    <label>PAN Card <span>(optional)</span></label>
                    <input type="text" name="panCard" id="" maxLength={10} onChange={handlechange} value={profile?.panCard} placeholder='PAN Card' />
                </div>
            </div>

        </div>
    )
}

export default CounselorBankDetails
