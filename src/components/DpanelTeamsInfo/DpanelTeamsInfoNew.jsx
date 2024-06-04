import { useContext, useState } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import { useNavigate } from "react-router-dom";



const DpanelTeamsInfoNew = ({ team }) => {
    const { createTeams, message, setMessage } = useContext(TeamsContext);
    const [nameTeams, setNameTeams] = useState('');
    const [leader, setLeader] = useState('');
    const [viceLeader, setViceLeader] = useState('');
    const navigate = useNavigate();
    const idUser = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            idUser,
            nameTeams: nameTeams,
            leader,
            viceLeader
        };
        createTeams(data);
        setNameTeams("")
        setLeader("")
        setViceLeader("")
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {!team && (
                <>
                    <h2 className="text-2xl font-bold mb-4">{team.nameTeams}</h2>
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-lg font-bold mb-4"> Nova Equipe</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nome da equipe</label>
                                <input
                                    type="text"
                                    value={nameTeams}
                                    onChange={(e) => {
                                        setNameTeams(e.target.value)
                                        setMessage('')
                                    }}
                                    placeholder="Digite o nome da equipe"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Líder</label>
                                <input
                                    type="text"
                                    value={leader}
                                    onChange={(e) => {
                                        setLeader(e.target.value)
                                        setMessage('')
                                    }}
                                    placeholder="Digite o nickname do líder da equipe"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Vice-Líder</label>
                                <input
                                    type="text"
                                    value={viceLeader}
                                    onChange={(e) => {
                                        setViceLeader(e.target.value)
                                        setMessage('')
                                    }}
                                    placeholder="Digite o nome do vice líder da equipe"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            {message && <p className="text-red-500">{message.error}</p>}
                            {message && <p className="text-green-500">{message.msg}</p>}
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Criar equipe</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default DpanelTeamsInfoNew;
