import React from 'react'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const EditCollegeBoradAuthority = ({ updateprofile, setupdateprofile }) => {

    const updateboard = (e) => {
        const { name, value } = e.target
        setupdateprofile(prev => {
            const isExist = prev.boardauthority.includes(value)
            if (isExist) {
                return prev;
            }
            return {
                ...prev,
                boardauthority: [...prev.boardauthority, value]
            }
        })
    }

    const deleteboard = (board) => {
        setupdateprofile(prev => ({
            ...prev,
            boardauthority: [...prev.boardauthority.filter(val => val !== board)]
        }))
    }


    return (
        <div>
            <label>Board Authority</label>
            <div className='board-sec'>
                {updateprofile?.boardauthority.length > 0 && (
                    updateprofile?.boardauthority.map((board, index) => {
                        return (
                            <div className='board'>
                                <p>{board}</p>
                                <button onClick={() => deleteboard(board)}><ClearRoundedIcon fontSize='extrasmall' /></button>
                            </div>
                        )
                    })
                )}
            </div>
            <select name="boardauthority" id="board" onChange={updateboard} required value={updateprofile?.boardauthority}>
                <option value="">Select Board</option>

                {/* State Boards */}
                <option value="HBSE">HBSE</option>
                <option value="UPMSP">UPMSP</option>
                <option value="RBSE">RBSE</option>
                <option value="BSEB">BSEB</option>
                <option value="MPBSE">MPBSE</option>
                <option value="MSBSHSE">MSBSHSE</option>
                <option value="PSEB">PSEB</option>
                <option value="GSEB">GSEB</option>
                <option value="CGBSE">CGBSE</option>
                <option value="WBBSE">WBBSE</option>
                <option value="BSE_ODISHA">BSE Odisha</option>
                <option value="TBSE">TBSE</option>
                <option value="BSE_ASSAM">BSE Assam / AHSEC</option>
                <option value="AP_SSC">AP SSC</option>
                <option value="TS_SSC">TS SSC</option>
                <option value="KSEEB">KSEEB</option>
                <option value="KERALA">KBPE / DHSE</option>
                <option value="NBSE">NBSE</option>
                <option value="JKBOSE">JKBOSE</option>

                {/* National / International Boards  */}
                <option value="CBSE">CBSE</option>
                <option value="CISCE">CISCE</option>
                <option value="ICSE">ICSE</option>
                <option value="ISC">ISC</option>
                <option value="NIOS">NIOS</option>
                <option value="IB">IB</option>
                <option value="CAIE">CAIE / IGCSE</option>
            </select>

        </div>
    )
}

export default EditCollegeBoradAuthority
