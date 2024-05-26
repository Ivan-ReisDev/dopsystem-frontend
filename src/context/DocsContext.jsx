import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'https://apipoliciadop.kinghost.net:21092/api/';

const DocsContext = createContext("");

const DocsProvider = ({ children }) => {

    const [message, setMessage] = useState('');
    const [resOk, setResOk] = useState(false)
    const [Documents, setDocuments] = useState([]);
    const [loadingDocs, setLoadingDocs] = useState(false);
    const navigate = useNavigate()

    const createDocs = async (data) => {
        setLoadingDocs(true)
        setResOk(false)
        try {
            const res = await fetch(`${PRD}create/docs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const resJSON = await res.json();
           
            if (res.ok) {
                setMessage(resJSON);
                setResOk(true);
                getDocuments(localStorage.getItem('@Auth:Token'))
                navigate(`/team/${data.docsType}`)
                

            } else {
                setMessage('Não foi possível criar o documento.');
                
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }
        setLoadingDocs(false)
    };

    const deleteDoc = async (data) => {
        try {
            const res = await fetch(`${PRD}delete/docs`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const DataMSG = await res.json();

            if (res.ok) {
                getDocuments(localStorage.getItem('@Auth:Token'))
                console.log(DataMSG);

            } else {
                console.log(DataMSG);
            }
        } catch (error) {
            console.error('Erro ao deletar documento', error);
        }
    };

    const editDoc = async (data) => {
        try {
            const response = await fetch(`${PRD}update/docs`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                getDocuments(localStorage.getItem('@Auth:Token'))
                setMessage(responseData);
                navigate(`/team/${data.docsType}/doc/${data.idDoc}`)
                
            } else {
                setMessage(responseData);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const getDocuments = useCallback(async (tokenAuth) => {
        try {
            const res = await fetch(`${PRD}all/docs`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenAuth}`,
                },
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setDocuments(data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        }
    }, []);

    useEffect(() => {
        getDocuments(localStorage.getItem('@Auth:Token'));
    }, [getDocuments]);

    return (
        <DocsContext.Provider
            value={{
                createDocs,
                Documents,
                loadingDocs,
                message,
                resOk,
                editDoc,
                deleteDoc,
                getDocuments,
                setMessage
            }}
        >
            {children}
        </DocsContext.Provider>
    );
};

// Propriedades esperadas pelo componente DocsProvider
DocsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { DocsProvider, DocsContext };
