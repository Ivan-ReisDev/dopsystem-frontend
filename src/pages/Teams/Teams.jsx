import React, { useCallback, useContext, useEffect, useState } from 'react';
import style from './teams.module.css';
import { RiTeamFill } from "react-icons/ri";
import { FaUsersCog, FaAddressBook, FaListUl, FaPlus } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoArrowUndo } from "react-icons/io5";

import { FaUsers } from "react-icons/fa6";
import { MdEditDocument } from "react-icons/md";

import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { DocsContext } from '../../context/DocsContext';
import TableTeamsMembers from '../../components/TableTeamsMembers/TableTeamsMembers';
import DocsTeams from '../../components/DocsTeams/DocsTeams';
import { TeamsContext } from '../../context/TeamsContext';
import { FormAdd } from '../../components/FormTeams/FormAdd';
import FormClasses from '../../components/FormTeams/FormClasses';

const Teams = ({ team }) => {
  const storedUser = localStorage.getItem("@Auth:ProfileUser");
  const userLocalStorege = storedUser ? JSON.parse(storedUser) : {};

  const { searchAllUsers, user } = useContext(UserContext);
  const { Documents } = useContext(DocsContext)
  const { infoTeamsArray, infoTeams } = useContext(TeamsContext)
  const [DocsScripts, setDocsScripts] = useState([])
  const [userOk, setUserOK] = useState([]);
  const [typeMenu, setTypeMenu] = useState("members");
  const [addMember, setAddMember] = useState(false)

  const fetchData = useCallback(async () => {
    await infoTeams("ergerg", team.nameTeams);
  }, [team.nameTeams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (userLocalStorege && userLocalStorege.nickname) {
          await searchAllUsers(userLocalStorege.nickname);
        } else {
          console.warn('No nickname found in localStorage');
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [team]); // Executa apenas uma vez ao carregar a página

  useEffect(() => {
    if (user && user.users) {
      setUserOK(user.users);
    }

  }, [user]);

  useEffect(() => {
    setDocsScripts(Documents.filter(script => script.docsType === team.nameTeams))

  }, [userOk, Documents]);

  const { members } = team


  return (
    <div className={style.Teams}>
      <div className={style.TeamsHeader}>
        <h2><RiTeamFill /> {team.nameTeams}</h2>
        <span>Membros: {infoTeamsArray.length + 2}</span>
      </div>
      <div className={style.TeamsBody}>
        <main>

          {typeMenu && typeMenu === "members" && (
            <div className={style.members}>
              <div className='divMainForms'>
                <h2><span> <FaListUl /></span>Lista de Membros</h2>
              </div>
              <h3>Líder</h3>
              <ul className={style.ListMembers}>
                <li>
                  <Link to={`/search/profile/${team.leader}`}>
                    <div>
                      <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${team.leader}&direction=3&head_direction=3&size=m&action=std`} alt="" />
                    </div>
                    {team.leader}
                  </Link>
                </li>
              </ul>
              <h3>Vice-líder</h3>
              <ul className={style.ListMembers}>
                <li>
                  <Link to={`/search/profile/${team.viceLeader}`}>
                    <div>
                      <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${team.viceLeader}&direction=3&head_direction=3&size=m&action=std`} alt="" />
                    </div>
                    {team.viceLeader}
                  </Link>
                </li>
              </ul>
              <h3>Coordenadores</h3>
              <ul className={style.ListMembers}>
                {!team && <p>Nenhum coordenador encontrado</p>}

                {members && members
                  .filter(user => user.office === "Coordenador")
                  .map(user => (
                    <li key={user.nickname}>
                      <Link to={`/search/profile/${user.nickname}`}>
                        <div>
                          <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${user.nickname}&direction=3&head_direction=3&size=m&action=std`} alt="" />
                        </div>
                        {user.nickname}
                      </Link>
                    </li>
                  ))
                }

              </ul>
              <h3>Membros</h3>
              <ul className={style.ListMembers}>
                {members && members
                  .filter(user => user.office === "Membro")
                  .map(user => (
                    <li key={user.nickname}>
                      <Link to={`/search/profile/${user.nickname}`}>
                        <div>
                          <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${user.nickname}&direction=3&head_direction=3&size=m&action=std`} alt="" />
                        </div>
                        {user.nickname}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          )}
          {typeMenu && typeMenu === "docs" && (
            <div className={style.docs}>
              <div className='divMainForms'>
                <h2><span> <FaListUl /></span>Lista de Documentos</h2>
              </div>
              <div className="contentBodyElement">
                <div className="contentBodyElementTitle">
                  <h3>Documentos</h3>
                </div>
                <ul>
                  {DocsScripts.map((doc) => (
                    <li key={doc._id}><Link to={`/team/${doc.docsType}/doc/${doc._id}`}>{doc.nameDocs}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {typeMenu && typeMenu === "editDocs" && (
            <>
              <div className={style.docs}>
                <div className='divMainForms'>
                  <h2><span> <FaListUl /></span>Gerenciar documentação</h2> <Link to={`/team/${team.nameTeams}/doc/new`} className={style.btnDocs}><FaPlus /></Link>
                </div>
                <DocsTeams
                  DocsScripts={DocsScripts}
                  team={team}
                  userOk={userOk}
                />
              </div>
            </>
          )}

          {typeMenu && typeMenu === "classes" && (
            <div className={style.ListMembersEdit}>
              <div className='divMainForms'>
                <h2><span> <FaListUl /></span>Postar Aula</h2> <button onClick={() => setAddMember(!addMember)} className={style.btnDocs}>{!addMember ? <FaPlus /> : <IoArrowUndo />}</button>
              </div>
              <FormClasses
              team={team}
              />
            </div>
          )}


          {typeMenu && typeMenu === "Controle de Membros" && (
            <div className={style.ListMembersEdit}>
              <div className='divMainForms'>
                <h2><span> <FaListUl /></span>Gerenciar Membros</h2> <button onClick={() => setAddMember(!addMember)} className={style.btnDocs}>{!addMember ? <FaPlus /> : <IoArrowUndo />}</button>
              </div>
              {!addMember ?
                <TableTeamsMembers
                  team={team}
                />
                :
                <FormAdd
                  team={team}
                />}
            </div>
          )}

        </main>
        <article>
          <div className='contentBodyElement'>
            <div className='contentBodyElementTitle'>
              <h3>Menu Rápido</h3>
            </div>
            <ul>
              <li><button onClick={() => setTypeMenu('members')} >Membros <span><FaUsers /></span></button></li>
              <li><button onClick={() => setTypeMenu('docs')}>Documentos<span><IoIosDocument /></span> </button></li>
              <li><button onClick={() => setTypeMenu('classes')} >Postar Aula <span>< FaAddressBook /></span></button></li>
            </ul>
          </div>
          {userOk.length > 0 && (team.leader === userOk[0].nickname || team.viceLeader === userOk[0].nickname || userOk[0].userType === "Admin" || userOk[0].userType === "Diretor") && (
            <div className='contentBodyElement'>
              <div className='contentBodyElementTitle'>
                <h3>Liderança</h3>
              </div>
              <ul>
                <li><button onClick={() => setTypeMenu('Controle de Membros')}>Controle de membros<span><FaUsersCog /></span></button></li>
                <li><button onClick={() => setTypeMenu("editDocs")}>Editar documento<span><MdEditDocument /></span> </button></li>
              </ul>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default Teams;