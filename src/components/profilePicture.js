import React, { useState } from 'react'

function ProfilePicture({ picture, held, handleClick }) {

  return (
    <button onClick={handleClick} className={`${held ? 'border-2 border-yellow-400' : ''} h-fit rounded-md mt-4`}>
        <img className='rounded-md' src={picture} />
    </button>
  )
}

export default ProfilePicture