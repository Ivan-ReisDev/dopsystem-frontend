import React from 'react'
import style from './quickSearch.module.css'
import Logo from '../../assets/DOP Padrão (com borda).png'
import { CiSearch } from "react-icons/ci";


const QuickSearch = () => {
    return (
        <div className={`contentBodyElement ${style.QuickSearch}`}>
            <div className='contentBodyElementTitle'>
                <h3>Busca Rápida</h3>
            </div>

            <div className={`${style.QuickSearchInfo}`} >
                <div className={style.QuickSearchInput}>
                    <input type="text" placeholder='Digite a identificação do militar.' />
                    <button><CiSearch /></button>
                </div>
                <div className={style.header}>
                    <img src={Logo} alt="" />
                    <div>
                        <h4>Carteira De Identificação Militar</h4>
                        <h4>Departamento de Operações Policias</h4>
                    </div>
                </div>
                <div className={style.QuickSearchInfoBody}>
                    <div className={style.img}>
                        <img className='' src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=.Disco.Master.&direction=3&head_direction=3&size=l&action=std" alt="" />
                    </div>

                    <div className={style.info}>
                        <p><span>Nick: </span>.Disco.Master.</p>
                        <p><span>Patente: </span>Dono</p>
                        <p><span>TAG: </span>[DsM]</p>
                        <p><span>Status: </span>Ativo</p>
                        <p><span>Admissão: </span>12/11/2010</p>
                        <p><span>Advertências: </span>0</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuickSearch