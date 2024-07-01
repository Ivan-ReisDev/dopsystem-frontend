import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'http://localhost:3000/api/';

const TeamsContext = createContext({});
const TeamsProvider = ({ children }) => {
    const [message, setMessage] = useState("");
    const [teams, setTeams] = useState([]);
    const [infoTeamsArray, setInfoTeamsArray] = useState([]);
    const navigate = useNavigate()
    const infoTeams = async (teams) => {
        try {
            const res = await fetch(`${PRD}teams/info?typeRequirement=${teams}&teams=${teams}`, {
                method: 'GET',
                credentials: 'include',
            });
    
            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setInfoTeamsArray(data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        }
    };

    const updateTeam = async (data) => {
        try {
            const response = await fetch(`${PRD}teams/update/`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                setMessage(responseData);
            } else {
                setMessage({ error: 'Ocorreu um erro na atualização da equipe.', details: responseData });
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setMessage({ error: 'Erro na requisição. Por favor, tente novamente mais tarde.' });
        }
    };

    const deleteTeams = async (data) => {
        try {
            const res = await fetch(`${PRD}teams/delete`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const DataMSG = await res.json();

            if (res.ok) {
                setMessage(DataMSG);
    

            } else {
                setMessage(DataMSG);
            }
        } catch (error) {
            console.error('Erro ao deletar documento', error);
        }
    };

    const createTeams = async (data) => {
        try {
            const res = await fetch(`${PRD}teams/create`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const resJSON = await res.json();
            
            if (res.ok) {
                setMessage(resJSON);
                navigate("/dpanel");
            } else {
                console.error('Erro na resposta:', resJSON);  // Logar o erro detalhado
                setMessage({ error: resJSON.error || 'Não foi possível criar equipe.' });
            }
        } catch (error) {
            console.error('Erro na criação da equipe:', error);
            setMessage({ error: 'Erro na criação da equipe.' });
        }
    };



    const removeMember = async (data) => {
        try {
            const response = await fetch(`${PRD}teams/remove`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                infoTeams(data.nameTeams)
                setMessage(responseData);
            } else {
                console.error("Erro ao remover usuário :", responseData);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };


    const addMember = async (data, team) => {
        try {
            const response = await fetch(`${PRD}teams/add`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                setMessage(responseData);
                navigate(`/team/${team.nameTeams}`)
            } else {
                setMessage(responseData)
                console.error("Erro ao remover usuário :", responseData);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };
    const getTeams = useCallback(async () => {
        try {
            const res = await fetch(`${PRD}teams/all`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setTeams(data);
            setMessage(data)
        } catch (error) {
            setMessage(error || 'Erro desconhecido');
        }
    }, [navigate]);

    useEffect(() => {
            getTeams();
    }, [getTeams]);
    
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
