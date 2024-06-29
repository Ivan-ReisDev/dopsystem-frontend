import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SlArrowUp } from "react-icons/sl";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import "./style.css";
import { AuthContext } from '../context/AuthContext';
import { DocsContext } from '../context/DocsContext';
import { TeamsContext } from '../context/TeamsContext';

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);
  const { getTeams, teams } = useContext(TeamsContext);
  const { searchDoc } = useContext(DocsContext);

  const [showDocs, setShowDocs] = useState(false);
  const [showClasses, setShowClasses] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [documents, setDocuments] = useState([]);

  const infoProfileUser = JSON.parse(localStorage.getItem("@Auth:Profile"));
  const infoProfileUserCompleted = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

  useEffect(() => {
    const fetchData = async () => {
      const docs = await searchDoc("System");
      setDocuments(Array.isArray(docs) ? docs : []);
    };

    fetchData();
  }, [getTeams]);

  const activeShowDocs = () => {
    setShowDocs(!showDocs);
  };

  const activeShowClasses = () => {
    setShowClasses(!showClasses);
  };

  return (
    <nav className={showSidebar ?  `custom-scrollbar overflow-y-scroll p-2 z-10 duration-1000 fixed right-0 top-[61px] px-3 min-h-[100vh] h-[100vh] w-[330px] bg-[#2c3136] text-[#ffffff] overflow-y-auto`
      : `custom-scrollbar  overflow-y-scroll p-2 z-10 fixed duration-1000 top-[8vh] px-3 min-h-[100vh] h-[100vh] w-[330px] right-[-330px] bg-[#2c3136] text-[#ffffff] nabBarNew overflow-y-auto`}>
      <div className='borderSidebar w-full h-[160px] flex flex-col items-center justify-center border-b'>
        {infoProfileUser && (
          <>
            <div className="imgSidebar border rounded-full overflow-hidden min-w-16 max-w-16 min-h-16 max-h-16 bg-[url('../')] bg-cover bg-center">
              <img
                className="m-0 relative bottom-3"
                src={`http://www.habbo.com.br/habbo-imaging/avatarimage?&user=${infoProfileUser.nickname}&action=std&direction=4&head_direction=4&img_format=png&gesture=sml&frame=1&headonly=0&size=m`}
                alt=""
              />
            </div>

            <h2 className='mt-2 font-bold'>{infoProfileUser.nickname}</h2>
            <span>{infoProfileUser.patent}</span>
          </>
        )}
      </div>
      {infoProfileUser && (infoProfileUser.userType === "Admin" || infoProfileUser.userType === "Diretor") && (
        <div className='borderSidebar w-full h-[70px] flex flex-col items-center justify-center border-b'>
          <NavLink onClick={() => setShowSidebar(!showSidebar)} to={'/dpanel'} className='buttonRadiosSidebar bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'> Painel <span className='uppercase'>admin</span></NavLink>
        </div>
      )}
      <ul className='border-b borderSidebar h-auto'>
        <li onClick={() => setShowSidebar(!showSidebar)} className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={'/home'}>Home</NavLink></li>

        <button className='w-full h-[30px] font-bold flex items-center ml-5' onClick={activeShowDocs}>
          Documentos <span className={`ml-2 text-[13px] ${showDocs ? "activeRotate" : ""}`}><SlArrowUp /></span>
        </button>
        <div className={`w-full font-bold flex items-center ml-8 flex-col duration-1000 text-[13px] text-[#d3d3d3] ${showDocs ? "h-auto " : "h-0 hidden"}`}>
          {Array.isArray(documents) && documents.map((doc, index) => (
            <li onClick={() => setShowSidebar(!showSidebar)} key={index} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
              <NavLink to={`/doc/${doc._id}`} >{doc.nameDocs}</NavLink>
            </li>
          ))}
        </div>

        {infoProfileUserCompleted && (infoProfileUserCompleted.teams !== "" || infoProfileUserCompleted.userType === "Admin") && (
          <>
            <button className='w-full h-[30px] font-bold flex items-center ml-5' onClick={activeShowClasses}>
              Funções <span className={`ml-2 text-[13px] ${showClasses ? "activeRotate" : ""}`}><SlArrowUp /></span>
            </button>
            <div className={`w-full font-bold flex items-center ml-8 flex-col duration-1000 text-[13px] text-[#d3d3d3] ${showClasses ? "h-auto " : "h-0 hidden"}`}>
              {teams && teams.map((team, index) => {
                const isMember = team.members.some(member => member.nickname === infoProfileUser.nickname);

                if (isMember || infoProfileUser.userType === "Admin" || infoProfileUser.userType === "Diretor") {
                  return (
                    <li onClick={() => setShowSidebar(!showSidebar)} key={index} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
                      <NavLink to={`/team/${team.nameTeams}`}>{team.nameTeams}</NavLink>
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
          Requerimentos <span className={`ml-2 text-[13px] ${showForms ? "activeRotate" : ""}`}><SlArrowUp /></span>
        </button>
        <div className={`w-full font-bold flex items-center ml-8 flex-col duration-1000 text-[13px] text-[#d3d3d3] ${showForms ? "h-auto " : "h-0 hidden"}`}>
          <li onClick={() => setShowSidebar(!showSidebar)} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/promotion'}>Promoções</NavLink>
          </li>
          <li onClick={() => setShowSidebar(!showSidebar)} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/warning'}>Advertências</NavLink>
          </li>
          <li onClick={() => setShowSidebar(!showSidebar)} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/relegation'}>Rebaixamentos</NavLink>
          </li>
          <li onClick={() => setShowSidebar(!showSidebar)} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/resignation'}>Demissões</NavLink>
          </li>
          <li onClick={() => setShowSidebar(!showSidebar)} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/contract'}>Contratos</NavLink>
          </li>
          <li onClick={() => setShowSidebar(!showSidebar)} className='w-full italic h-[25px] font-bold flex items-center ml-5'>
            <NavLink to={'/sale'}>Vendas de Cargo</NavLink>
          </li>
        </div>

        <li onClick={() => setShowSidebar(!showSidebar)} className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={'/members'}>Membros</NavLink></li>
        {infoProfileUserCompleted && (infoProfileUserCompleted.userType === "Diretor" || infoProfileUserCompleted.userType === "Admin" || infoProfileUserCompleted.userType === "Recursos Humanos") && <li className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={`/endorsement`}>Avais</NavLink></li>}
        <li onClick={() => setShowSidebar(!showSidebar)} className='w-full h-[30px] font-bold flex items-center ml-5'><NavLink to={`/search/${infoProfileUserCompleted.nickname}`}>Perfil</NavLink></li>
      </ul>

      <div className='w-full borderSidebar h-[10%] flex flex-col items-center justify-center'>
        <Button onClick={() => {
          setShowSidebar(!showSidebar);
          logout();
        }} className='buttonRadiosSidebar mt-3 rounded-full font-bold bg-[#dc3545]' variant="danger">Logout</Button>
      </div>
    </nav>
  );
};

export default Sidebar;
