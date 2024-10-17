import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SlArrowUp } from "react-icons/sl";
import {
  IoSpeedometerOutline,
  IoHomeOutline,
  IoFileTrayFullOutline,
} from "react-icons/io5";
import { MdFormatAlignLeft } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { MdPostAdd } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { TbUsersGroup, TbLicense } from "react-icons/tb";
import { ImExit } from "react-icons/im";

import LogoDOP from "../assets/DOP Padrão (com borda).png";
import "../index.css";
import "./style.css";
import { AuthContext } from "../context/AuthContext";
import { DocsContext } from "../context/DocsContext";
import { TeamsContext } from "../context/TeamsContext";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { logout } = useContext(AuthContext);
  const { getTeams, teams } = useContext(TeamsContext);
  const { searchDoc } = useContext(DocsContext);

  const [showDocs, setShowDocs] = useState(false);
  const [showClasses, setShowClasses] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [documents, setDocuments] = useState([]);

  const infoProfileUser = JSON.parse(localStorage.getItem("@Auth:Profile"));
  const infoProfileUserCompleted = JSON.parse(
    localStorage.getItem("@Auth:ProfileUser")
  );

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
    <nav
    className={
      showSidebar
        ? "overflow-hidden p-2 z-10 fixed top-0 px-3 min-h-[100dvh] h-[100dvh] w-[300px] bg-[#000000] text-[#ffffff] duration-1000 transition-all left-[0]" // Sidebar visível
        : "overflow-hidden p-2 z-10 fixed top-0 px-3 min-h-[100dvh] h-[100dvh] w-[300px] bg-[#000000] text-[#ffffff] duration-1000 left-[-300px]" // Sidebar escondido
    }
  >
      <div className="w-full flex flex-row items-center justify-center h-[20%]">
        <NavLink
          onClick={() => setShowSidebar(!showSidebar)}
          className="flex flex-row items-center justify-center text-xl "
          to={"/home"}
        >
          <img className="w-[45px] mr-2" src={LogoDOP} alt="Logo Polícia DOP" />
          <span className="text-[#0084ff] font-bold">DOP</span>System
        </NavLink>
      </div>
      <div className="h-auto min-h-[60%]">
        {infoProfileUser &&
          (infoProfileUser.userType === "Admin" ||
            infoProfileUser.userType === "Diretor") && (
            <NavLink
            to={"/dpanel"}
              onClick={() => setShowSidebar(!showSidebar)}
              className={
                "w-full flex flex-row items-center text-[13px] p-2 bg-[#0084ff] rounded-md"
              }
            >
              <IoSpeedometerOutline className="mr-2 text-[16px]" />
              DPanel
            </NavLink>
          )}
        <NavLink
          to={"/home"}
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-full flex flex-row items-center text-[13px] px-2 py-[10px]  hover:bg-[#63626277]  transition-colors duration-300"
        >
          <IoHomeOutline className="mr-2 text-[16px]" />
          Home
        </NavLink>

        <NavLink
          to={"/postclasse"}
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] border-t hover:bg-[#63626277]  transition-colors duration-300"
        >
          <MdPostAdd className="mr-2 text-[16px]" />
          Postar Curso Inicial
        </NavLink>
        <button
  onClick={activeShowDocs}
  className="w-full flex flex-row items-center justify-between text-[13px] px-2 py-[10px] border-t hover:bg-[#63626277] transition-colors duration-300"
>
  <div className="flex flex-row items-center">
    <IoFileTrayFullOutline className="mr-2 text-[16px]" />
    Documentos
  </div>
  <SlArrowUp className={`mr-2 ${showDocs ? "rotate-180" : "rotate-0"}`} />
</button>
<ul
  className={`pl-6 bg-[#161616] text-xs overflow-hidden transition-all duration-300 ${showDocs ? "max-h-96" : "max-h-0"
    }`}
>
  {Array.isArray(documents) &&
    documents.map((doc, index) => (
      <li
        key={index}
        onClick={() => setShowSidebar(!showSidebar)}
        className="py-1 italic"
      >
        <NavLink to={`/doc/${doc.url}`}>{doc.nameDocs}</NavLink>
      </li>
    ))}
</ul>

        {infoProfileUserCompleted &&
          (infoProfileUserCompleted.teams < 1 ||
            infoProfileUserCompleted.userType === "Admin" ||
            infoProfileUserCompleted.userType === "Diretor") && (
            <>
              <button
                onClick={() => setShowForms(!showForms)}
                className="w-full flex flex-row items-center justify-between text-[13px] px-2 py-[10px] border-t hover:bg-[#63626277]  transition-colors duration-300">
                <div className="flex flex-row items-center">
                  <FaRegBuilding className="mr-2 text-[16px]" />
                  Departamentos
                </div>
                <SlArrowUp className={`mr-2 ${showForms ? "rotate-180" : "rotate-0"}`} />
              </button>
              <ul className={`pl-6 bg-[#161616] text-xs overflow-hidden transition-all duration-300 ${showForms ? "max-h-96" : "max-h-0"
                }`}>
                {teams && teams.map((team, index) => {
                  const isMember = team.members.some(member => member.nickname === infoProfileUser.nickname);

                  if (isMember || infoProfileUser.userType === "Admin" || infoProfileUser.userType === "Diretor") {
                    return (
                      <li onClick={() => setShowSidebar(!showSidebar)} key={index} className="py-1 italic">
                        <NavLink to={`/team/${team.url}`}>{team.nameTeams}</NavLink>
                      </li>
                    );
                  } else {
                    return null;
                  }
                })}
              </ul>
            </>
          )}

        <button
          onClick={activeShowClasses}
          className="w-full flex flex-row items-center justify-between text-[13px] px-2 py-[10px] border-t hover:bg-[#63626277]  transition-colors duration-300"
        >
          <div className="flex flex-row items-center">
            <MdFormatAlignLeft className="mr-2 text-[16px]" />
            Requerimentos
          </div>
          <SlArrowUp className={`mr-2 ${showClasses ? "rotate-180" : "rotate-0"}`} />
        </button>
        <ul
          className={`pl-6 bg-[#161616]  text-xs overflow-hidden transition-all duration-300 ${showClasses ? "max-h-96" : "max-h-0"
            }`}
        >
          <li onClick={() => setShowSidebar(!showSidebar)} className="py-1 italic w-full">
            <NavLink className={"w-full"} to={`/promotion`}>Promoções</NavLink>
          </li>
          <li onClick={() => setShowSidebar(!showSidebar)} className="py-1 italic w-full">
            <NavLink to={`/warning`}>Advertências</NavLink>
          </li>
          <li onClick={() => setShowSidebar(!showSidebar)} className="py-1 italic w-full">
            <NavLink to={`/relegation`}>Rebaixamentos</NavLink>
          </li>
          <li onClick={() => setShowSidebar(!showSidebar)} className="py-1 italic">
            <NavLink to={`/resignation`}>Demissões</NavLink>
          </li>
          <li onClick={() => setShowSidebar(!showSidebar)} className="py-1 italic">
            <NavLink to={`/contract`}>Contratos</NavLink>
          </li>
          <li onClick={() => setShowSidebar(!showSidebar)} className="py-1 italic">
            <NavLink to={`/sale`}>Vendas de Cargo</NavLink>
          </li>
        </ul>

        <NavLink
          to={"/members"}
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] border-t hover:bg-[#63626277]  transition-colors duration-300"
        >
          <TbUsersGroup className="mr-2 text-[16px]" />
          Membros
        </NavLink>

        {infoProfileUser &&
          (infoProfileUser.userType === "Admin" ||
            infoProfileUser.userType === "Diretor" ||
            infoProfileUser.userType === "Recursos Humanos") && (
            <NavLink
              to={"/endorsement"}
              onClick={() => setShowSidebar(!showSidebar)}
              className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] border-t hover:bg-[#63626277]  transition-colors duration-300"
            >
              <TbLicense className="mr-2 text-[16px]" />
              Avais
            </NavLink>
          )}

        <NavLink
          to={`/search/${infoProfileUser.nickname}`}
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] border-t hover:bg-[#63626277]  transition-colors duration-300"
        >
          <CiUser className="mr-2 text-[16px]" />
          Perfil
        </NavLink>
      </div>

      <div className="h-[20%] flex items-center justify-center w-full">
        <button
          onClick={() => {
            setShowSidebar(!showSidebar);
            logout();
          }}
          className="w-full flex flex-row items-center text-[13px] px-2 py-[10px] transition-colors duration-300"
        >
          <ImExit className="mr-2 text-[16px]" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
