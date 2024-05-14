import React from 'react'
import Preload from '../../assets/preloader.gif'
import './preloader.css'

const Preloader = ({shoWstatus}) => {
  return (
    <div className={ shoWstatus ? 'preloader' : "preloaderActive" }>
        <img src={Preload} alt="" />
    </div>
  )
}

export default Preloader