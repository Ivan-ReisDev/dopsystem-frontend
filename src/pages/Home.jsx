import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  useEffect(() => {
    document.title = "Polícia DOP - Home"; 
  }, []);


  return (
    <div> <Navbar /> </div>
  )
}

export default Home