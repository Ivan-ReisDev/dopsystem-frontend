import React, { useContext, useEffect, useState } from 'react';
import { ClassesContext } from '../../context/ClassesContext';
import { SystemContext } from '../../context/SystemContext';
import { TeamsContext } from '../../context/TeamsContext';

const DpanelTeamsInfo = ({ team, getTeams }) => {
  const [editClasse, setEditClasse] = useState("inicio");
  const [classeSelected, setClasseSelected] = useState([]);
  const [nameTeams, setNameTeams] = useState(team.nameTeams);
  const [leader, setLeader] = useState(team.leader);
  const [viceLeader, setViceLeader] = useState(team.viceLeader);
  const { Classes, message, editClasse: handleEditClasse, setMessage, getClasses, createClasse } = useContext(ClassesContext);
  const { message: messageTeam, setMessage: setMessageTeam, updateTeam, deleteTeams } = useContext(TeamsContext);
  const { infoSystem } = useContext(SystemContext);
  const newArrayClesses = Classes.filter(classes => classes.team === team.nameTeams);
  const patentsArray = infoSystem[0].patents;

  const [patentData, setPatentData] = useState('');
  const [classeData, setClasseData] = useState('');
  const idUser = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

  const [newAulaName, setNewAulaName] = useState('');
  const [newAulaPatent, setNewAulaPatent] = useState('');

  useEffect(() => {
    setPatentData(classeSelected.patent);
    setClasseData(classeSelected.nameClasse);
    setMessageTeam('');
    getTeams(localStorage.getItem(idUser.token));
    getClasses(localStorage.getItem(idUser.token));
  }, [editClasse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      idUser: idUser._id,
      idClasse: classeSelected._id,
      nameClasse: classeData,
      team: classeSelected.team,
      patent: patentData,
    };
    handleEditClasse(data);
  };

  const handleEditTeam = (e) => {
    e.preventDefault();
    const data = {
      idUser: idUser._id,
      teamsId: team._id,
      nameTeams,
      leader,
      viceLeader,
    };
    updateTeam(data);
  };

  const handleDelete = () => {
    const data = {
      idUser,
      teamsId: team._id,
    };
    deleteTeams(data);
  };

  const handleCreateNewClasse = (e) => {
    e.preventDefault();
    const data = {
      idUser,
      nameClasse: newAulaName,
      team: team.nameTeams,
      patent: newAulaPatent
    };
    createClasse(data);
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow rounded-lg">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{team.nameTeams}</h2>
      </div>

      <div className="mt-4">
        <div>
          {editClasse === "inicio" && (
            <>
              <form onSubmit={handleEditTeam} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Atualizar liderança</h2>
                <label className="block">
                  Nome da equipe:
                  <input
                    type="text"
                    value={nameTeams}
                    onChange={(e) => setNameTeams(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </label>
                <label className="block">
                  Líder
                  <input
                    type="text"
                    value={leader}
                    onChange={(e) => setLeader(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </label>
                <label className="block">
                  Vice-Líder
                  <input
                    type="text"
                    value={viceLeader}
                    onChange={(e) => setViceLeader(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </label>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">Atualizar</button>
                  <button 
                    type='button' 
                    onClick={handleDelete} 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                  >
                    Excluir
                  </button>
                </div>
                {messageTeam && <p className="text-red-500">{messageTeam.msg}</p>}
              </form>
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Lista de Aulas</h2>
                <ul className="divide-y divide-gray-200">
                  <li className="py-2 flex justify-between items-center">
                    <span className="font-medium">Aula</span> 
                    <span className="font-medium">Ação</span>
                  </li>
                  {Classes && newArrayClesses.map((classe) => (
                    <li key={classe._id} className="py-2 flex justify-between items-center">
                      <span>{classe.nameClasse}</span> 
                      <span>
                        <button 
                          onClick={() => {
                            setClasseSelected(classe);
                            setEditClasse("EditClasse");
                            setMessage('');
                          }} 
                          className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition"
                        >
                          Editar
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setEditClasse("NewAula")} 
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
                >
                  Nova aula
                </button>
              </div>
            </>
          )}

          {editClasse === "EditClasse" && (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Editar aula</h2>
                <label className="block">
                  Nome da aula:
                  <input
                    type="text"
                    value={classeData}
                    onChange={(e) => setClasseData(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </label>
                <label className="block">
                  Para qual patente é aplicada:
                  <select
                    value={patentData}
                    onChange={(e) => setPatentData(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value={classeSelected.patent}>{classeSelected.patent}</option>
                    {infoSystem && patentsArray
                      .filter((patent) => patent !== classeSelected.patent)
                      .map((patent) => (
                        <option key={patent} value={patent}>{patent}</option>
                      ))}
                  </select>
                </label>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">Atualizar</button>
                {message && <p className="text-red-500">{message.msg}</p>}
              </form>
            </>
          )}

          {editClasse === "NewAula" && (
            <>
              <form onSubmit={handleCreateNewClasse} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Nova aula</h2>
                <label className="block">
                  Nome da aula:
                  <input
                    type="text"
                    placeholder='Digite o nome da aula'
                    value={newAulaName}
                    onChange={(e) => setNewAulaName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </label>
                <label className="block">
                  Para qual patente é aplicada:
                  <select
                    value={newAulaPatent}
                    onChange={(e) => setNewAulaPatent(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value='0'>Selecione</option>
                    {infoSystem && patentsArray
                      .filter((patent) => patent !== classeSelected.patent)
                      .map((patent) => (
                        <option key={patent} value={patent}>{patent}</option>
                      ))}
                  </select>
                </label>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">Salvar</button>
                {message && <p className="text-red-500">{message.msg}</p>}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DpanelTeamsInfo;
