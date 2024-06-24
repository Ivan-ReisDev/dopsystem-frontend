import React from 'react'
import { FaMedal, FaRankingStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoIosMedal } from "react-icons/io";
import { GiMedal } from "react-icons/gi";




const Rank = () => {

  const user = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

  return (
    <div className='contentBodyElement'>
      <div className='contentBodyElementTitle'>
        <h3 className='flex items-center'><span className='mr-2'><FaRankingStar /></span> Rank de Turnos</h3>
      </div>
      <ul>
        <li><Link to='/resignation' className='font-bold'><img className='w-[45px]' src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=.Disco.Master.&direction=2&head_direction=2&size=l&headonly=1" alt="" />.Disco.Master.<span><FaMedal className='text-amber-500 text-[22px]' /></span></Link></li>
        <li><Link to='/resignation' className='font-bold'><img className='w-[45px]' src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=Howz&direction=2&head_direction=2&size=l&headonly=1" alt="" />Howz<span><IoIosMedal className='text-slate-400 text-[22px]' /></span></Link></li>
        <li><Link to='/resignation' className='font-bold'><img className='w-[45px]' src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=GuilhermeDOP&direction=2&head_direction=2&size=l&headonly=1" alt="" />GuilhermeDOP<span><GiMedal className='text-orange-500 text-[22px]' /></span></Link></li>
      </ul>

    </div>
  )
}

export default Rank