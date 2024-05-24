import React, { useContext, useEffect, useState } from 'react'
import { IoArrowUndo } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import style from './DpanelTeams.module.css'
import { TeamsContext } from '../../context/TeamsContext';
import DpanelTeamsInfo from '../DpanelTeamsInfo/DpanelTeamsInfo';
import { ClassesContext } from '../../context/ClassesContext';
import DpanelTeamsInfoNew from '../DpanelTeamsInfo/DpanelTeamsInfoNew';


const DpanelTeams = () => {
    const { teams, getTeams } = useContext(TeamsContext);
    const { Classes } = useContext(ClassesContext);
    const [DpanelTeam, setDpanelTeam] = useState("inicio");
    const [team, setTeam] = useState([]);


    const showTeam = () => {
        setDpanelTeam("novo")
        setTeam("");
    }

    const setEditDoc = (team) => {
        setDpanelTeam("Editar")
        setTeam(team);

    }

    return (
        <div>
            <div className={style.head}>
                {DpanelTeam === 'inicio' && <h2 className={style.TitlePrimary}>Equipes</h2>}
                {DpanelTeam === 'novo' || DpanelTeam === "Editar" && <button className={style.back} onClick={() => setDpanelTeam('inicio')}><IoArrowUndo /></button>}
                {DpanelTeam === 'inicio' && <button className={style.back} onClick={() => showTeam()}><FaPlus /></button>}
            </div>

            <div className={style.MainDoc}>
                {DpanelTeam === "inicio" && (
                    <ul className={style.MainDocUL}>
                        {teams && teams.map((team) => {
                            const filteredClasses = Classes.filter(cls => cls.team === team.nameTeams);
                            return (
                                <li className={style.MainDocLI} key={team._id}>
                                    <button onClick={() => setEditDoc(team)}>
                                        <span className={style.title}>{team.nameTeams}</span>
                                        <div className={style.MainDocMain}>
                                            <span><strong>Tipo: </strong> {team.teamsType}</span>
                                            <span><strong>Aulas: </strong>{filteredClasses.length}</span>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {DpanelTeam === "Editar" &&
                    <DpanelTeamsInfo
                        getTeams={getTeams}
                        team={team}
                    />

                }
                {DpanelTeam === "novo" &&
                    <DpanelTeamsInfoNew
                        getTeams={getTeams}
                        team={team}
                    />

                }

            </div>



        </div>
    )
}

export default DpanelTeams