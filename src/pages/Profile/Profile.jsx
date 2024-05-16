import { UserContext } from "../../context/UserContext";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import style from "./profile.module.css"
import Logo from '../../assets/DOP Padrão (com borda).png'
import { CiSearch } from "react-icons/ci";
import React, { useContext, useEffect, useState } from 'react'
import { RequirementsContext } from "../../context/Requirements";
const Profile = ({profile}) => {
    const { searchAllUsers,  usersArray } = useContext(UserContext);
    const { searchRequerimentsUser, requerimentsArray, formatarDataHora } = useContext(RequirementsContext);
    const [ busca, setBusca] = useState('');
    const navigate = useNavigate();
        useEffect(() => {
            searchRequerimentsUser(profile.nickname);
        }, [navigate]);
        

       const  hadleSubmitt = (e) => {
        e.preventDefault()
        searchRequerimentsUser(busca)
        navigate(`/search/profile/${busca}`)
       }

    return (
        <div>
            <div className={style.profile}>
                <div className="contentBodyElementTitle">
                    <label>Buscar</label>
                </div>

                <form onSubmit={hadleSubmitt} className={style.profileUser}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder='Digite a identificação do militar.'
                        onChange={(e) => setBusca(e.target.value) } />
                    <button type="submit"><CiSearch /></button>
                </form>
                <div className={style.profileBody}>
                    <article>
                        <div className={style.QuickSearchInfoBody}>
                            <div className={style.header}>
                                <img src={Logo} alt="" />
                                <div>
                                    <h4>Departamento de Operações Policias</h4>
                                    <h4>Carteira De Identificação Militar</h4>
                                </div>
                            </div>
                            <div>
                                <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${profile.nickname}&direction=2&head_direction=3&size=m&gesture=sml&action=std`} alt="" />
                            </div>

                            <div>
                                <h3>{profile.nickname}</h3>
                                <p><span>Patente: </span>{profile.patent}</p>
                                <p><span>TAG: </span>[ {profile.tag}]</p>
                                <p><span>Status: </span>{profile.status}</p>
                                <p><span>Admissão: </span>{formatarDataHora(profile.createdAt)}</p>
                                <p><span>Advertências: </span>{profile.warning}</p>
                                <p><span>Medalhas: </span>{profile.warning}</p>
                            </div>
                        </div>
                    </article>
                    <main>
                        {requerimentsArray &&
                            [...requerimentsArray].reverse().map((requeriment, index) => (
                                <div key={index} className={style.requeriment}>
                                    <div className={style.requerimentBody}>
                                        <div className={style.Operator}>
                                            <div>
                                                <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${requeriment.operator}&direction=3&head_direction=3&size=m&action=std`} alt="" />
                                            </div>
                                            <div>
                                                <p><Link to={`/search/profile/${requeriment.operator}`}>{requeriment.operator}</Link> Publicou <strong>{requeriment.typeRequirement}</strong></p>
                                                <p>{formatarDataHora(requeriment.createdAt)}</p>
                                                <p><span><FaUser /></span> {requeriment.newPatent}</p> 
                                                <p>{requeriment.status}</p>
                                            </div>
                                        </div>
                                        <p className={style.motivo}>{requeriment.reason}</p>
                                    </div>

                                </div>
                            ))}
                        <div>

                        </div>


                    </main>
                </div>
            </div>

        </div>
    )
}

export default Profile