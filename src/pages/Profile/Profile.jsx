import { FaUser, FaBook, FaExclamationTriangle, FaHandshake, FaDollarSign, FaHistory, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import style from "./profile.module.css";
import { CiSearch } from "react-icons/ci";
import { useContext, useEffect, useState } from 'react';
import { RequirementsContext } from "../../context/Requirements";
import { AuthContext } from "../../context/AuthContext";


import Preloader from "../../assets/preloader.gif";
import Functions from "../../components/Funcions/Functions";
import { TeamsContext } from "../../context/TeamsContext";

const Profile = ({ profile }) => {
    const [newProfile, setNewProfile] = useState(null); // Inicializando com null
    const { loading } = useContext(AuthContext);
    const { getTeams, teams } = useContext(TeamsContext);
    const { searchRequerimentsUser, requerimentsArray, formatarDataHora } = useContext(RequirementsContext);
    const [busca, setBusca] = useState('');
    const navigate = useNavigate();

    // Atualiza newProfile quando profile é alterado
    useEffect(() => {
        if (profile && profile.users) {
            document.title = `Polícia DOP - Perfil`;
            const token = localStorage.getItem('@Auth:Token')
            setNewProfile(profile.users[0]);
            searchRequerimentsUser(profile.users[0].nickname, token); 
           // Selecionando o primeiro usuário do array
           getTeams()
        }
    }, [profile, searchRequerimentsUser]);

    // Monitorar mudanças em requerimentsArray para atualizar o estado local
    useEffect(() => {
        requerimentsArray
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        searchRequerimentsUser(busca);
        navigate(`/search/${busca}`);
    }

    if (loading) {
        return (
            <div className='relative flex items-center justify-center h-[100vh] w-[100vw]'>
                <img src={Preloader} alt="Loading..." />
            </div>
        );
    }

    if (!newProfile) {
        return <div>Perfil não encontrado.</div>;
    }

    return (
        <div>
            <div className={style.profile}>
                <div className={style.profileBody}>
                    <article>
                        <div className={style.QuickSearchInfoBody}>
                            <div className={style.ImgFundo}>
                                <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${newProfile.nickname}&direction=3&head_direction=3&size=l&gesture=sml&action=std`} alt="Avatar" />
                            </div>
                            <div>
                                <h3>{newProfile.nickname}</h3>
                                <p><span>Patente: </span>{newProfile.patent}</p>
                                <p><span>TAG: </span>[{newProfile.tag}]</p>
                                <p><span>Status: </span>{newProfile.status}</p>
                                <p><span>Missão: </span>[DOP] {newProfile.patent}</p>
                                <p><span>Advertências: </span>{newProfile.warnings}</p>
                                <p><span>Medalhas: </span>{newProfile.medals}</p>
                                <p><span>Admissão: </span>{formatarDataHora(newProfile.createdAt)}</p>
                            </div>
                        </div>
                    </article>
                    <div className="max-w-[1000px] w-[90%] rounded-t-[5px] contentBodyElementTitle">
                    <label className="flex flex-row justify-center items-center" > <span className="mr-2"><FaSearch /></span> Buscar</label>
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
                    <Functions 
                    teams={teams}
                    profile={profile}
                    />
                    <main className="min-w-[200px] w-full bg-white rounded-md overflow-hidden border border-[#e4e4e4] mb-2.5">
                        <div className="contentBodyElementTitle">
                            <h3 className="flex flex-row"><span className="mr-2"><FaHistory /></span>Histórico Policial</h3>
                        </div>
                        {requerimentsArray && requerimentsArray.length > 0 ? (
                            requerimentsArray.slice().reverse().map((requeriment, index) => (
                                <div key={index} className={style.requeriment}>
                                    <div className={style.requerimentBody}>
                                        <div className={style.Operator}>
                                            <div>
                                                <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${requeriment.operator}&direction=3&head_direction=3&size=m&action=std`} alt="Operator Avatar" />
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
                            ))
                        ) : (
                            <p>Nenhum requerimento encontrado.</p>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Profile;
