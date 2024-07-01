import React, { useContext } from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer'
import { AuthContext } from '../../context/AuthContext'
import style from "./PageBasic.module.css"
import { Outlet } from 'react-router-dom'
import Cookie from '../../components/Cookie/Cookie';

const PageBasic = () => {
    const { isAuthentication } = useContext(AuthContext);

  return (
    <>
     {isAuthentication && <Navbar />} 
        <div className={style.basic}>
            <Outlet />
        </div>
        <Cookie />
        <Footer />
    </>
  )
}

export default PageBasic