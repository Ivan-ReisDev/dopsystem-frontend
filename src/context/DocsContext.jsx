import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'https://dopsystem-backend.vercel.app/api/';

const DocsContext = createContext("");

const DocsProvider = ({ children }) => {

    const [message, setMessage] = useState('');
    const [resOk, setResOk] = useState(false)
    const [Documents, setDocuments] = useState([]);
    const [loadingDocs, setLoadingDocs] = useState(false);

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
            setMessage(resJSON);

            if (res.ok) {
                console.log("Documento criado com sucesso.");
                setResOk(true)
                

            } else {
                console.log('Não foi possível criar o documento.');
                
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
                console.log(DataMSG.msg);

            } else {
                console.log(`Erro ao excluir documento: ${DataMSG.msg}`);
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
                console.log("Documento atualizado com sucesso:", responseData);
            } else {
                console.error("Erro ao atualizar o documento:", responseData);
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
                getDocuments
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
