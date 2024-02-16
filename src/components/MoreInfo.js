import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectProfile } from '../features/profileSlice';

const MoreInfo = () => {

  const location = useLocation();

  const recomended = [];

  let currentFilm = '';

  const profile = useSelector(selectProfile);

  const [screenSize, setScreenSize] = useState(window.innerWidth < 500);
  
  const updateView = () => {
    setScreenSize(window.innerWidth < 500);
  }

  useEffect(() => {
    window.addEventListener('resize', updateView);
    return () => window.removeEventListener('resize', updateView);
  });
  
  location.state.list.forEach((film) => {
    film.genre_ids.forEach((filmGenre) => {
      location.state.movie.genre_ids.forEach((movieGenre) => {
        if (currentFilm === film.id || film.id === location.state.movie.id) {
          return
        } else if (filmGenre === movieGenre && recomended.length < 6) {
          currentFilm = film.id;
          recomended.push(
            <Link to='/More' state={{movie: film, list: location.state.list}}>
              <img className={screenSize ? 'w-3/12 rounded mt-4 ml-4 mr-4 inline-block' : 'width-10 rounded mt-4 ml-4 mr-4 inline-block'} src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} />
            </Link>
          )
        }
      })
    })
  })

  useEffect(() => {
    window.scroll(0, 0)
  }, [location.state.movie])

  return (
    <div>
      <Link to='/' className='absolute w-fit h-fit bg-gray-700 rounded-full p-0.5 cursor-pointer text-white right-2 top-2 z-10'>
        <CloseIcon fontSize='large' />
      </Link>
      <img className='rounded-br-lg rounded-bl-lg mask' src={`https://image.tmdb.org/t/p/original/${location.state.movie.backdrop_path}`} />
      <div className={screenSize ? 'p-4' : 'absolute top-2/3 p-10'}>
        <h2 className={screenSize ? 'text-white text-2xl font-semibold pl-2 pt-2 inline-block' : 'text-white text-4xl font-semibold pl-2 pt-2 inline-block'}>
          {location.state.movie.title || location.state.movie.original_name}
        </h2>
        <p className={screenSize ? 'text-white pr-2 pt-3 text-lg font-semibold inline-block float-right' : 'text-white pr-2 pt-5 text-xl font-semibold inline-block float-right'}>
            {(location.state.movie.release_date) ? (location.state.movie.release_date).slice(0, 4) : (location.state.movie.first_air_date).slice(0, 4)}
          </p>
        <div>
          <p className={screenSize ? 'text-white pl-2 font-semibold' : 'text-white pl-2 font-semibold text-xl'}>
            The Movie DB Rating: <span className='text-green-600 font-bold'>{(location.state.movie.vote_average).toFixed(2)}</span>
          </p>
          <p className={screenSize ? 'text-white text-xl font-bold pl-2 mt-2 pt-2 inline-block' : 'text-white text-2xl font-bold pl-2 mt-2 pt-2 inline-block'}>
            Description
          </p>
          <p className={screenSize ? 'text-white pl-2 pr-2 mt-2 font-semibold pb-2' : 'text-white pl-2 pr-2 text-lg mt-2 font-semibold pb-2'}>
            {location.state.movie.overview}
          </p>
        </div>
        <div className='text-white text-2xl ml-2 font-bold border-t-4 pt-1 mt-1 border-red-600 inline-block'>
          Recomended
        </div>
        <div className='mb-4 w-fit'>
          {recomended}
        </div>
      </div>
    </div>
  )
}

export default MoreInfo