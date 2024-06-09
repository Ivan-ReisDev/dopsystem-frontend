import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SystemContext } from '../../context/SystemContext';
import { UserContext } from '../../context/UserContext';

const DpanelEdit = ({ userSelect, setpage }) => {
    const { infoSystem } = useContext(SystemContext);
    const { updateUserAdmin, messege } = useContext(UserContext);
    const [nickname, setNickname] = useState('');
    const [patent, setPatent] = useState('');
    const [status, setStatus] = useState('');
    const [tag, setTag] = useState('');
    const [warnings, setWarnings] = useState('');
    const [medals, setMedals] = useState('');
    const [userType, setUserType] = useState('');

    const userAdmin = JSON.parse(localStorage.getItem("@Auth:Profile"));
    
    useEffect(() => {
        if (userSelect) {
            setNickname(userSelect.nickname || '');
            setPatent(userSelect.patent || '');
            setStatus(userSelect.status || '');
            setTag(userSelect.tag || '');
            setWarnings(userSelect.warnings || '');
            setMedals(userSelect.medals || '');
            setUserType(userSelect.userType || '');
        }
    }, [userSelect]);

    const body = infoSystem && infoSystem[0]?.patents?.includes(userSelect.patent);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            idUser: userAdmin._id,
            idEdit: userSelect._id,
            nickname,
            patent,
            status,
            tag,
            warnings,
            medals,
            userType,
        }
        updateUserAdmin(data);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Editar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nickname:</label>
                    <input 
                        type="text" 
                        value={nickname} 
                        onChange={(e) => setNickname(e.target.value)} 
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Patente:</label>
                    <select 
                        value={patent} 
                        onChange={(e) => setPatent(e.target.value)} 
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                    >
                        <option value={userSelect.patent}>{userSelect.patent}</option>
                        {infoSystem && infoSystem[0] && 
                            (body ? 
                                infoSystem[0].patents.map((patent) => (
                                    <option key={patent} value={patent}>{patent}</option>
                                )) :
                                infoSystem[0].paidPositions.map((patent) => (
                                    <option key={patent} value={patent}>{patent}</option>
                                ))
                            )
                        }
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status:</label>
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                    >
                        <option value="Ativo">Ativo</option>
                        <option value="Desativado">Desativado</option>
                        <option value="Exonerado">Exonerado</option>
                        <option value="Banido">Banido</option>
                        <option value="Reformado">Reformado</option>
                        <option value="CFO">CFO</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">TAG:</label>
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => {
                            if (e.target.value.length <= 3) {
                                setTag(e.target.value);
                            }
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Advertências:</label>
                    <input
                        type="number"
                        max={5}
                        min={0}
                        value={warnings}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (value >= 0 && value <= 5) {
                                setWarnings(value);
                            }
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Medalhas:</label>
                    <input
                        type="number"
                        value={medals}
                        min={0}
                        max={200}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (value >= 0 && value <= 200) {
                                setMedals(value);
                            }
                        }}
                        onBlur={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (value > 200) {
                                setMedals(200);
                            } else if (value < 0) {
                                setMedals(0);
                            }
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Permissão:</label>
                    <select 
                        value={userType} 
                        onChange={(e) => setUserType(e.target.value)} 
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                    >
                        <option value="User">User</option>
                        <option value="Recursos Humanos">Recursos Humanos</option>
                        <option value="Diretor">Diretor</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                {messege && <p className="text-green-500">{messege.msg}</p>}
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Salvar Alterações
                </button>
                <button  onClick={() => setpage("inicial")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-4">
                    Voltar
                </button>
            </form>
        </div>
    );
};

export default DpanelEdit;
