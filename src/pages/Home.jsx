import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import FastMenu from '../components/FastMenu/FastMenu';
import './Home.css'
import Docs from '../components/Docs/Docs';
const Home = () => {
  useEffect(() => {
    document.title = "Polícia DOP - Home"; 
  }, []);


  return (
    <div className='body'>

      <FastMenu />
      <Docs />
    
    </div>
  )
}

export default Home