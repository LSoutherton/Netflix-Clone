import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectUser } from '../features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { selectProfile, unSelect } from '../features/profileSlice';

const Profile = () => {

  const location = useLocation();

  const profile = useSelector(selectProfile)

  const dispatch = useDispatch();

  const logUserOut = () => {
    dispatch(logOut());
    signOut(auth)
        .then(() => {
            dispatch(unSelect());
        })
  }

  return (
    <>
        <div className='sticky grid grid-cols-2 h-14'>
            <div className='text-center'>
                <Link to='/'>
                    <img className='m-2 w-36' src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' />
                </Link>
            </div>     
            <div className='float-right'>
                <Link to='/Profile'>
                    <img className='w-10 rounded float-right m-2' src={profile.picture} />
                </Link>
                <Link to='/Search'>
                    <SearchIcon 
                        fontSize='large'
                        className=' text-white float-right mt-2.5'
                    />
                </Link>     
            </div>
        </div>
        <div>
            <div className='grid grid-rows-5 h-64 w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <img className='h-32 row-span-3 m-auto rounded-lg' src={profile.picture} />
                <p className='text-center text-white text-2xl font-semibold'>
                    {profile.name}
                </p>
                <div className='grid grid-cols-2 m-auto'>
                    <Link to='/Users' state={{manage: true}} className='text-white rounded-lg mr-2 p-2 h-full bg-neutral-600'>
                        Manage Profiles
                    </Link>
                    <button onClick={logUserOut} className='text-white rounded-lg ml-2 p-2 h-full bg-neutral-600'>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile