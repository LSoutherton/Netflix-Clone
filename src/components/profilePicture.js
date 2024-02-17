import React, { useState } from 'react'

function ProfilePicture({ picture, held, handleClick }) {

  return (
    <button onClick={handleClick} className='h-fit rounded-md mt-4'>
        <img className={held ? 'rounded-md border-yellow-400 border-2' : 'rounded-md'} src={picture} />
    </button>
  )
}

export default ProfilePicture