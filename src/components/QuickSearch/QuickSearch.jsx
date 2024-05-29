import React, { useContext, useEffect, useState } from 'react';
import style from './quickSearch.module.css';
import Logo from '../../assets/DOP Padrão (com borda).png';
import { CiSearch } from "react-icons/ci";
import { FaAddressBook } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';

const QuickSearch = () => {
    const { searchAllUsers, usersArray, user } = useContext(UserContext);


    const {formatarDataHora } = useContext(RequirementsContext);
    const [search, setSearch] = useState("");
    const infoProfileUser = localStorage.getItem("") ? JSON.parse(localStorage.getItem("@Auth:Profile")) : null;
    const navigate = useNavigate()
    // Verifica se usersArray tem algum usuário
    const firstUser = user && user.users && user.users.length > 0 ? user.users[0] : null;


    return (
        <div className={`contentBodyElement ${style.QuickSearch}`}>
            <div className='contentBodyElementTitle'>
                <h3>Busca Rápida</h3>
            </div>

            <div className={`${style.QuickSearchInfo}`}>
                <div className={style.QuickSearchInput}>
                    <input
                        type="text"
                        name="search"
                        value={search}
                        id="search"
                        placeholder='Digite a identificação do militar.'
                        onChange={(e) => {
                            setSearch(e.target.value); // Atualiza o estado local com o valor do campo de entrada
                            searchAllUsers(e.target.value); // Chama a função searchAllUsers com o valor do campo de entrada como argumento
                        }}
                    />
                    <button><CiSearch /></button>
                </div>
                {search &&
                <>
                <div className={style.header}>
                    <img src={Logo} alt="" />
                    <div>
                        <h4>Departamento de Operações Policiais</h4>
                        <h4>Carteira De Identificação Militar</h4>
                    </div>
                </div> 
                    <div className={style.QuickSearchInfoBody}>
                        <div className={style.img}>
                            <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${firstUser ? firstUser.nickname : ''}&direction=3&head_direction=3&size=l&action=std`} alt="" />
                        </div>

                        <div className={style.info}>
                            <p><span>{firstUser ? firstUser.nickname : ''}</span>{firstUser && <Link to={`/search/${firstUser.nickname}`}><FaAddressBook /></Link>}</p> 
                            <p><span>Patente: </span>{firstUser ? firstUser.patent : ''}</p>
                            <p><span>TAG: </span>[{firstUser ? firstUser.tag : ''}]</p>
                            <p><span>Status: </span>{firstUser ? firstUser.status : ''}</p>
                            <p><span>Admissão: </span>{firstUser ? formatarDataHora(firstUser.createdAt) : ''}</p>
                            <p><span>Advertências: </span>{firstUser ? firstUser.warnings : ''}</p>
                        </div>
                    </div>
                    </>
                }  
            </div>
        </div>
    );
};

export default QuickSearch;
