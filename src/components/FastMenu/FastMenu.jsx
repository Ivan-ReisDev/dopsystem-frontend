import React from 'react'
import { FaAddressBook,
  FaArrowAltCircleUp,
  FaArrowCircleDown,
  FaExclamationTriangle,
  FaSuitcase,
  FaDollarSign    
 } from "react-icons/fa";

 import { GiExitDoor } from "react-icons/gi";
 import { IoIosSpeedometer } from "react-icons/io";


import { Link } from 'react-router-dom'
const FastMenu = () => {

const user = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));


  return (
    <div className='contentBodyElement'>
        <div className='contentBodyElementTitle'>
            <h3>Menu Rápido</h3>
        </div>
        <ul>
            { user && user.userType === "Admin" && <li><Link to='/'>DPanel <span><IoIosSpeedometer /></span></Link></li>}
            <li><Link to='/'>Aulas <span>< FaAddressBook/></span></Link></li>
            <li><Link to='/'>Promoções <span><FaArrowAltCircleUp /></span> </Link></li>
            <li><Link to='/'>Advertências <span><FaExclamationTriangle /></span></Link></li>
            <li><Link to='/'>Rebaixamento <span><FaArrowCircleDown /></span></Link></li>
            <li><Link to='/'>Demissão <span> <GiExitDoor/></span></Link></li>
            <li><Link to='/'>Contratos <span><FaSuitcase /></span> </Link></li>
            <li><Link to='/'>Vendas <span><FaDollarSign /></span></Link></li>
        </ul>
    </div>
  )
}

export default FastMenu