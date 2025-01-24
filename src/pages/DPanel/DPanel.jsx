import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiSettings5Fill } from 'react-icons/ri';
import { FaDatabase, FaUsersCog, FaBlogger, FaHome } from 'react-icons/fa';
import { IoIosMegaphone } from 'react-icons/io';
import { GrDocumentConfig } from 'react-icons/gr';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { GoPasskeyFill } from "react-icons/go";
import { CiImageOn } from "react-icons/ci";

import Logger from '../../components/Logger/Logger';
import DocsDpanel from '../../components/DocsDpanel/DocsDpanel';
import DpanelTeams from '../../components/DpanelTeams/DpanelTeams';
import DpanelUsers from '../../components/DpanelUsers/DpanelUsers';
import "./DPanel.module.css"
import DpanelPublication from '../../components/DpanelPublication/DpanelPublication';
import DpanelInfo from '../../components/DpanelInfo/DpanelInfo';
import DpanelPermissions from '../../components/DpanelPermissions/DpanelPermissions';
import DpanelIMages from '../../components/DpanelImages/DpanelImages';

const DPanel = () => {
  const [selectFunction, setSelectFunction] = useState('System');
  const [user, setUser] = useState([])

  useEffect(() => {
    document.title = `Painel de Controle`;
    setUser(JSON.parse(localStorage.getItem('@Auth:Profile')))
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <Link to="/dpanel" className="text-lg font-bold flex items-center">
          Painel de Controle <RiSettings5Fill className="ml-2" />
        </Link>
        <span>Versão: Beta</span>
      </header>
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <article className="w-full md:w-1/4 pr-0 md:pr-8">
          <nav>
            <Link to="/home" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
              <FaHome className="mr-2" /> Voltar ao System
            </Link>
            <button
              className={`block w-full text-left py-2 px-4 rounded-md mb-2 ${selectFunction === 'System' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setSelectFunction('System')}
            >
              <FaDatabase className="mr-2" /> System
            </button>
            <button
              className={`block w-full text-left py-2 px-4 rounded-md mb-2 ${selectFunction === 'DocsEdit' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setSelectFunction('DocsEdit')}
            >
              <GrDocumentConfig className="mr-2" /> Documentos
            </button>
            <button
              className={`block w-full text-left py-2 px-4 rounded-md mb-2 ${selectFunction === 'Teams' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setSelectFunction('Teams')}
            >
              <BsMicrosoftTeams className="mr-2" /> Equipes
            </button>

            <button
              className={`block w-full text-left py-2 px-4 rounded-md mb-2 ${selectFunction === 'Slide' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setSelectFunction('Slide')}
            >
              <CiImageOn className="mr-2" /> Slide
            </button>
            {user && user.userType === "Admin" &&
              <>
                <button
                  className={`block w-full text-left py-2 px-4 rounded-md mb-2 ${selectFunction === 'Users' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                  onClick={() => setSelectFunction('Users')}
                >
                  <FaUsersCog className="mr-2" /> Usuários
                </button>


                <button
                  className={`block w-full text-left py-2 px-4 rounded-md mb-2 ${selectFunction === 'Permissions' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                  onClick={() => setSelectFunction('Permissions')}
                >
                  <GoPasskeyFill className="mr-2" /> Permissões Especiais
                </button>
              </>
            }

            <button
              className={`block w-full text-left py-2 px-4 rounded-md mb-2 ${selectFunction === 'Publication' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setSelectFunction('Publication')}
            >
              <IoIosMegaphone className="mr-2" /> Publicações
            </button>

            {user && user.userType === "Admin" &&
              <button
                className={`block w-full text-left py-2 px-4 rounded-md mb-2 ${selectFunction === 'Logger' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                onClick={() => setSelectFunction('Logger')}
              >
                <FaBlogger className="mr-2" /> Logs
              </button>
            }
          </nav>
        </article>
        <main className="w-full md:w-3/4">
          {selectFunction === 'System' && <DpanelInfo />}
          {selectFunction === 'DocsEdit' && <DocsDpanel />}
          {selectFunction === 'Logger' && <Logger />}
          {selectFunction === 'Teams' && <DpanelTeams />}
          {selectFunction === 'Slide' && <DpanelIMages />}
          {selectFunction === 'Users' && <DpanelUsers />}
          {selectFunction === 'Publication' && <DpanelPublication />}
          {selectFunction === 'Permissions' && <DpanelPermissions />}
        </main>
      </div>
    </div>
  );
};

export default DPanel;
