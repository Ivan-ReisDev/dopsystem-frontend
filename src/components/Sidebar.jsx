import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { SlArrowUp } from "react-icons/sl";
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//redux 

import { logout, reset } from '../slices/authSlice';

import '../index.css'
import { profile } from '../slices/userSlice';




const docs = ['Estatuto', 'Código Penal', 'Código de Conduta'];

const classes = ['Instrutores', 'Supervisores', 'Treinadores']

const Sidebar = ({ showSidebar }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(profile())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/')

  }

const [showDocs, setShowDocs] = useState(false);
const [showClasses, setShowClasses] = useState(false);
const [showForms, setShowForms] = useState(false)

const activeShowDocs = () => setShowDocs(!showDocs);
const activeShowClasses = () => setShowClasses(!showClasses);

  return (
    <nav className={showSidebar ? `duration-1000 absolute right-[0] top-[8vh] px-3 h-[92vh] w-[330px] bg-[#031149] text-[#ffffff]`
      : `absolute duration-1000 top-[8vh] px-3 h-[92vh]  w-[330px] right-[-330px] bg-[#031149] text-[#ffffff]`}>
      <div className='w-full h-[20%] flex flex-col items-center justify-center  border-b' >
        <div className='border rounded-full	overflow-hidden	 min-w-16 max-w-16 min-h-16	max-h-16 bg-[#0084FF]'>
          <img className='m-0 relative  bottom-3' src={`http://www.habbo.com.br/habbo-imaging/avatarimage?&user=${user.nickname}&action=std&direction=4&head_direction=4&img_format=png&gesture=sml&frame=1&headonly=0&size=m`} alt="" />
        </div>
        <h2 className='mt-2 font-bold'>{user.nickname}</h2>
        <span>{user.patent}</span>
      </div>
       {user && user.userType === 'Admin' && <div className='w-full h-[10%] flex flex-col items-center justify-center  border-b' >
        <NavLink to={'/paneladmin'}
         className='bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-full'> Painel <span className='uppercase'>admin</span></NavLink>
      </div>} 
      <ul className='border-b'>
      <li className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={'/'}>Página Inicial</NavLink></li>

        <button className='w-full h-[30px] font-bold flex items-center ml-5'
        onClick={activeShowDocs}>
          Documentos <span className={`ml-2 text-[13px] ${showDocs ? "activeRotate" : "disabled"}`}><SlArrowUp /></span>
        </button>
        <div className={`w-full  font-bold flex items-center ml-8 flex-col duration-1000 text-[13px] text-[#d3d3d3]
         ${showDocs ? "h-auto " : "h-0 hidden"}`}>
        {docs &&
          docs.map((doc, index) => (
            <li key={index} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
              <NavLink to={'/docs'}>{doc}</NavLink>
            </li>
          ))
        }
        </div>

        <button className='w-full h-[30px] font-bold flex items-center ml-5'
        onClick={activeShowClasses}>
          Equipes <span className={`ml-2 text-[13px] ${showClasses ? "activeRotate" : "disabled"}`}><SlArrowUp /></span>
        </button>
        <div className={`w-full  font-bold flex items-center ml-8 flex-col duration-1000 text-[13px] text-[#d3d3d3]
         ${showClasses ? "h-auto " : "h-0 hidden"}`}>
        {classes && 
          classes.map((doc, index) => (
            <li key={index} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
              <NavLink to={'/docs'}>{doc}</NavLink>
            </li>
          ))
        }
        </div>

        <button className='w-full h-[30px] font-bold flex items-center ml-5'
        onClick={() => setShowForms(!showForms)}>
          Recusos Humanos <span className={`ml-2 text-[13px] ${showForms ? "activeRotate" : "disabled"}`}><SlArrowUp /></span>
        </button>
        <div className={`w-full  font-bold flex items-center ml-8 flex-col duration-1000 text-[13px] text-[#d3d3d3]
         ${showForms ? "h-auto " : "h-0 hidden"}`}>
            <li  className='w-full italic h-[25px] font-bold flex items-center ml-5'>
              <NavLink to={'/docs'}>Listagens</NavLink>
            </li>
            <li  className='w-full italic h-[25px] font-bold flex items-center ml-5'>
              <NavLink to={'/docs'}>Requerimentos</NavLink>
            </li>
        </div>

        <li className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={'/members'}>Membros</NavLink></li>
        <li className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={'/profile'}>Perfil</NavLink></li>
      </ul>

      <div className='w-full h-[10%] flex flex-col items-center justify-center' >
        <Button onClick={handleLogout} className='rounded-full font-bold bg-[#dc3545]' variant="danger">Log out</Button>
      </div>
      
    </nav>
  )
}

export default Sidebar