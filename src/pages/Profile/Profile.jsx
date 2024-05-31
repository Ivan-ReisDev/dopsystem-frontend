import { UserContext } from "../../context/UserContext";
import { FaUser, FaBook, FaExclamationTriangle, FaHandshake, FaDollarSign } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import style from "./profile.module.css";
import LogoImage from '../../assets/DOP Padrão (com borda).png';
import { CiSearch } from "react-icons/ci";
import React, { useContext, useEffect, useState } from 'react';
import { RequirementsContext } from "../../context/Requirements";
import { AuthContext } from "../../context/AuthContext";
import Preloader from "../../components/Preloader/Preloader";

const Profile = ({ profile }) => {
    const [newProfile, setNewProfile] = useState(null); // Inicializando com null
    const { loading } = useContext(AuthContext);
    const { searchRequerimentsUser, requerimentsArray, formatarDataHora } = useContext(RequirementsContext);
    const [busca, setBusca] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (profile && profile.users) {
            document.title = `Polícia DOP - Perfil`;
            setNewProfile(profile.users[0]);
            searchRequerimentsUser(profile.users[0].nickname) // Selecionando o primeiro usuário do array
        }
    }, [profile]);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchRequerimentsUser(busca);
        navigate(`/search/${busca}`);
    }

    if (loading) {
        return (
            <div className='preloader'>
                <img src={Preloader} alt="" />
            </div>
        );
    }

    if (!newProfile) {
        return <div>Perfil não encontrado.</div>;
    }

    return (
        <div>
            <div className={style.profile}>
                <div className="contentBodyElementTitle">
                    <label>Buscar</label>
                </div>

                <form onSubmit={handleSubmit} className={style.profileUser}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder='Digite a identificação do militar.'
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)} />
                    <button type="submit"><CiSearch /></button>
                </form>
                <div className={style.profileBody}>
                    <article>
                        <div className={style.QuickSearchInfoBody}>
                            <div className={style.header}>
                                <img src={LogoImage} alt="" />
                                <div>
                                    <h4>Departamento de Operações Policiais</h4>
                                    <h4>Carteira de Identificação Militar</h4>
                                </div>
                            </div>
                            <div>
                                <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${newProfile.nickname}&direction=2&head_direction=3&size=m&gesture=sml&action=std`} alt="" />
                            </div>

                            <div>
                                <h3>{newProfile.nickname}</h3>
                                <p><span>Patente: </span>{newProfile.patent}</p>
                                <p><span>TAG: </span>[{newProfile.tag}]</p>
                                <p><span>Status: </span>{newProfile.status}</p>
                                <p><span>Admissão: </span>{formatarDataHora(newProfile.createdAt)}</p>
                                <p><span>Advertências: </span>{newProfile.warnings}</p>
                                <p><span>Medalhas: </span>{newProfile.medals}</p>
                            </div>
                        </div>
                    </article>
                    <main>
                        {requerimentsArray &&
                            requerimentsArray.slice().reverse().map((requeriment, index) => (
                                <div key={index} className={style.requeriment}>
                                    <div className={style.requerimentBody}>
                                        <div className={style.Operator}>
                                            <div>
                                                <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${requeriment.operator}&direction=3&head_direction=3&size=m&action=std`} alt="" />
                                            </div>
                                            <div>
                                                <p><Link to={`/search/${requeriment.operator}`}>{requeriment.operator}</Link> Publicou <strong>{requeriment.typeRequirement}</strong></p>
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
                                                        <p className="text-slate-500"><span><FaDollarSign /></span>{requeriment.newPatent}</p>}
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

                    </main>
                </div>
            </div>
        </div>
    );
}

export default Profile;
