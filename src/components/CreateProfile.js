import React, { useState } from 'react'
import ProfilePicture from './profilePicture'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

const CreateProfile = ( {display, setDisplay} ) => {

  const user = useSelector(selectUser);

  const collectionRef = collection(db, user.email);

  const [input, setInput] = useState('');

  const [profilePicturesList, setProfilePicturesList] = useState([
    {
        picture: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg',
        isHeld: false,
        id: 1
    },     {
        picture: 'https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg',
        isHeld: false,
        id: 2
    },     {
        picture: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-dyrp6bw6adbulg5b.jpg',
        isHeld: false,
        id: 3
    },     {
        picture: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-vnl1thqrh02x7ra2.jpg',
        isHeld: false,
        id: 4
    },     {
        picture: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg',
        isHeld: false,
        id: 5
    },     {
        picture: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png',
        isHeld: false,
        id: 6
    },
  ]);

  const renderedPictures = profilePicturesList.map((picture) => {
    return (
        <ProfilePicture
            picture={picture.picture}
            held={picture.isHeld}
            id={picture.id}
            handleClick={() => active(picture.id)}
        />
    )
  })

  const active = (id) => {
    setProfilePicturesList(prevList => prevList.map(picture => {
        return picture.isHeld ?
            {...picture, isHeld: false} :
            picture
    }))
    setProfilePicturesList(prevList => prevList.map(picture => {
        return picture.id === id ?
            {...picture, isHeld: !picture.isHeld} :
            picture
    }))
  }

  const save = () => {
    let selected
    profilePicturesList.forEach((profile) => {
        if (profile.isHeld) {
            selected =  profile.picture
        }
    })

    getDocs(collectionRef)
        .then((data) => {
            let same = false;
            data.docs.forEach((entry) => {
                if (entry.data().name === input) {
                    same = true;
                }
            })
            if (!same) {
                addDoc(collectionRef, {
                    picture: selected,
                    name: input
                })
                setDisplay(prevDisplay => !prevDisplay)
            } else {
                alert('You cannot have two profiles with the same name')
            }
        })
  }
    
  return (
    <div className={display ? 'bg-zinc-800 border-4 border-white grid grid-rows-5 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64' : 'hidden'}>
        <h1 className='text-white text-2xl text-center mt-2'>Create Profile</h1>
        <input onChange={(e) => {
            setInput(e.target.value)
            }}
            className='w-10/12 m-auto h-full pl-2 rounded-md bg-zinc-800 border-2 border-neutral-400 text-neutral-400' type='text' placeholder='Profile name' />
        <div className='grid grid-cols-6 ml-2 gap-x-2 mr-2 row-span-2'>
            {renderedPictures}
        </div>
        <button onClick={save} className='text-lg border-2 border-neutral-400 bg-zinc-800 rounded-md text-neutral-400 w-20 m-auto h-10 mb-4'>
            Save
        </button>
    </div>
  )
}

export default CreateProfile