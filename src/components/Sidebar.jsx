import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SlArrowUp } from "react-icons/sl";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import '../index.css';
import { AuthContext } from '../context/AuthContext';
import { DocsContext } from '../context/DocsContext';
import { TeamsContext } from '../context/TeamsContext';

const classes = ['Instrutores', 'Supervisores', 'Treinadores'];

const Sidebar = ({ showSidebar }) => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);
  const [showDocs, setShowDocs] = useState(false);
  const [showClasses, setShowClasses] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const activeShowDocs = () => setShowDocs(!showDocs);
  const activeShowClasses = () => setShowClasses(!showClasses);

  const { Documents } = useContext(DocsContext);
  const { teams } = useContext(TeamsContext);

  const infoProfileUser = JSON.parse(localStorage.getItem("@Auth:Profile"));
  const infoProfileUserCompleted = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

  return (
    <nav className={showSidebar ? `nabBarNew -z-9999 duration-1000 absolute right-[0] top-[61px] px-3 h-[100vh] w-[330px] bg-[#031149] text-[#ffffff]`
      : `absolute duration-1000 top-[8vh] px-3 h-[92vh]  w-[330px] right-[-330px] bg-[#031149] text-[#ffffff] nabBarNew`}>
      <div className=' borderSidebar w-full h-[20%] flex flex-col items-center justify-center  border-b'>
        {infoProfileUser && (
          <>
            <div className='border  rounded-full overflow-hidden min-w-16 max-w-16 min-h-16 max-h-16 bg-[#0084FF]'>
              <img className='m-0 relative  bottom-3' src={`http://www.habbo.com.br/habbo-imaging/avatarimage?&user=${infoProfileUser.nickname}&action=std&direction=4&head_direction=4&img_format=png&gesture=sml&frame=1&headonly=0&size=m`} alt="" />
            </div>
            <h2 className='mt-2 font-bold'>{infoProfileUser.nickname}</h2>
            <span>{infoProfileUser.patent}</span>
          </>
        )}
      </div>
      {infoProfileUser ? infoProfileUser.userType === "Admin" && (
        <div className='borderSidebar w-full h-[10%] flex flex-col items-center justify-center  border-b'>
          <NavLink to={'/paneladmin'} className='buttonRadiosSidebar bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'> Painel <span className='uppercase'>admin</span></NavLink>
        </div>
      ) : null}
      <ul className='border-b borderSidebar'>
        <li className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={'/home'}>Home</NavLink></li>

        <button className='w-full h-[30px] font-bold flex items-center ml-5' onClick={activeShowDocs}>
          Documentos <span className={`ml-2 text-[13px] ${showDocs ? "activeRotate" : "disabled"}`}><SlArrowUp /></span>
        </button>
        <div className={`w-full  font-bold flex items-center ml-8 flex-col duration-1000 text-[13px] text-[#d3d3d3] ${showDocs ? "h-auto " : "h-0 hidden"}`}>
          {Documents && Documents.map((doc, index) => (
            <li key={index} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
              <NavLink to={`/docs/${doc._id}`} >{doc.nameDocs}</NavLink>
            </li>
          ))}
        </div>

        {infoProfileUserCompleted && (infoProfileUserCompleted.teans[0] !== "" || infoProfileUserCompleted.userType === "Admin") && (
          <>
            <button className='w-full h-[30px] font-bold flex items-center ml-5' onClick={activeShowClasses}>
              Equipes <span className={`ml-2 text-[13px] ${showClasses ? "activeRotate" : "disabled"}`}><SlArrowUp /></span>
            </button>
            <div className={`w-full  font-bold flex items-center ml-8 flex-col duration-1000 text-[13px] text-[#d3d3d3] ${showClasses ? "h-auto " : "h-0 hidden"}`}>
              {teams && teams.map((team, index) => {
                if (team.members.includes(`${infoProfileUser.nickname}`) || infoProfileUser.userType === "Admin") {
                  return (
                    <li key={index} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
                      <NavLink to={`/team/${team._id}`}>{team.nameTeams}</NavLink>
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </>
        )}

        <button className='w-full h-[30px] font-bold flex items-center ml-5' onClick={() => setShowForms(!showForms)}>
          Recursos Humanos <span className={`ml-2 text-[13px] ${showForms ? "activeRotate" : "disabled"}`}><SlArrowUp /></span>
        </button>
        <div className={`w-full  font-bold flex items-center ml-8 flex-col duration-1000 text-[13px] text-[#d3d3d3] ${showForms ? "h-auto " : "h-0 hidden"}`}>
          <li className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/promotion'}>Promoções</NavLink>
          </li>
          <li className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/warning'}>Advertências</NavLink>
          </li>
          <li className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/relegation'}>Rebaixamentos</NavLink>
          </li>
          <li className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/resignation'}>Demissões</NavLink>
          </li>
          <li className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/contract'}>Contratos</NavLink>
          </li>
          <li className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/sale'}>Vendas de Cargo</NavLink>
          </li>
        </div>

        <li className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={'/members'}>Membros</NavLink></li>
        <li className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={'/profile'}>Perfil</NavLink></li>
        { infoProfileUserCompleted && infoProfileUserCompleted.userType === "Admin" && <li className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={'/loggers'}>Logs</NavLink></li>}
      </ul>

      <div className='w-full borderSidebar h-[10%] flex flex-col items-center justify-center'>
        <Button onClick={logout} className='buttonRadiosSidebar rounded-full font-bold bg-[#dc3545]' variant="danger">Logout</Button>
      </div>
    </nav>
  );
};

export default Sidebar;
