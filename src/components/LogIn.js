import React, { useState, useEffect } from 'react'
import { auth, db } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { logIn } from '../features/userSlice'

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const register = () => {
    if (!email) {
        return alert('You must enter an email to register');
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            dispatch(
                logIn({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                })
            )
        })
        .catch(error => alert(error))
  }

  const logInToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
        .then(userAuth => {
            dispatch(logIn({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                picture: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'
            }))
        })
        .catch(error => alert(error))
  }

  const [screenSize, setScreenSize] = useState(window.innerWidth < 500);
  
  const updateView = () => {
    setScreenSize(window.innerWidth < 500);
  }

  useEffect(() => {
    window.addEventListener('resize', updateView);
    return () => window.removeEventListener('resize', updateView);
  });

  return (
    <div className={screenSize ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-rows-4 h-fit w-7/12' : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-rows-4 h-fit w-3/12'}>
        <img className='w-96' src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' />
        <div className='row-span-3 grid grid-rows-3 mt-5'>
            <input value={email} onChange={e => setEmail(e.target.value)} className='h-14 text-neutral-400 text-lg m-auto w-full mb-1 rounded-tr rounded-tl bg-neutral-700 pl-2 placeholder:text-lg' type='text' placeholder='Email' />
            <input value={password} onChange={e => setPassword(e.target.value)} className='h-14 rounded-br text-lg rounded-bl pl-2 placeholder:text-lg bg-neutral-700' type='password' placeholder='Password' />
            <button onClick={(e) => logInToApp(e)} className='h-14 border-2 border-neutral-700 mt-4 text-xl text-neutral-400 rounded-md' type='submit'>Sign In</button>
            <button onClick={register} className='h-14 bg-neutral-700 mt-4 text-xl text-neutral-400 rounded-md'>Register</button>
        </div>
        
    </div>
  )
}

export default LogIn