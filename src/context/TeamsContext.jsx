import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'https://dopsystem-backend.vercel.app/api/';

const TeamsContext = createContext({});
const TeamsProvider = ({ children }) => {

    const [message, setMessage] = useState("");
    const [teams, setTeams] = useState([]);
    const [infoTeamsArray, setInfoTeamsArray] = useState([]);
    
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
                console.log("Usuário removido sucesso:", responseData);
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
    }, []);

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
                teams,
                infoTeamsArray,
                infoTeams,
                removeMember
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
