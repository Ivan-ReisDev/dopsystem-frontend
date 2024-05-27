import React, { useContext, useEffect, useState } from 'react';
import style from './DpanelTeamsInfo.module.css';
import { TeamsContext } from '../../context/TeamsContext';
import { useNavigate } from 'react-router-dom';


const DpanelTeamsInfoNew = ({ team }) => {
    const { createTeams } = useContext(TeamsContext)
    const [nameTeams, setNameTeams] = useState('')
    const [leader, setLeader] = useState('');
    const [viceLeader, setViceLeader] = useState('')

    const navigate = useNavigate()
    const idUser = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            idUser,
            nameTeams,
            leader,
            viceLeader
        }
        createTeams(data);

    }
    return (
        <div className={style.DpanelTeamsInfo}>
            <div>
                <h2>{team.nameTeams}</h2>
            </div>

            <div className={style.body}>
                <div className={style.main}>
                    <form onSubmit={handleSubmit}>
                        <h2>Atualizar liderança</h2>
                        <label>
                            Nome da equipe:
                            <input
                                type="text"
                                value={nameTeams}
                                placeholder='Digite o nome da equipe.'
                                onChange={(e) => setNameTeams(e.target.value)} // Aqui está a correção
                            />
                        </label>
                        <label>
                            Líder
                            <input
                                type="text"
                                placeholder='Digite o nickname do líder da equipe'
                                value={leader}
                                onChange={(e) => setLeader(e.target.value)}
                            />
                        </label>
                        <label>
                            Vice-Líder
                            <input
                                type="text"
                                placeholder='Digite o nome do vice líder da equipe'
                                value={viceLeader}
                                onChange={(e) => setViceLeader(e.target.value)}
                            />
                        </label>
                        <button className={style.BtnActive}>Criar equipe</button>
                        {/* {messageTeam && <p>{messageTeam.msg}</p>} */}

                    </form>


                </div>
            </div>


        </div>
    );
}

export default DpanelTeamsInfoNew;
