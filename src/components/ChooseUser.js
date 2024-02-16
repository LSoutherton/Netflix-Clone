import React, { useEffect, useState } from 'react'
import Row from './Row';
import requests from './Requests';
import Header from './Header';
import { useSelector } from 'react-redux';
import { selectUser, logOut } from '../features/userSlice';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import CreateProfile from './CreateProfile';
import { useLocation } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { select, selectProfile, unSelect } from '../features/profileSlice';

const ChooseUser = ({ movie }) => {

  const user = useSelector(selectUser);

  const profile = useSelector(selectProfile);

  const collectionRef = collection(db, user.email);

  const dispatch = useDispatch();

  const [profilesFinal, setProfilesFinal] = useState([]);

  const [display, setDisplay] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const location = useLocation();

  const manage = location.state ? true : false;

  const [screenSize, setScreenSize] = useState(window.innerWidth < 500);
  
  const updateView = () => {
    setScreenSize(window.innerWidth < 500);
  }

  useEffect(() => {
    window.addEventListener('resize', updateView);
    return () => window.removeEventListener('resize', updateView);
  });

  useEffect(() => {
    getDocs(collectionRef)
        .then((data) => {
            let profiles = [];
            data.docs.forEach((profile) => {
                profiles.push({ ...profile.data() })
            })
            setProfilesFinal(profiles)
        })
  }, [display, refresh, profile])

  const deleteProfile = (selected) => {
    getDocs(collectionRef)
        .then((data) => {
            let chosenProfile = [];
            data.docs.forEach((entry) => {
                if (entry.data().picture === selected.picture && entry.data().name === selected.name) {
                    chosenProfile = entry._document.key.path.segments[6];
                }
            })

            if (profile.picture === selected.picture && profile.name === selected.name) {
                dispatch(logOut());
                dispatch(unSelect());
                signOut(auth)
                    .then(() => {
                        alert('You have deleted the active profile and have been logged out.')
                    })
            }

            const deleteRef = doc(db, user.email, chosenProfile)

            deleteDoc(deleteRef)
                .then(() => {
                    setRefresh(prevRefresh => !prevRefresh)
                })
        })
  }

  const finalList = profilesFinal.map((profile) => {
    return (
        <div className={screenSize ? 'inline-block ml-6 mr-6' : 'inline-block ml-4 mr-4'}>
            <button
                onClick={manage ? () => deleteProfile(profile) : 
                    () => {
                        dispatch(select({
                            picture: profile.picture,
                            name: profile.name
                        }))
                    }
                }
                className='m-auto flex relative'>
                <img className={screenSize ? 'w-24 rounded-md relative z-1' : 'w-36 rounded-md relative z-1'} src={profile.picture} />
                {manage ? <div className='background-fade absolute w-full h-full z-10 rounded-md text-white'>
                    <DeleteForeverIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' fontSize='large' />
                </div> : ''}
            </button>
            <p className='text-center text-neutral-400 text-lg pt-1'>
                {profile.name}
            </p>
        </div>
    )
  })

  const [create, setCreate] = useState(true);

  useEffect(() => {
    if (profilesFinal.length >= 5) {
        setCreate(false)
      } else {
        setCreate(true)
      }
  }, [profilesFinal])

  return (
    <>
        {!profile ? (
            <>
                <div className={screenSize ? 'absolute top-42 w-full left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-scroll no-scrollbar' : 'absolute top-1/3 -translate-y-1/2 w-full left-1/2 -translate-x-1/2 overflow-scroll no-scrollbar'}>
                    <div className={screenSize ? 'text-white text-4xl text-center mt-10 col-span-2' : 'text-white text-4xl text-center mt-20 col-span-2'}>
                        Who's Watching?
                    </div>
                    <div className={screenSize ? 'w-fit m-auto mt-10 text-center' : 'w-fit m-auto mt-20 text-center'}>
                        {finalList}
                        {create ? (<div className='text-center inline-block ml-4 mr-4'>
                            <button onClick={() => setDisplay(prevDisplay => !prevDisplay)} className={screenSize ? 'text-white text-6xl m-auto pb-4 border-2 border-neutral-400 w-24 h-24 rounded-md' : 'text-white text-8xl m-auto pb-6 border-2 border-neutral-400 w-36 h-36 rounded-md'}>
                                +
                            </button>
                            <p className='text-center text-neutral-400 text-lg pt-1 h-full w-full'>
                                Create New
                            </p>
                        </div>) : ''}
                    </div>
                </div>
                <CreateProfile
                    display={display}
                    setDisplay={setDisplay}
                />
            </>
            ) : (
            <>
                {manage ? 
                <>
                <Link to='/Profile' className='cursor-pointer absolute top-4 left-4 text-white z-10'>
                    <ArrowBackIosIcon fontSize='large' />
                </Link>
                <div className={screenSize ? 'absolute top-42 w-full left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-scroll no-scrollbar' : 'fixed top-0 w-full left-1/2 -translate-x-1/2 overflow-scroll no-scrollbar'}>
                    <div className={screenSize ? 'text-white text-4xl text-center mt-10 col-span-2' : 'text-white text-4xl text-center mt-20 col-span-2'}>
                        Manage Profiles
                    </div>
                    <div className={screenSize ? 'w-fit m-auto mt-10 text-center' : 'w-fit m-auto mt-20 text-center'}>
                        {finalList}
                        {create ? (<div className='text-center inline-block ml-4 mr-4'>
                            <button onClick={() => setDisplay(prevDisplay => !prevDisplay)} className={screenSize ? 'text-white text-6xl m-auto pb-4 border-2 border-neutral-400 w-24 h-24 rounded-md' : 'text-white text-8xl m-auto pb-6 border-2 border-neutral-400 w-36 h-36 rounded-md'}>
                                +
                            </button>
                            <p className='text-center text-neutral-400 text-lg pt-1 h-full w-full'>
                                Create New
                            </p>
                        </div>) : ''}
                    </div>
                </div>
                <CreateProfile
                    display={display}
                    setDisplay={setDisplay}
                /> 
                </>: 
                <div className="w-full h-14">
                    <Header
                    movie={movie}
                    />
                    <Row
                    title='Trending'
                    fetchUrl={requests.fetchTrending}
                    />
                    <Row
                    title='Netflix Originals'
                    fetchUrl={requests.fetchNetflixOriginals}
                    />
                    <Row
                    title='Top Rated'
                    fetchUrl={requests.fetchTopRated}
                    />
                    <Row
                    title='Action'
                    fetchUrl={requests.fetchActionMovies}
                    />
                    <Row
                    title='Comedy'
                    fetchUrl={requests.fetchComedyMovies}
                    />
                    <Row
                    title='Horror'
                    fetchUrl={requests.fetchHorrorMovies}
                    />
                    <Row
                    title='Romance'
                    fetchUrl={requests.fetchRomanceMovies}
                    />
                    <Row
                    title='Documentaries'
                    fetchUrl={requests.fetchDocumentaries}
                    />
                </div>}
            </>
        )}
    </>
  )
}

export default ChooseUser