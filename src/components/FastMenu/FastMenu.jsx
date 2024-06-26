import React from 'react'
import {
  FaArrowAltCircleUp,
  FaArrowCircleDown,
  FaExclamationTriangle,
  FaSuitcase,
  FaDollarSign,
  FaStackOverflow
} from "react-icons/fa";
import { TbLicense } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { MdPostAdd } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";
import { IoIosSpeedometer } from "react-icons/io";

const FastMenu = () => {

  const user = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

  return (
    <div className='contentBodyElement'>
      <div className='contentBodyElementTitle'>
        <h3 className='flex items-center'><span className='mr-2'><FaStackOverflow/></span> Menu Rápido</h3>
      </div>
      <ul>
        {user && user.userType === "Admin" && <li><Link to='/dpanel'>DPanel <span><IoIosSpeedometer /></span></Link></li>}
        <li><Link to={'/postclasse'}>Postar Curso Inicial<span><MdPostAdd /></span> </Link></li>
        <li><Link to={'/promotion'}>Promoções <span><FaArrowAltCircleUp /></span> </Link></li>
        <li><Link to='/warning'>Advertências <span><FaExclamationTriangle /></span></Link></li>
        <li><Link to='/relegation'>Rebaixamento <span><FaArrowCircleDown /></span></Link></li>
        <li><Link to='/resignation'>Demissão <span> <GiExitDoor /></span></Link></li>
        <li><Link to='/contract'>Contratos <span><FaSuitcase /></span> </Link></li>
        {(user && (user.userType === "Admin" || user.userType === "Diretor" || user.userType === "Recursos Humanos")) &&
          <li><Link to='/endorsement'>Avais <span><TbLicense /></span></Link></li>}
        {(user && (user.userType === "Admin" || user.userType === "Diretor")) &&
          <li><Link to='/sale'>Vendas <span><FaDollarSign /></span></Link></li>}
      </ul>
    </div>
  )
}

export default FastMenu