import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'http://apipoliciadop.kinghost.net:21092/api/';

const TeamsContext = createContext({});
const TeamsProvider = ({ children }) => {

    const [message, setMessage] = useState("");
    const [teams, setTeams] = useState([]);
    const [infoTeamsArray, setInfoTeamsArray] = useState([]);
    const navigate = useNavigate()

    
    const infoTeams = async (tokenAuth, teams) => {

        try {
            const res = await fetch(`${PRD}teams/info?typeRequirement=${teams}&teams=${teams}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenAuth}`,
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
                },
                body: JSON.stringify(data),
            });

            const DataMSG = await res.json();

            if (res.ok) {
                console.log( "DELETE Teams" + DataMSG);

            } else {
                console.log(DataMSG);
            }
        } catch (error) {
            console.error('Erro ao deletar documento', error);
        }
    };

    

    const createDocs = async (data) => {
        try {
            const res = await fetch(`${PRD}teams/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const resJSON = await res.json();
           
            if (res.ok) {
                setMessage(resJSON);
        
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
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                infoTeams(localStorage.getItem("@Auth:Token"), data.nameTeams)
                console.log("Usuário removido sucesso:", responseData);
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
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                console.log("Usuário removido sucesso:", responseData);
                window.location.reload("/team/Ensino")
            } else {
                console.error("Erro ao remover usuário :", responseData);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };
    const getTeams = useCallback(async (tokenAuth) => {
        try {
            const res = await fetch(`${PRD}teams/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenAuth}`,
                },
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setTeams(data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
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
                createDocs,
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
