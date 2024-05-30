import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'http://apipoliciadop.kinghost.net:21092/api/';

const TeamsContext = createContext({});
const TeamsProvider = ({ children }) => {
    const token = localStorage.getItem('@Auth:Token')
    const [message, setMessage] = useState("");
    const [teams, setTeams] = useState([]);
    const [infoTeamsArray, setInfoTeamsArray] = useState([]);
    const navigate = useNavigate()
    const infoTeams = async (teams) => {

        try {
            const res = await fetch(`${PRD}teams/info?typeRequirement=${teams}&teams=${teams}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const resJSON = await res.json();
           
            if (res.ok) {
                setMessage(resJSON);
                navigate("/dpanel")
            } else {
                setMessage('Não foi possível criar equipe.');
                
                
            }
        } catch (error) {
            console.error('Erro na criação da equipe:', error);
            
        }
 
    };




    const removeMember = async (data) => {
        try {
            const response = await fetch(`${PRD}teams/remove`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                infoTeams(localStorage.getItem("@Auth:Token"), data.nameTeams)
                setMessage(responseData);
            } else {
                console.error("Erro ao remover usuário :", responseData);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };


    const addMember = async (data) => {
        try {
            const response = await fetch(`${PRD}teams/add`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                setMessage(responseData);
                window.location.reload("/team/Ensino")
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
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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
        const token = localStorage.getItem('@Auth:Token');
        if (token) {
            getTeams(token);
        }
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
                deleteTeams
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
