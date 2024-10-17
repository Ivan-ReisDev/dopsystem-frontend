import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SlArrowUp } from "react-icons/sl";
import Button from 'react-bootstrap/Button';
import { IoSpeedometerOutline, IoHomeOutline, IoFileTrayFullOutline } from "react-icons/io5";
import { MdFormatAlignLeft } from "react-icons/md";

import { CiUser } from "react-icons/ci";
import { MdPostAdd } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { TbUsersGroup, TbLicense } from "react-icons/tb";
import { ImExit } from "react-icons/im";

import LogoDOP from "../assets/DOP Padrão (com borda).png";
import '../index.css';
import "./style.css";
import { AuthContext } from '../context/AuthContext';
import { DocsContext } from '../context/DocsContext';
import { TeamsContext } from '../context/TeamsContext';

const Sidebar = ({ showSidebar, setShowSidebar }) => {

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
      await getTeams(localStorage.getItem("@Auth:Token"));
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
    <nav className={showSidebar ? `overflow-hidden p-2 z-10 duration-1000 fixed left-0 top-[0] px-3 min-h-[100dvh] h-[100dvh] w-[260px] bg-[#000000] text-[#ffffff] `
      : `overflow-hidden p-2 z-10 fixed duration-1000 top-0 px-3 min-h-[100dvh] h-[100dvh] w-[260px] left-[-330px] text-[#ffffff] nabBarNew`}>
      <div
        className='w-full flex flex-row items-center justify-center h-[20%]'>
        <NavLink
          onClick={() => setShowSidebar(!showSidebar)}
          className='flex flex-row items-center justify-center text-xl '
          to={'/home'}>
          <img
            className='w-[45px] mr-2'
            src={LogoDOP} alt="Logo Polícia DOP" /><span className='text-[#0084ff] font-bold'>DOP</span>System</NavLink>
      </div>
      <div className='h-auto min-h-[60%]'>
        {(infoProfileUser && (infoProfileUser.userType === "Admin" || infoProfileUser.userType === "Diretor")) &&
          <NavLink
            onClick={() => setShowSidebar(!showSidebar)}
            className={"w-full flex flex-row items-center text-[13px] p-2 bg-[#0084ff] rounded-md"}
          >
            <IoSpeedometerOutline
              className='mr-2 text-[16px]' />
            DPanel
          </NavLink>
        }
        <NavLink
          to={'/home'}
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] border-b hover:bg-[#63626277]  transition-colors duration-300"
        >
          <IoHomeOutline className="mr-2 text-[16px]" />
          Home
        </NavLink>

        <NavLink
          to={'/postclasse'}
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] border-b hover:bg-[#63626277]  transition-colors duration-300"
        >
          <MdPostAdd className="mr-2 text-[16px]" />
          Postar Curso Inicial
        </NavLink>
        <button
          className="w-full flex flex-row items-center justify-between text-[13px] px-2 py-[10px] border-b hover:bg-[#63626277]  transition-colors duration-300"
        >
          <div className='flex flex-row items-center'>
            <IoFileTrayFullOutline className="mr-2 text-[16px]" />
            Documentos
          </div>
          <SlArrowUp className='mr-2' />
        </button>

        <button
          className="w-full flex flex-row items-center justify-between text-[13px] px-2 py-[10px] border-b hover:bg-[#63626277]  transition-colors duration-300"
        >
          <div className='flex flex-row items-center'>
            <FaRegBuilding className="mr-2 text-[16px]" />
            Departamentos
          </div>
          <SlArrowUp className='mr-2' />
        </button>

        <button
          className="w-full flex flex-row items-center justify-between text-[13px] px-2 py-[10px] border-b hover:bg-[#63626277]  transition-colors duration-300"
        >
          <div className='flex flex-row items-center'>
            <MdFormatAlignLeft className="mr-2 text-[16px]" />
            Requerimentos
          </div>
          <SlArrowUp className='mr-2' />
        </button>

        <NavLink
          to={'/members'}
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] border-b hover:bg-[#63626277]  transition-colors duration-300"
        >
          <TbUsersGroup className="mr-2 text-[16px]" />
          Membros
        </NavLink>

        {(infoProfileUser && (infoProfileUser.userType === "Admin" || infoProfileUser.userType === "Diretor" || infoProfileUser.userType === "Recursos Humanos")) &&
          <NavLink
            to={'/endorsement'}
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] border-b hover:bg-[#63626277]  transition-colors duration-300"
          >
            <TbLicense className="mr-2 text-[16px]" />
            Avais
          </NavLink>
        }

        <NavLink
          to={`/search/${infoProfileUser.nickname}`}
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] border-b hover:bg-[#63626277]  transition-colors duration-300"
        >
          <CiUser className="mr-2 text-[16px]" />
          Perfil
        </NavLink>
      </div>

      <div className='h-[20%] flex items-center justify-center w-full'>
        <button
          onClick={() => {
            setShowSidebar(!showSidebar);
            logout();
          }
          }
          className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] transition-colors duration-300">
          <ImExit className="mr-2 text-[16px]" />
          Logout
        </button>
      </div>

    </nav>
  );
};

export default Sidebar;
