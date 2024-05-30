import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'https://apipoliciadop.kinghost.net:21092/api/';
const DocsContext = createContext("");
const DocsProvider = ({ children }) => {

    const token = localStorage.getItem('@Auth:Token')
    const [message, setMessage] = useState('');
    const [resOk, setResOk] = useState(false)
    const [Documents, setDocuments] = useState([]);
    const [docSelected, setDocSelected] = useState([])
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
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const resJSON = await res.json();
           
            if (res.ok) {
                setMessage(resJSON);
                setResOk(true);
                navigate(`/team`)
                

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

    const editDoc = async (data) => {
        try {
            const response = await fetch(`${PRD}update/docs`, {
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
                    'Authorization': `Bearer ${token}`,
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



    const searchDoc = async (typeDocument) => {
        try {
            const res = await fetch(`${PRD}doc/search?typeDocument=${typeDocument}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
    
            if (res.ok) {
                if (Array.isArray(data)) {
                    setDocSelected(data);
                    return data;
                } else {
                    console.error('A resposta não é um array:', data);
                    return [];
                }
            } else {
                throw new Error(data.message || 'Erro ao buscar documentos');
            }
        } catch (error) {
            console.error('Erro ao buscar documentos:', error);
            throw new Error(error.message || 'Erro ao buscar documentos');
        }
    };

      const searchDocCompleted = async (idDocument) => {
        try {
          const res = await fetch(`${PRD}doc?idDocument=${idDocument}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await res.json();
      
          if (res.ok) {
            setDocSelected(data)
            return data;
          } else {
            throw new Error(data.message || 'Failed to fetch user');
          }
        } catch (error) {
          throw new Error(error.message || 'Error fetching user');
        }
      };


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
                setMessage,
                searchDoc,
                docSelected,
                searchDocCompleted
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
