import { UserContext } from "../../context/UserContext";
import { FaUser, FaBook, FaExclamationTriangle, FaHandshake, FaDollarSign  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import style from "./profile.module.css"
import Logo from '../../assets/DOP Padrão (com borda).png'
import { CiSearch } from "react-icons/ci";
import React, { useContext, useEffect, useState } from 'react'
import { RequirementsContext } from "../../context/Requirements";
import { AuthContext } from "../../context/AuthContext";
import Preloader from "../../components/Preloader/Preloader";
const Profile = ({ profile }) => {
    const { searchAllUsers, usersArray } = useContext(UserContext);
    const { loading } = useContext(AuthContext)
    const { searchRequerimentsUser, requerimentsArray, formatarDataHora } = useContext(RequirementsContext);
    const [busca, setBusca] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        searchRequerimentsUser(profile.nickname);
    }, [navigate]);

    useEffect(() => {
        document.title = `Polícia DOP - Perfil ${profile.nickname}`;
    }, [])


    const hadleSubmitt = (e) => {
        e.preventDefault()
        searchRequerimentsUser(busca)
        navigate(`/search/profile/${busca}`)
    }


    if (loading) {
        return (
            <div className='preloader'>
                <img src={Preloader} alt="" />
            </div>
        )
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
                        onChange={(e) => setBusca(e.target.value)} />
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
                                <p><span>Advertências: </span>{profile.warnings}</p>
                                <p><span>Medalhas: </span>{profile.medals}</p> { }
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
                                                <div className="flex ">

                                                    {(requeriment.typeRequirement === "Promoção" ||
                                                        requeriment.typeRequirement === "Rebaixamento") &&
                                                        <p className="text-slate-500"><span><FaUser /></span> {requeriment.newPatent}</p>}
                                                    
                                                    {(requeriment.typeRequirement === "Aula") &&
                                                        <p className="text-slate-500"><span><FaBook /></span> {requeriment.classe}</p>}
                                                    {(requeriment.typeRequirement === "Advertência") &&
                                                        <p className="text-slate-500"><span><FaExclamationTriangle /></span>Advertência</p>}

                                                    {(requeriment.typeRequirement === "Contrato") &&
                                                        <p className="text-slate-500"><span><FaHandshake /></span>{requeriment.newPatent}</p>}

                                                    {(requeriment.typeRequirement === "Venda") &&
                                                        <p className="text-slate-500"><span><FaDollarSign  /></span>{requeriment.newPatent}</p>}
                                                    {requeriment.status === "Pendente" && <p className="bg-yellow-600 text-white font-semibold text-[12px] w-[80px] h-[18px] rounded-sm flex items-center justify-center">{requeriment.status}</p>}
                                                    {requeriment.status === "Aprovado" && <p className="bg-green-600 text-white font-semibold text-[12px] w-[80px] h-[18px] rounded-sm flex items-center justify-center">{requeriment.status}</p>}
                                                    {requeriment.status === "Reprovado" && <p className="bg-red-600 text-white font-semibold text-[12px] w-[80px] h-[18px] rounded-sm flex items-center justify-center">{requeriment.status}</p>}
                                                </div>
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