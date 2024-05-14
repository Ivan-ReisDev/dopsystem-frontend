import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'https://dopsystem-backend.vercel.app/api/';

const TeamsContext = createContext("");
const TeamsProvider = ({ children }) => {

    const [message, setMessage] = useState("");
    const [teams, setTeams] = useState([]);
    // const createDocs = async (data) => {
    //     setLoadingDocs(true)
    //     setResOk(false)
    //     try {
    //         const res = await fetch(`${PRD}create/docs`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });

    //         const resJSON = await res.json();
    //         setMessage(resJSON);

    //         if (res.ok) {
    //             console.log("Documento criado com sucesso.");
    //             setResOk(true)
                

    //         } else {
    //             console.log('Não foi possível criar o documento.');
                
    //         }
    //     } catch (error) {
    //         console.error('Erro na criação do documento:', error);
            
    //     }
    //     setLoadingDocs(false)
    // };

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
        getTeams(localStorage.getItem('@Auth:Token'));
    }, [getTeams]);

    return (
        <TeamsContext.Provider
            value={{
                message,
                teams
                
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
