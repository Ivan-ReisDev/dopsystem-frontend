import React, { useContext, useEffect, useState } from 'react';
import style from './teams.module.css';
import { RiTeamFill } from "react-icons/ri";
import { FaAddressBook, FaArrowAltCircleUp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Teams = ({ team }) => {
  const storedUser = localStorage.getItem("@Auth:ProfileUser");
  const userLocalStorege = storedUser ? JSON.parse(storedUser) : {};

  const { searchAllUsers, user } = useContext(UserContext);
  const [userOk, setUserOK] = useState([]);

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
    if (userOk.length > 0) {
      console.log(userOk[0].nickname);
    }
  }, [userOk]);

  return (
    <div className={style.Teams}>
      <div className={style.TeamsHeader}>
        <h2><RiTeamFill /> {team.nameTeams}</h2>
        <span>Membros: {team.members.length + 2}</span>
      </div>
      <div className={style.TeamsBody}>
        <main>
          <div>
            <h2>Lista de Membros</h2>
          </div>
          <h3>Líder</h3>
          <ul>
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
          <ul>
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
          <ul>
            {team && team.coordinator.map((user) => (
              <li key={user}>
                <Link to={`/search/profile/${user}`}>
                  <div>
                    <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${user}&direction=3&head_direction=3&size=m&action=std`} alt="" />
                  </div>
                  {user}
                </Link>
              </li>
            ))}
          </ul>
          <h3>Membros</h3>
          <ul>
            {team && team.members.map((user) => (
              <li key={user}>
                <Link to={`/search/profile/${user}`}>
                  <div>
                    <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${user}&direction=3&head_direction=3&size=m&action=std`} alt="" />
                  </div>
                  {user}
                </Link>
              </li>
            ))}
          </ul>
        </main>
        <article>
          <div className='contentBodyElement'>
            <div className='contentBodyElementTitle'>
              <h3>Menu Rápido</h3>
            </div>
            <ul>
              <li><button>Membros <span><FaAddressBook /></span></button></li>
              <li><button>Documentos<span><FaArrowAltCircleUp /></span> </button></li>
            </ul>
          </div>
          {userOk.length > 0 && ( team.leader === userOk[0].nickname || team.viceLeader === userOk[0].nickname || userOk[0].userType === "Admin") && (
            <div className='contentBodyElement'>
              <div className='contentBodyElementTitle'>
                <h3>Liderança</h3>
              </div>
              <ul>
                <li><button>Controle de membros<span><FaAddressBook /></span></button></li>
                <li><button>Documentos<span><FaArrowAltCircleUp /></span> </button></li>
                <li><button>Destaques<span><FaArrowAltCircleUp /></span> </button></li>
              </ul>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default Teams;
