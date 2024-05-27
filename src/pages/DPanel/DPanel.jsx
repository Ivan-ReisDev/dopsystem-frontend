import React, { useState } from 'react'
import style from "./DPanel.module.css"
import { Link } from 'react-router-dom'
import { RiSettings5Fill } from "react-icons/ri";
import { FaDatabase, FaUsersCog, FaBlogger, FaHome    } from "react-icons/fa";
import { IoIosMegaphone } from "react-icons/io";
import { GrDocumentConfig } from "react-icons/gr";
import { BsMicrosoftTeams } from "react-icons/bs";
import Logger from '../../components/Logger/Logger';
import DocsDpanel from '../../components/DocsDpanel/DocsDpanel';
import DpanelTeams from '../../components/DpanelTeams/DpanelTeams';
import DpanelUsers from '../../components/DpanelUsers/DpanelUsers';


const DPanel = () => {

  const  [selectFunction, setSelectFunction ] = useState("DocsEdit");
  
  return (
    <div className={style.Dpanel}>
      <header>
        <Link to={`/dpanel`}>Painel de Controle <RiSettings5Fill /></Link>
        <span>Versão: Beta</span>
      </header>
      <div className={style.main}>
        <article>
          <menu>
            <Link to={`/home`}><FaHome  /> Voltar ao System</Link>
            <button className={selectFunction === "System" ? style.bgblue : ""}> <FaDatabase /> System</button>
            <button className={selectFunction === "DocsEdit" ? style.bgblue :""} onClick={() => setSelectFunction('DocsEdit')}><GrDocumentConfig /> Documentos</button>
            <button className={selectFunction === "Teams" ? style.bgblue :""} onClick={() => setSelectFunction('Teams')} > <BsMicrosoftTeams /> Equipes</button>
            <button className={selectFunction === "Users" ? style.bgblue :""}> <FaUsersCog  /> Usuários</button>
            <button className={selectFunction === "Publication" ? style.bgblue :""} onClick={() => setSelectFunction('Publication')}><IoIosMegaphone  />Publicações</button>
            <button className={selectFunction === "Logger" ? style.bgblue :""} onClick={() => setSelectFunction('Logger')}><FaBlogger  />Log</button>
          </menu>
        </article>

        <main>
          {selectFunction === "DocsEdit" &&
              <DocsDpanel />
          }


          { selectFunction === "Logger" && 
            <Logger />
          }

          { 
            selectFunction === "Teams" &&

            <DpanelTeams />

          }

{ 
            selectFunction === "Users" &&

            <DpanelUsers />


          }

        </main>

      </div>

    </div>
  )
}

export default DPanel