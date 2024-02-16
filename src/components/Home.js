import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import LogIn from './LogIn';
import ChooseUser from './ChooseUser';

const Home = ({ movie }) => {

  const user = useSelector(selectUser);
  
  return (
    <>
      {!user ? (
        <LogIn />
      ) : ( 
        <ChooseUser movie={movie} />
      )}
    </>
  )
}

export default Home