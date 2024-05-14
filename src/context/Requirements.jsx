import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'http://localhost:3000/api/';

const RequirementsContext = createContext("");
const RequirementsProvider = ({ children }) => {

    const [message, setMessage] = useState("");
    const [teams, setTeams] = useState("");
    const [requerimentsArray, setRequerimentsArray] = useState([])

    // const getTeams = useCallback(async (tokenAuth) => {
    //     try {
    //         const res = await fetch(`${PRD}teams/all`, {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${tokenAuth}`,
    //             },
    //         });

    //         if (!res.ok) {
    //             throw new Error('Erro na requisição');
    //         }
    //         const data = await res.json();
    //         setTeams(data);
    //     } catch (error) {
    //         setMessage(error.message || 'Erro desconhecido');
    //     }
    // }, []);

    // useEffect(() => {
    //     getTeams(localStorage.getItem('@Auth:Token'));
    // }, [getTeams]);



    const searchRequerimentsUser = async (nickname) => {
        try {
            const value = nickname ? nickname.target.value : '';
            const res = await fetch(`${PRD}search/requeriments?promoted=${value}`, {
                method: 'GET',
                headers: {
                    
                },
            });
            const data = await res.json();
            console.log('data', data);
            setRequerimentsArray(data); // Atualize o estado local com os novos dados
            return data;
        } catch (error) {
            console.log(error);
        }

    };

    function formatarData(dataDoMongoDB) {
        const dataObjeto = new Date(dataDoMongoDB);
        const dia = dataObjeto.getDate().toString().padStart(2, '0');
        const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObjeto.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    return (
        <RequirementsContext.Provider
            value={{
                searchRequerimentsUser,
                requerimentsArray,
                formatarData
                
            }}
        >
            {children}
        </RequirementsContext.Provider>
    );
};

// Propriedades esperadas pelo componente TeamsProvider
RequirementsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { RequirementsProvider, RequirementsContext };
