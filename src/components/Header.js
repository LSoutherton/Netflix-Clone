import React, { useEffect, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import axios from './axios';
import requests from './Requests';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { selectProfile } from '../features/profileSlice';

const Header = ({ movie }) => {

  const profile = useSelector(selectProfile);

  const [screenSize, setScreenSize] = useState(window.innerWidth < 500);
  
  const updateView = () => {
    setScreenSize(window.innerWidth < 500);
  }

  useEffect(() => {
    window.addEventListener('resize', updateView);
    return () => window.removeEventListener('resize', updateView);
  });

  const [list, setList] = useState();

  useEffect(() => {
    async function fetchData() {
        const request = await axios.get(requests.fetchActionMovies);
        setList(request.data.results);
        return request;
    }
    fetchData();
  }, [])

  return (
    <div className='hide-scroll'>
        {screenSize ? '' : (
        <div className='absolute bottom-1/4 left-12'>
            <h1 className='text-white z-100 text-6xl font-bold text-shadow'>
                {movie.title}
            </h1>
            <div className='w-44 mt-6 mb-6'>
                <Link to='/More' state={{movie: movie, list: list}} className='text-white bg-gray-500 w-40 h-10 rounded p-2 pl-3 pr-3 text-lg font-semibold'>
                    <InfoOutlinedIcon className='mb-0.5'/>
                    <span className='pl-1'>More Info</span>
                </Link>
            </div>
            <p className='text-base w-full mb-1 text-shadow text-white z-100 font-bold'>
                {movie.overview}
            </p>
        </div>)}
        <div className={screenSize ? 'sticky grid grid-cols-2 h-14' : 'w-full h-14 absolute grid text-black grid-cols-2 z-1000'}>
            <div className='text-center'>
                <img className='m-2 w-36' src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' />
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
        <div className={screenSize ? 'w-full bg-contain' : 'w-full h-screen bg-contain'}>
            <img className={screenSize ? 'm-10 mt-0 w-5/6 rounded relative' : 'w-full h-full object-cover relative -z-10 mask'} src={screenSize ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
            {screenSize ? (<div className='-mt-16 h-12 w-full flex ml-4'>
                <Link to='/More' state={{movie: movie, list: list}} className='z-10 text-black text-center pt-2 bg-white w-12 h-full text-xl rounded-full -mt-2 font-bold box-shadow border-1 border-black white-background-fade'>
                    <span className=''></span>
                    <InfoOutlinedIcon />
                </Link>
            </div>) : ''}
        </div>
    </div>
  )
}

export default Header