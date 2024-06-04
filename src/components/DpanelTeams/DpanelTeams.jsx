import React, { useContext, useState } from 'react';
import { IoArrowUndo } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { TeamsContext } from '../../context/TeamsContext';
import DpanelTeamsInfo from '../DpanelTeamsInfo/DpanelTeamsInfo';
import { ClassesContext } from '../../context/ClassesContext';
import DpanelTeamsInfoNew from '../DpanelTeamsInfo/DpanelTeamsInfoNew';

const DpanelTeams = () => {
  const { teams, getTeams, setMessage } = useContext(TeamsContext);
  const { Classes } = useContext(ClassesContext);
  const [DpanelTeam, setDpanelTeam] = useState("inicio");
  const [team, setTeam] = useState([]);
  
  const showTeam = () => {
    setDpanelTeam("novo");
    setTeam("");
  }

  const setEditDoc = (team) => {
    setDpanelTeam("Editar");
    setTeam(team);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        {DpanelTeam === 'inicio' && <h2 className="text-2xl font-bold text-gray-800">Equipes</h2>}
        {(DpanelTeam === 'novo' || DpanelTeam === "Editar") && (
          <button 
            className="text-gray-600 hover:text-gray-800 transition" 
            onClick={() => {
              setDpanelTeam('inicio')
              setMessage('')
    
            }}
            >
            <IoArrowUndo size={24} />
          </button>
        )}
        {DpanelTeam === 'inicio' && (
          <button 
            className="text-gray-600 hover:text-gray-800 transition" 
            onClick={() => showTeam()}
          >
            <FaPlus size={24} />
          </button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        {DpanelTeam === "inicio" && (
          <ul className="divide-y divide-gray-200">
            {teams && teams.map((team) => {
              const filteredClasses = Classes.filter(cls => cls.team === team.nameTeams);
              return (
                <li key={team._id} className="py-4 flex justify-between items-center">
                  <button 
                    className="w-full text-left" 
                    onClick={() => setEditDoc(team)}
                  >
                    <span className="block text-lg font-semibold text-gray-800">{team.nameTeams}</span>
                    <div className="text-sm text-gray-600 mt-2">
                      <span><strong>Tipo: </strong>{team.teamsType}</span>
                      <span className="ml-4"><strong>Aulas: </strong>{filteredClasses.length}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {DpanelTeam === "Editar" && (
          <DpanelTeamsInfo
            getTeams={getTeams}
            team={team}
          />
        )}
        {DpanelTeam === "novo" && (
          <DpanelTeamsInfoNew
            getTeams={getTeams}
            team={team}
          />
        )}
      </div>
    </div>
  );
}

export default DpanelTeams;
