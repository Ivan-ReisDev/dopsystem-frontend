import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../provider/axiosInstance';

const TeamsContext = createContext({});

const TeamsProvider = ({ children }) => {
    const token = localStorage.getItem('@Auth:Token');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [teams, setTeams] = useState([]);
    const [infoTeamsArray, setInfoTeamsArray] = useState([]);
    const navigate = useNavigate();

    const infoTeams = async (teams) => {
        try {
            const res = await axiosInstance.get(`teams/info`, {
                params: {
                    typeRequirement: teams,
                    teams: teams,
                },
            });
            setInfoTeamsArray(res.data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        }
    };

    const updateTeam = async (data) => {
        try {
            const response = await axiosInstance.put('teams/update/', data);
            setMessage(response.data);
        } catch (error) {
            setMessage({ error: 'Ocorreu um erro na atualização da equipe.', details: error.response?.data });
        }
    };

    const deleteTeams = async (data) => {
        try {
            const res = await axiosInstance.delete('teams/delete', {
                data: data,
            });
            setMessage(res.data);
        } catch (error) {
            setMessage(error.response?.data || 'Erro ao deletar documento');
        }
    };

    const createTeams = async (data) => {
        try {
            const res = await axiosInstance.post('teams/create', data);
            setMessage(res.data);
            navigate("/dpanel");
        } catch (error) {
            setMessage({ error: error.response?.data?.error || 'Não foi possível criar equipe.' });
        }
    };

    const removeMember = async (data) => {
        try {
            const response = await axiosInstance.put('teams/remove', data);
            infoTeams(localStorage.getItem("@Auth:Token"), data.nameTeams);
            setMessage(response.data);
        } catch (error) {
            setMessage({ error: error.response?.data || 'Erro ao remover usuário.' });
        }
    };

    const addMember = async (data, team) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put('teams/add', data);
            setMessage(response.data);
            navigate(`/team/${team.nameTeams}`);
        } catch (error) {
            setMessage(error.response?.data || 'Erro ao adicionar membro.');
        } finally {
            setLoading(false);
        }
    };

    const getTeams = useCallback(async () => {
        try {
            const response = await axiosInstance.get('teams/all');
            setTeams(response.data);
            setMessage(response.data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        }
    }, [navigate]);

    useEffect(() => {
        if (token) {
            getTeams(token);
        }
    }, [getTeams, token]);

    return (
        <TeamsContext.Provider
            value={{
                message,
                setMessage,
                teams,
                infoTeamsArray,
                infoTeams,
                removeMember,
                addMember,
                updateTeam,
                getTeams,
                createTeams,
                deleteTeams,
                loading,
            }}
        >
            {children}
        </TeamsContext.Provider>
    );
};

// Propriedades esperadas pelo componente TeamsProvider
TeamsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { TeamsProvider, TeamsContext };
