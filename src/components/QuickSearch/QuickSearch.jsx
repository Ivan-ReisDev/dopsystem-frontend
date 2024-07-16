import React, { useContext, useState, useCallback } from 'react';
import style from './quickSearch.module.css';
import Logo from '../../assets/DOP Padrão (com borda).png';
import { CiSearch } from "react-icons/ci";
import { FaAddressBook, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';



const QuickSearch = () => {
  const { searchAllUsers, user } = useContext(UserContext);
  const { formatarDataHora } = useContext(RequirementsContext);
  const [search, setSearch] = useState("");
  const [abortController, setAbortController] = useState(null);

  const firstUser = user && user.users && user.users.length > 0 ? user.users[0] : null;

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);

    // Aborta a solicitação anterior se houver uma
    if (abortController) {
      abortController.abort();
    }

    // Cria um novo AbortController para a nova solicitação
    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    // Chama a função searchAllUsers com o AbortController
    searchAllUsers(value, { signal: newAbortController.signal });
  }, [abortController, searchAllUsers]);

  return (
    <div className={`contentBodyElement ${style.QuickSearch}`}>
      <div className='contentBodyElementTitle'>
        <h3 className=' flex items-center'> <span className='mr-2'><FaSearch /></span> Busca Rápida</h3>
      </div>

      <div className={`${style.QuickSearchInfo}`}>
        <div className={style.QuickSearchInput}>
          <input
            type="text"
            name="search"
            value={search}
            id="search"
            placeholder='Digite a identificação do militar.'
            onChange={handleSearchChange}
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
                <p><span>CDC: </span>{firstUser ? firstUser.code : ''}</p>
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
