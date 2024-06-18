import React, { useContext, useState } from 'react'
import style from './ListMembers.module.css'
import { Link } from 'react-router-dom'
import { SystemContext } from '../../context/SystemContext';

const ListMembers = ({ infoSystem, select }) => {
    const [users, setUsers] = useState([]);
    const {getPatents, patents} = useContext(SystemContext);

    const handleSelect = async (e) => {
        const patentSelected = e.target.value;
        console.log(patentSelected)
        await getPatents(patentSelected)
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
            { patents.length <= 0 && <h2>Nenhum militar encontrado</h2>}
            {patents &&
                patents.map((user) => (
                    <li key={user.id}>
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
