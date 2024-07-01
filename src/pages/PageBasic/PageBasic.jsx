import React, { useContext } from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer'
import { AuthContext } from '../../context/AuthContext'
import style from "./PageBasic.module.css"
import { Outlet } from 'react-router-dom'

const PageBasic = () => {
    const { isAuthentication } = useContext(AuthContext);

  return (
    <>
     {isAuthentication && <Navbar />} 
        <div className={style.basic}>
            <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default PageBasic