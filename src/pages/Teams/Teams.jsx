import React, { useContext, useEffect, useState } from 'react';
import style from './teams.module.css';
import { RiTeamFill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import { FaUsersCog, FaAddressBook, FaListUl, FaPlus, FaUsers } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { IoIosDocument } from "react-icons/io";
import { IoArrowUndo } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { DocsContext } from '../../context/DocsContext';
import TableTeamsMembers from '../../components/TableTeamsMembers/TableTeamsMembers';
import DocsTeams from '../../components/DocsTeams/DocsTeams';
import { TeamsContext } from '../../context/TeamsContext';
import { FormAdd } from '../../components/FormTeams/FormAdd';
import FormClasses from '../../components/FormTeams/FormClasses';
import TableClasses from '../../components/TableClasses/TableClasses';
import "../forms.css"

const Teams = ({ team }) => {
  const storedUser = localStorage.getItem("@Auth:ProfileUser");
  const userLocalStorage = storedUser ? JSON.parse(storedUser) : {};

  const { searchAllUsers, user } = useContext(UserContext);
  const { searchDoc, docSelected } = useContext(DocsContext);
  const { infoTeamsArray, infoTeams } = useContext(TeamsContext);

  const [DocsScripts, setDocsScripts] = useState([]);
  const [userOk, setUserOK] = useState([]);
  const [typeMenu, setTypeMenu] = useState("members");
  const [addMember, setAddMember] = useState(false);

  const newDocFilter = Array.isArray(DocsScripts) ? DocsScripts.filter((doc) => doc.script === true) : [];

  useEffect(() => {
    const updatePage = async () => {
      document.title = `Polícia DOP - ${team.nameTeams}`;
      await infoTeams(team.nameTeams);
      await searchDoc(team.nameTeams);
    }

    updatePage()
  }, [team]);

  useEffect(() => {
    const updatePage = async () => {
      await setDocsScripts(docSelected);
    }
    updatePage()

  }, [docSelected]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (userLocalStorage && userLocalStorage.nickname) {
          await searchAllUsers(userLocalStorage.nickname);
        } else {
          console.warn('No nickname found in localStorage');
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (user && user.users) {
      setUserOK(user.users);
    }
  }, [user]);

  const renderMembers = (members, office) => (
    members && members
      .filter(user => user.office === office)
      .map(user => (
        <li key={user.nickname}>
          <Link to={`/search/${user.nickname}`}>
            <div>
              <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${user.nickname}&direction=3&head_direction=3&size=m&action=std`} alt="" />
            </div>
            {user.nickname}
          </Link>
        </li>
      ))
  );

  return (
    <div className={style.Teams}>
      <div className={style.TeamsHeader}>
        <h2 className='font-semibold'>{team.emblema ? <><img className='w-[45px] mr-2' src={team.emblema} alt="" /></> : <RiTeamFill />} {team.nameTeams}</h2>
        <span>Membros: {infoTeamsArray.length}</span>
      </div>
      <div className={style.TeamsBody}>
        <main>
          {typeMenu === "members" && (
            <div className={style.members}>
              <div className='divMainForms'>
                <h2><span><FaListUl /></span>Lista de Membros</h2>
              </div>
              <h3>Líder</h3>
              <ul className={style.ListMembers}>
                <li>
                  <Link to={`/search/${team.leader}`}>
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
                  <Link to={`/search/${team.viceLeader}`}>
                    <div>
                      <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${team.viceLeader}&direction=3&head_direction=3&size=m&action=std`} alt="" />
                    </div>
                    {team.viceLeader}
                  </Link>
                </li>
              </ul>
              {team.nameTeams === "Ensino" && (
                <>
                  <h3>Docente</h3>
                  <ul className={style.ListMembers}>
                    {renderMembers(team.members, "Docente")}
                  </ul>
                </>
              )}
              <h3>Coordenadores</h3>
              <ul className={style.ListMembers}>
                {renderMembers(team.members, "Coordenador")}
              </ul>
              <h3>Membros</h3>
              <ul className={style.ListMembers}>
                {renderMembers(team.members, "Membro")}
              </ul>
            </div>
          )}
          {typeMenu === "docs" && (
            <div className={style.docs}>
              <div className='divMainForms'>
                <h2><span> <FaListUl /></span>Lista de Documentos</h2>
              </div>
              <div className="contentBodyElement">
                <div className="contentBodyElementTitle">
                  <h3>Documentos</h3>
                </div>
                <ul>
                  {Array.isArray(DocsScripts) && DocsScripts.filter((doc) => doc.script === false).map((doc) => (
                    <li key={doc._id}>
                      <Link to={`/doc/${doc.url}`}>{doc.nameDocs}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {typeMenu === "scripts" && (
            <div className={style.docs}>
              <div className='divMainForms'>
                <h2><span> <FaListUl /></span>Lista de Documentos</h2>
              </div>
              <div className="contentBodyElement">
                <div className="contentBodyElementTitle">
                  <h3>Scripts</h3>
                </div>
                <ul>
                  {newDocFilter.filter(
                      (doc) =>
                        userLocalStorage.userType === "Admin" || 
                        userLocalStorage.userType === "Diretor" || 
                        userLocalStorage.nickname === team.leader ||
                        userLocalStorage.nickname === team.viceLeader ||
                        userLocalStorage.classes.includes("Curso de Formação Avançada - [CFA]") ||
                        userLocalStorage.classes.includes(doc.nameDocs)).map((doc) => (
                      <li key={doc._id}>
                        <Link to={`/doc/${doc.url}`}>{doc.nameDocs}</Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          )}

          {typeMenu === "editDocs" && (
            <div className={style.docs}>
              <div className='divMainForms'>
                <h2><span> <FaListUl /></span>Gerenciar documentação</h2>
                <Link to={`/team/${team.url}/doc/new`} className={style.btnDocs}><FaPlus /></Link>
              </div>
              <DocsTeams
                DocsScripts={DocsScripts}
                team={team}
                userOk={userOk}
              />
            </div>
          )}

          {typeMenu === "classes" && (
            <div className={style.ListMembersEdit}>
              <div className='divMainForms'>
                <h2><span> <FaListUl /></span>Postar Aula</h2>
                <button onClick={() => setAddMember(!addMember)} className={style.btnDocs}>{!addMember ? <FaPlus /> : <IoArrowUndo />}</button>
              </div>
              <FormClasses
              userLocalStorage={userLocalStorage}
                team={team}
              />
            </div>
          )}

{typeMenu === "TableClasses" && (
            <div className={style.ListMembersEdit}>
              <div className='divMainForms'>
                <h2><span> <FaListUl /></span>Postar Aula</h2>
                <button onClick={() => setAddMember(!addMember)} className={style.btnDocs}>{!addMember ? <FaPlus /> : <IoArrowUndo />}</button>
              </div>
              <TableClasses
              userLocalStorage={userLocalStorage}
                team={team}
              />
            </div>
          )}

          {typeMenu === "Controle de Membros" && (
            <div className={style.ListMembersEdit}>
              <div className='divMainForms'>
                <h2><span> <FaListUl /></span>Gerenciar Membros</h2>
                <button onClick={() => setAddMember(!addMember)} className={style.btnDocs}>{!addMember ? <FaPlus /> : <IoArrowUndo />}</button>
              </div>
              {!addMember ? (
                <TableTeamsMembers team={team} />
              ) : (
                <FormAdd team={team} />
              )}
            </div>
          )}
        </main>
        <article>
          <div className='contentBodyElement'>
            <div className='contentBodyElementTitle'>
              <h3>Menu Rápido</h3>
            </div>
            <ul>
              <li><button onClick={() => setTypeMenu('members')}>Membros <span><FaUsers /></span></button></li>
              <li><button onClick={() => setTypeMenu('docs')}>Documentos<span><IoIosDocument /></span></button></li>
              <li><button onClick={() => setTypeMenu('scripts')}>Scripts<span><IoIosDocument /></span></button></li>
              <li><button onClick={() => setTypeMenu('classes')}>Postar Aula <span>< FaAddressBook /></span></button></li>
            </ul>
          </div>
          {userOk.length > 0 && (team.leader === userOk[0].nickname || team.viceLeader === userOk[0].nickname || ["Admin", "Diretor"].includes(userOk[0].userType)) && (
            <div className='contentBodyElement'>
              <div className='contentBodyElementTitle'>
                <h3>Liderança</h3>
              </div>
              <ul>
                <li><button onClick={() => setTypeMenu("TableClasses")}>Registro de Aulas<span><GiArchiveRegister /></span></button></li>
                <li><button onClick={() => setTypeMenu('Controle de Membros')}>Controle de membros<span><FaUsersCog /></span></button></li>
                <li><button onClick={() => setTypeMenu("editDocs")}>Editar documento<span><MdEditDocument /></span></button></li>
              </ul>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default Teams;
