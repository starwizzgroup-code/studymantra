import React from 'react'

const CounselorPermission = ({ permission, setCounselorPayload}) => {

    const handlepermission = (e) => {
        const {name, checked} = e.target
        console.log(checked)
        setCounselorPayload(prev => ({
            ...prev, 
            permissions: {
                ...prev.permissions,
                [name] : checked
            }
        }))
    }

    return (
        <div className='counselor-permissions'>
            {
                permission && (
                    Object.entries(permission).map(([key, value]) => (
                        <div className='permission-field'>
                            <input type="checkbox" name={key} id="" checked={value} onChange={handlepermission}/>
                            <label>{key}</label>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default CounselorPermission
