import React, { useContext, useEffect, useState } from 'react';
import style from './TableTeamsMembers.module.css';
import { TeamsContext } from '../../context/TeamsContext';
import Confirmation from '../Confirmation/Confirmation';

const TableTeamsMembers = ({ team, userOk }) => {
    const { infoTeamsArray, infoTeams } = useContext(TeamsContext);
    const [isRemove, setIsRemove] = useState(false);
    const [dataUser, setDataUser] = useState([])

    const handleRemove = (data) => {
        setDataUser(data)
        setIsRemove(true)
    }

    useEffect(() => {
        const fetchTeamInfo = async () => {
            const token = localStorage.getItem("@Auth:Token");
            await infoTeams(token, team.nameTeams); // Use infoTeams com "i" minúsculo
        };

        fetchTeamInfo();
        console.log(infoTeamsArray)
        // .requirements.length
        // nickname
        //office
    }, []);
    console.log(isRemove)

    return (
        <> {!isRemove && <div className={style.ListTeamsMembers}>


            <div>
                <h2><span>Nickname</span> <span>Cargo</span> <span>Total de aulas</span> <span>Ação</span></h2>
            </div>
            <ul>
                {infoTeamsArray && infoTeamsArray.map((user, requirement) => (
                    <li key={user.user.nickname}>
                        <span>{user.user.nickname}</span>
                        <span>{user.user.office}</span>
                        <span>{user.requirements.length}</span>
                        <span>
                            <button onClick={() => handleRemove(user)} className={style.buttonExcluir}>Excluir</button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>

        }

            {isRemove &&
                <Confirmation
                    team={team}
                    userOk={userOk}
                    dataUser={dataUser}
                    setIsRemove={setIsRemove}
                />
            }

        </>


    );
};

export default TableTeamsMembers;
