import React from 'react'
import Preload from '../../assets/preloader.gif'
import './preloader.css'

const Preloader = () => {
  return (
    <div className="preloader" >
        <img src={Preload} alt="Loading..." />
    </div>
  )
}

export default Preloader