import { useEffect, useState } from 'react';
import './App.css';
import axios from './components/axios';
import requests from './components/Requests';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import MoreInfo from './components/MoreInfo';
import Search from './components/Search';
import Profile from './components/Profile';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/firebase';
import { logOut, logIn, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ChooseUser from './components/ChooseUser';

function App() {

  const [fullList, setFullList] = useState([]);

  const [movie, setMovie] = useState([]);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    async function fetchData(genre) {
      const request = await axios.get(genre);
      setFullList(prevFullList => [...prevFullList, ...request.data.results]);
    }
    fetchData(requests.fetchTrending)
    fetchData(requests.fetchNetflixOriginals)
    fetchData(requests.fetchTopRated)
    fetchData(requests.fetchActionMovies)
    fetchData(requests.fetchComedyMovies)
    fetchData(requests.fetchHorrorMovies)
    fetchData(requests.fetchRomanceMovies)
    fetchData(requests.fetchDocumentaries)
  }, [])

  const uniqueArray = [...new Map(fullList.map(item => [item.id, item])).values()]

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchActionMovies);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      )
      return request
    }
    fetchData()
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (!userAuth) {
        dispatch(logOut())
      }
    })
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home movie={movie} />} />
        <Route path='/Users' element={user ? <ChooseUser /> : <Navigate to='/' />} />
        <Route path='/Home' element={<ChooseUser />} />
        <Route path='/More' element={<MoreInfo />} />
        <Route path='/Search' element={<Search list={uniqueArray} />} />
        <Route path='/Profile' element={user ? <Profile /> : <Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;