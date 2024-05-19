import React from 'react'
import { FaAddressBook,
  FaArrowAltCircleUp,
  FaArrowCircleDown,
  FaExclamationTriangle,
  FaSuitcase,
  FaDollarSign    
 } from "react-icons/fa";
 import { Link } from 'react-router-dom';

 import { GiExitDoor } from "react-icons/gi";
 import { IoIosSpeedometer } from "react-icons/io";

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
            <li><Link to={'/promotion'}>Promoções <span><FaArrowAltCircleUp /></span> </Link></li>
            <li><Link to='/warning'>Advertências <span><FaExclamationTriangle /></span></Link></li>
            <li><Link to='/relegation'>Rebaixamento <span><FaArrowCircleDown /></span></Link></li>
            <li><Link to='/resignation'>Demissão <span> <GiExitDoor/></span></Link></li>
            <li><Link to='/contract'>Contratos <span><FaSuitcase /></span> </Link></li>
            <li><Link to='/sale'>Vendas <span><FaDollarSign /></span></Link></li>
        </ul>
    </div>
  )
}

export default FastMenu