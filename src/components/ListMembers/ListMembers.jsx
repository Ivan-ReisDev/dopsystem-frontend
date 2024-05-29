import React, { useState } from 'react'
import style from './ListMembers.module.css'
import { Link } from 'react-router-dom'

const ListMembers = ({ infoSystem, select, patents }) => {
    const [users, setUsers] = useState([])

    const handleSelect = (e) => {
        const patentSelected = e.target.value;
        if (select === "Militares") {
            setUsers(patents.filter(user => user.patent === patentSelected));
        } else if (select === "Executivos") {
            setUsers(patents.filter(user => user.patent === patentSelected));
        }

    }
    return (
        <div className={style.ListMembers}>
            <h2>Listagens</h2>
            <label>
                Escolha uma patente ou cargo:
                {select === "Militares" &&
                    <select onChange={handleSelect}>
                        <option value="0" disabled>Selecione uma patente</option>
                        {infoSystem[0].patents.map((patent) => (
                            <option value={patent} key={patent}>{patent}</option>
                        ))}
                    </select>
                }

                {select === "Executivos" &&
                    <select onChange={handleSelect}>
                        <option value="0" disabled>Selecione um Cargo</option>
                        {infoSystem[0].paidPositions.map((patent) => (
                            <option value={patent} key={patent}>{patent}</option>
                        ))}
                    </select>
                }
            </label>
            
            <ul className={style.CardUser}>
            { users.length <= 0 && <h2>Nenhum militar encontrado</h2>}
            {users &&
                users.map((user) => (
                    <li>
                        <Link to={`/search/${user.nickname}`}>
                    <div>
                        <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${user.nickname}&direction=3&head_direction=3&size=m&action=std`} alt="" />
                    </div>
                    {user.nickname}
                    </Link>
                </li>

                ))}

            </ul>

        </div>
    )
}

export default ListMembers
