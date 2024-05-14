import React, { useContext, useState } from 'react'
import style from './quickSearch.module.css'
import Logo from '../../assets/DOP Padrão (com borda).png'
import { CiSearch } from "react-icons/ci";
import { UserContext } from '../../context/UserContext';

const QuickSearch = () => {

    const { searchAllUsers, usersArray } = useContext(UserContext);
    const [firstUser = {}] = usersArray;

    const [seach, setSeach] = useState("");
    

    const infoProfileUser = JSON.parse(localStorage.getItem("@Auth:Profile"))
    return (
        <div className={`contentBodyElement ${style.QuickSearch}`}>
            <div className='contentBodyElementTitle'>
                <h3>Busca Rápida</h3>
            </div>

            <div className={`${style.QuickSearchInfo}`} >
                <div className={style.QuickSearchInput}>
                    <input
                        type="text"
                        name="search"
                        value={seach}
                        id="search"
                        placeholder='Digite a identificação do militar.'
                        onChange={(e) => {
                            setSeach(e.target.value); // Atualiza o estado local com o valor do campo de entrada
                            searchAllUsers(e); // Chama a função searchAllUsers com o evento e como argumento
                        }}
                    />
                    {console.log(usersArray)}
                    <button><CiSearch /></button>
                </div>
                <div className={style.header}>
                    <img src={Logo} alt="" />
                    <div>
                        <h4>Departamento de Operações Policias</h4>
                        <h4>Carteira De Identificação Militar</h4>
                    </div>
                </div>
                {!seach ? (
                    <div className={style.QuickSearchInfoBody}>
                        <div className={style.img}>
                            <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${infoProfileUser.nickname}&direction=3&head_direction=3&size=l&action=std`} alt="" />
                        </div>

                        <div className={style.info}>
                            <p><span>Nick: </span>{infoProfileUser.nickname}</p>
                            <p><span>Patente: </span>{infoProfileUser.patent}</p>
                            <p><span>TAG: </span>[ {infoProfileUser.tag}]</p>
                            <p><span>Status: </span>{infoProfileUser.status}</p>
                            <p><span>Admissão: </span>12/11/2010</p>
                            <p><span>Advertências: </span>{infoProfileUser.warning}</p>
                        </div>
                    </div>
                ) : (
                    <div className={style.QuickSearchInfoBody}>
                        <div className={style.img}>
                            <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${firstUser.nickname}&direction=3&head_direction=3&size=l&action=std`} alt="" />
                        </div>

                        <div className={style.info}>
                            <p><span>Nick: </span>{firstUser.nickname}</p>
                            <p><span>Patente: </span>{firstUser.patent}</p>
                            <p><span>TAG: </span>[ {firstUser.tag}]</p>
                            <p><span>Status: </span>{firstUser.status}</p>
                            <p><span>Admissão: </span>12/11/2010</p>
                            
                            <p><span>Advertências: </span>{firstUser.warning}</p>
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}

export default QuickSearch