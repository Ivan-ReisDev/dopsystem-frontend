import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PRD = 'https://dopsystem-backend.vercel.app/api/';

const RequirementsContext = createContext("");
const RequirementsProvider = ({ children }) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("");
    const [teams, setTeams] = useState("");
    const [requerimentsFilter, setRequerimentsFilter] = useState([])
    const [requerimentsArray, setRequerimentsArray] = useState([])
    const {setLoading, getProfileAll} = useContext(AuthContext);
    const token = localStorage.getItem('@Auth:Token')
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

    const createRequeriment = async (data) => {

        try {
            const res = await fetch(`${PRD}post/requirement/promoted`, {
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
                navigate(`/search/profile/${data.promoted}`)
            } else {
                setMessage(resJSON);;
                
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }

    };
    


    const createRequerimentRelegation = async (data) => {

        try {
            const res = await fetch(`${PRD}post/requirement/relegation`, {
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
                navigate(`search/profile/${data.promoted}`)
            } else {
                setMessage(resJSON);
                
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }

    };

    const createRequerimentWarning = async (data) => {

        try {
            const res = await fetch(`${PRD}post/requirement/warning`, {
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
                navigate(`search/profile/${data.promoted}`)
            } else {
                setMessage(resJSON);
                
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }

    };

    const createRequerimentResignationUpdateUser = async (idUser, promoted) => {

        try {
            const res = await fetch(`${PRD}put/requirement/resignation`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ idUser: idUser }),
            });
    
            const DataMSG = await res.json();
    
            if (res.ok) {
                setMessage(DataMSG)
                navigate(`search/profile/${promoted}`)
            } else {
                setMessage(DataMSG)
            }
        } catch (error) {
            console.error('Erro ao atualizar produto', error);
        }
    };

    const createRequerimentResignation = async (data) => {

        try {
            const res = await fetch(`${PRD}post/requirement/resignation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const resJSON = await res.json();

            if (res.ok) {
                createRequerimentResignationUpdateUser(data.idUser, data.promoted);
                setMessage(resJSON)

            } else {
                setMessage(resJSON);
                
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }

    };

    const createRequerimentContract = async (data) => {

        try {
            const res = await fetch(`${PRD}post/requeriments/contract`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const resJSON = await res.json();

            if (res.ok) {
                getProfileAll()
                setMessage('Requerimento postado com sucesso.');
                navigate(`/search/profile/${data.promoted}`)
            } else {
                setMessage('Não foi possível criar o documento.');
                
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }

    };

    const createRequerimentSale = async (data) => {

        try {
            const res = await fetch(`${PRD}post/requeriments/sales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const resJSON = await res.json();

            if (res.ok) {
                getProfileAll()
                setMessage(resJSON);
                navigate(`/search/profile/${data.promoted}`)
            } else {
                setMessage(resJSON);
                
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }

    };


    const searchRequerimentsUser = useCallback(async (nickname) => {
        setLoading(true);
        try {
            const res = await fetch(`${PRD}search/requeriments?promoted=${nickname}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setRequerimentsArray(data); // Atualize o estado local com os novos dados
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
        }
    }, []);

    const searchRequerimentsPromotedsUser = async (typeRequirement, statusRequirement) => {
        try {
            const res = await fetch(`${PRD}search/requeriments/promoteds?typeRequirement=${typeRequirement}&statusRequirement=${statusRequirement}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setRequerimentsFilter(data); // Atualize o estado local com os novos dados
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    function formatarDataHora(dataHoraString) {
        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
    
        const dataHora = new Date(dataHoraString);
        const dia = String(dataHora.getDate()).padStart(2, '0');
        const mesIndex = dataHora.getMonth();
        const mes = meses[mesIndex];
        const ano = dataHora.getFullYear();
        const hora = String(dataHora.getHours()).padStart(2, '0');
        const minuto = String(dataHora.getMinutes()).padStart(2, '0');
        const segundo = String(dataHora.getSeconds()).padStart(2, '0');
    
        return `${dia} de ${mes} de ${ano} ${hora}:${minuto}:${segundo}`;
    }






    return (
        <RequirementsContext.Provider
            value={{
                searchRequerimentsUser,
                requerimentsArray,
                formatarDataHora,
                requerimentsFilter,
                searchRequerimentsPromotedsUser,
                createRequeriment,
                createRequerimentRelegation,
                createRequerimentWarning,
                createRequerimentResignation,
                createRequerimentContract,
                createRequerimentSale
                
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
