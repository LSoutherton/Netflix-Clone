import {useEffect, useState, useRef} from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

const Row = ({ title, fetchUrl }) => {

  const [moviesList, setMoviesList] = useState([]);

  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    async function fetchData() {
        const request = await axios.get(fetchUrl);
        setMoviesList(request.data.results);
        return request;
    }
    fetchData();
  }, [fetchUrl]);

  const [screenSize, setScreenSize] = useState(window.innerWidth < 500);
  
  const updateView = () => {
    setScreenSize(window.innerWidth < 500);
  }

  useEffect(() => {
    window.addEventListener('resize', updateView);
    return () => window.removeEventListener('resize', updateView);
  });

  const [scrollPosition, setScrollPosition] = useState(0);

  const containerRef = useRef();

  const handleScrollRight = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  }

  const handleScrollLeft = (scrollAmount) => {
    const newScrollPosition = scrollPosition - scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  }

  return (
    <div className={screenSize ? 'relative' : '-mt-24 mb-32 relative ml-6'}>
        <h2 className={screenSize ? 'text-white text-lg pl-2 font-semibold' : 'text-white text-2xl pl-2 font-semibold ml-4'}>
            {title}
        </h2>
        <div className='relative'>
          <div ref={containerRef} className='show-arrow flex overflow-y-hidden overflow-x-scroll scroll-smooth pr-8 pl-2'>
              {moviesList.map((movie) => (
                (movie.backdrop_path && (
                  <Link to='/More' state={{movie: movie, list: moviesList}} className={screenSize ? 'block min-w-32 rounded ml-1 mr-1' : 'block rounded mr-3 min-w-44'}>
                    <img key={movie.id} className='block w-full h-full rounded ml-1 mr-1 cover' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
                  </Link>
                )
              )))}
          </div>
          {screenSize ? '' : (
            <>
            <button className='arrow absolute left-0.5 text-white bg-black h-3/6 rounded-full top-1/2 -translate-y-1/2 opacity-70' onClick={() => handleScrollLeft(screenSize ? 256 : 352)}>
              <ArrowBackIosOutlinedIcon fontSize='large' />
            </button>
            <button className='arrow absolute right-0.5 text-white bg-black h-3/6 rounded-full top-1/2 -translate-y-1/2 opacity-70' onClick={() => handleScrollRight(screenSize ? 256 : 352)}>
              <ArrowForwardIosOutlinedIcon fontSize='large' />
            </button>
          </>)}
        </div>
    </div>
  )
}

export default Row