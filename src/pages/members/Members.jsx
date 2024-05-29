import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";

import style from './members.module.css'
import ListMembers from '../../components/ListMembers/ListMembers';
import { AuthContext } from '../../context/AuthContext';
import { SystemContext } from '../../context/SystemContext';

const Members = () => {

    const { userAllArray } = useContext(AuthContext)
    const { infoSystem } = useContext(SystemContext)
    const [select, setSelect] = useState('menu');
    const [patents, setPatents] = useState([]);

    useEffect(() => {
        document.title = "Polícia DOP - Membros";

    }, []);

    const selectType = async (type) => {
        setSelect(type);
        if (type === "Militares") {
            await setPatents(userAllArray.filter(user => user && infoSystem[0].patents.includes(user.patent) && (user.status === "Ativo" || user.status === "Pendente")));
        } else if (type === "Executivos") {
            await setPatents(userAllArray.filter(user => user && infoSystem[0].paidPositions.includes(user.patent) && (user.status === "Ativo" || user.status === "Pendente")));
        }
    };

    useEffect(() => {
        patents
    }, [patents]);

    return (
        <div className={style.Members}>
            {select && select === "menu" &&

                <>
                    <h2>Escolha uma hierarquia</h2>
                    <div className={style.btns}>
                        <button onClick={() => selectType("Militares")} >Patentes Militares</button>
                        <button onClick={() => selectType("Executivos")}>Cargos Executivos</button>
                    </div>
                </>
            }

           { (select === "Militares" || select === "Executivos") && 
           <main>
                <button onClick={() => setSelect("menu")}> <FaArrowLeft /> Voltar</button>

                <ListMembers
                    patents={patents}
                    infoSystem={infoSystem}
                    select={select}
                />
            </main>}




        </div>
    )
}

export default Members