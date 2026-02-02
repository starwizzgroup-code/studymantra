import React from 'react'

const UpdateName = () => {
  return (
    <div className='update-name-page'>

      <div className='updatenam-header'>
        <div>
          <h3>FullName</h3>
          <p>FullName</p>
        </div>
        <button>Update</button>
      </div>

      <div className='update-sec' style={{display:'none'}}>
        <input type="text" name='fullname' id='' placeholder='New name' />
        <button>Save</button>
      </div>

    </div>
  )
}

export default UpdateName
