import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DpanelEdit = ({ userSelect }) => {
    // Definindo estados para as informações editáveis
    const [nickname, setNickname] = useState('');
    const [patent, setPatent] = useState('');
    const [teams, setTeams] = useState([]);
    const [status, setStatus] = useState('');
    const [tag, setTag] = useState('');
    const [warnings, setWarnings] = useState('');
    const [medals, setMedals] = useState('');
    const [userType, setUserType] = useState('');


    useEffect(() => {
        userSelect
        setNickname(userSelect.nickname);
        setPatent(userSelect.patent);
        setTeams(userSelect.teams);
        setStatus(userSelect.status);
        setTag(userSelect.tag)
        setWarnings(userSelect.warnings)
        setMedals(userSelect.medals)
        setUserType(userSelect.userType)
    }, [])

    // Funções para lidar com a edição das informações
    const handleSubmit = (e) => {
        
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Editar Perfil</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nickname:</label>
                <input type="text" value={nickname}  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Patent:</label>
                <select value={patent}  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full">
                    <option value="Patente Atual">Patente Atual</option>
                    <option value="Outra Patente">Outra Patente</option>
                    
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Equipes:</label>
                <input type="text"  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status:</label>
                <input type="text" value={status}  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">TAG:</label>
                <input type="text" value={tag}  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Advertências:</label>
                <input type="text" value={warnings}  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Medalhas:</label>
                <input type="text" value={medals} className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Permissão:</label>
                <select value={userType}  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full">
                    <option value="User">User</option>
                    <option value="Diretor">Diretor</option>
                    <option value="Admin">Admin</option>
                    {/* Adicione mais opções conforme necessário */}
                </select>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Salvar Alterações</button>
            <Link to="/" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-4">Voltar</Link>
        </div>
    );
};

export default DpanelEdit;
