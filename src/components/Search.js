import React, { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';
import axios from './axios';
import requests from './Requests';
import { Link } from 'react-router-dom';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Search = ({ list }) => {

  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const request = await axios.get(requests.fetchTopRated);
        setTrending(request.data.results);
        return request;
    }
    fetchData();
    }, [])

    const [screenSize, setScreenSize] = useState(window.innerWidth < 500);
  
    const updateView = () => {
      setScreenSize(window.innerWidth < 500);
    }
  
    useEffect(() => {
      window.addEventListener('resize', updateView);
      return () => window.removeEventListener('resize', updateView);
    });

  const displayTrending = trending.map((movie) => {
    return (
        <Link to='/More' state={{movie: movie, list: list}} className='grid grid-cols-6 p-1 pl-2 pr-2'>
            <img key={movie.id} className={screenSize ? 'col-span-2 rounded' : 'col-span-1 rounded'} src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
            <div className={screenSize ? 'col-span-3 text-white flex m-auto ml-4 font-semibold text-base' : 'col-span-4 text-white flex m-auto ml-4 font-semibold text-2xl'}>
                {movie.title}
            </div>
            <div className='text-white flex m-auto'>
                {screenSize ? (
                <PlayCircleOutlineIcon
                    fontSize='large'
                />) : (
                    <>
                        <PlayCircleOutlineIcon
                            fontSize='large'
                        /> <p className='text-2xl pl-2'>Play</p>
                    </>
                )}
            </div>
        </Link>
    )
  })

  const [input, setInput] = useState('');

  const getSearch = (input, list) => {
    if (!input) {
        return list
    }
    return list.filter((movie) => {
        if (movie.title) {
            return (movie.title.toLowerCase()).includes(input.toLowerCase())
        } else {
            return (movie.name.toLowerCase()).includes(input.toLowerCase())
        }
    })
  }

  const filteredList = getSearch(input, list)

  const displayFilteredList = filteredList.map((movie) => {
    return (
      <Link to='/More' state={{movie: movie, list: list}} className={screenSize ? 'block min-w-28 h-44 w-10/12 m-auto rounded mb-4' : 'inline-block min-w-28 ml-2 mr-2 h-56 w-40 m-auto rounded mb-4'}>
        <img key={movie.id} className='block w-full h-full cover rounded ml-1 mr-1' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
      </Link>
    )
  })

  return (
    <div>
        <div className='w-full h-14 text-white mt-4 ml-2 grid grid-cols-10'>
            <Link to='/'>
                <ArrowBackIosNewIcon
                    fontSize='large'
                    className='mt-0.5'
                />
            </Link>
            <div className='col-span-8 w-full h-10 bg-zinc-700 text-zinc-400 rounded'>
                <SearchIcon
                    fontSize='large'
                    className='flex m-auto ml-2 mb-1 mr-2'
                />
                <input 
                    onChange={(e) => {
                    setInput(e.target.value)
                    }} 
                    className='bg-zinc-700 outline-none border-0 text-zinc-400 h-10 rounded w-12/12 placeholder:text-lg'
                    type='text'
                    placeholder='Search'
                />
            </div>
        </div>
        <div className={screenSize ? 'text-white font-semibold text-2xl ml-4 border-t-4 border-red-600 inline-block' : 'text-white font-semibold text-3xl pb-4 ml-4 border-t-4 border-red-600 inline-block'}>
            {input ? `Search Results` : 'Top Trending'}
        </div>
            {input ? <div className={screenSize ? 'grid grid-cols-3 mt-4' : 'text-center'}>{displayFilteredList}</div> : displayTrending}
    </div>
  )
}

export default Search