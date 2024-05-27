import React, { useContext, useEffect, useState } from 'react';
import style from './DpanelTeamsInfo.module.css';
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
    window.location.reload('/dpanel');
  };

  const handleCreateNewClasse = (e) => {
    e.preventDefault()
    const data = {
      idUser, 
      nameClasse: newAulaName,
      team: team.nameTeams,
      patent: newAulaPatent

    }
    // 

    createClasse(data)
  }

  return (
    <div className={style.DpanelTeamsInfo}>
      <div>
        <h2>{team.nameTeams}</h2>
      </div>

      <div className={style.body}>
        <div className={style.main}>
          {editClasse === "inicio" && (
            <>
              <form onSubmit={handleEditTeam}>
                <h2>Atualizar liderança</h2>
                <label>
                  Nome da equipe:
                  <input
                    type="text"
                    value={nameTeams}
                    onChange={(e) => setNameTeams(e.target.value)}
                  />
                </label>
                <label>
                  Líder
                  <input
                    type="text"
                    value={leader}
                    onChange={(e) => setLeader(e.target.value)}
                  />
                </label>

                <label>
                  Vice-Líder
                  <input
                    type="text"
                    value={viceLeader}
                    onChange={(e) => setViceLeader(e.target.value)}
                  />
                </label>
                <div className={style.btnForm}>
                  <button className={style.BtnActive}>Atualizar</button>
                  <button type='button' onClick={handleDelete} className={style.BtnActive}>Excluir</button>
                </div>
                {messageTeam && <p>{messageTeam.msg}</p>}
              </form>
              <div className={style.TeamClassesList}>
                <div>
                  <h2>Lista de Aulas</h2>
                  <ul>
                    <li><span>Aula</span> <span>Ação</span></li>
                    {Classes && newArrayClesses.map((classe) => (
                      <li key={classe._id}><span>{classe.nameClasse}</span> <span><button onClick={() => {
                        setClasseSelected(classe);
                        setEditClasse("EditClasse");
                        setMessage('');
                      }}>Editar</button></span></li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => setEditClasse("NewAula")} className={style.BtnActive}>Nova aula</button>
              </div>
            </>
          )}

          {editClasse === "EditClasse" && (
            <>
              <form onSubmit={handleSubmit}>
                <h2>Editar aula</h2>
                <label>
                  Nome da aula:
                  <input
                    type="text"
                    value={classeData}
                    onChange={(e) => setClasseData(e.target.value)}
                  />
                </label>
                <label>
                  Para qual patente é aplicada:
                  <select
                    value={patentData}
                    onChange={(e) => setPatentData(e.target.value)}
                  >
                    <option value={classeSelected.patent}>{classeSelected.patent}</option>
                    {infoSystem && patentsArray
                      .filter((patent) => patent !== classeSelected.patent)
                      .map((patent) => (
                        <option key={patent} value={patent}>{patent}</option>
                      ))}
                  </select>
                </label>
                <button className={style.BtnActive}>Atualizar</button>
                {message && <p>{message.msg}</p>}
              </form>
            </>
          )}

          {editClasse === "NewAula" && (
            <>
              <form onSubmit={handleCreateNewClasse}>
                <h2>Nova aula</h2>
                <label>
                  Nome da aula:
                  <input
                    type="text"
                    placeholder='Digite o nome da aula'
                    value={newAulaName}
                    onChange={(e) => setNewAulaName(e.target.value)}
                  />
                </label>

                <label>
                  Para qual patente é aplicada:
                  <select
                    value={newAulaPatent}
                    onChange={(e) => setNewAulaPatent(e.target.value)}
                  >
                    <option value='0'>Selecione</option>
                    {infoSystem && patentsArray
                      .filter((patent) => patent !== classeSelected.patent)
                      .map((patent) => (
                        <option key={patent} value={patent}>{patent}</option>
                      ))}
                  </select>
                </label>
                <button className={style.BtnActive}>Salvar</button>
                {message && <p>{message.msg}</p>}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DpanelTeamsInfo;
