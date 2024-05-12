import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import FastMenu from '../components/FastMenu/FastMenu';
import './Home.css'
import Docs from '../components/Docs/Docs';
import QuickSearch from '../components/QuickSearch/QuickSearch';
import Publication from '../components/Publication/Publication';
import License from '../components/License/License';
import Preloader from '../assets/preloader.gif'
import { AuthContext } from '../context/AuthContext';



const Home = () => {
  
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Polícia DOP - Home";
  }, []);



  if(loading) {
    return (
      <div className='preloader'>
        <img src={Preloader} alt="" />
      </div>
    )
  }

  return (
    <div className='body'>
      <div className='one'>
        <FastMenu />
        <Docs />
      </div>
      <div className='two'>
        <QuickSearch />
      </div>
      <div className="try">
        <h1>Publicações</h1>
        <Publication />
        <Publication />
        <Publication />
        <License />
      </div>

    </div>
  )
}

export default Home