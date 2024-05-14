import { UserContext } from "../../context/UserContext";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom'
import style from "./profile.module.css"
import Logo from '../../assets/DOP Padrão (com borda).png'
import { CiSearch } from "react-icons/ci";
import React, { useContext } from 'react'
import { RequirementsContext } from "../../context/Requirements";
const Profile = () => {
    const { searchAllUsers, usersArray } = useContext(UserContext);
    const { searchRequerimentsUser, requerimentsArray, formatarData } = useContext(RequirementsContext);
    const [firstUser = {}] = usersArray;
    return (
        <div>
            <div className={style.profile}>
                <div className="contentBodyElementTitle">
                    <label>Buscar</label>
                </div>

                <div className={style.profileUser}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder='Digite a identificação do militar.'
                        onChange={(e) => {
                            searchAllUsers(e)
                            searchRequerimentsUser(e)
                        }

                        } />
                    <button><CiSearch /></button>
                </div>
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
                                <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${firstUser.nickname}&direction=2&head_direction=3&size=m&gesture=sml&action=std`} alt="" />
                            </div>

                            <div>
                                <h3>{firstUser.nickname}</h3>
                                <p><span>Patente: </span>{firstUser.patent}</p>
                                <p><span>TAG: </span>[ {firstUser.tag}]</p>
                                <p><span>Status: </span>{firstUser.status}</p>
                                <p><span>Admissão: </span>12/11/2010</p>
                                <p><span>Advertências: </span>{firstUser.warning}</p>
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
                                                <p><Link to={`/${requeriment.operator}`}>{requeriment.operator}</Link> Publicou <strong>{requeriment.typeRequirement}</strong></p>
                                                <p>{formatarData(requeriment.createdAt)}</p>
                                                <p><span><FaUser /></span> Subcomandante</p> 
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