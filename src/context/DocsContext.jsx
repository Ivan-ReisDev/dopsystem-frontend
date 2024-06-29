import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'https://dopsystem-backend.vercel.app/api/';
const DocsContext = createContext("");
const DocsProvider = ({ children }) => {

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
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const resJSON = await res.json();
           
            if (res.ok) {
                setMessage(resJSON);
                setResOk(true);
                navigate(`/`)
                

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

    const editDoc = async (data) => {
        try {
            const response = await fetch(`${PRD}update/docs`, {
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
                navigate(`/doc/${data.idDoc}`)
                
            } else {
                setMessage(responseData);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };


    const getDocuments = async (page, limit) => {
        setLoadingDocs(true);
        try {
            const res = await fetch(`${PRD}all/docs?page=${page}&limit=${limit}`, {
                method: 'GET',
                credentials: 'include',

            });
    
            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setDocuments(data);
            setLoadingDocs(false);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
            setLoadingDocs(false);
        }
    };

    const searchDoc = async (typeDocument) => {
        setLoadingDocs(true);
        try {
            const res = await fetch(`${PRD}doc/search?typeDocument=${typeDocument}`, {
                method: 'GET',
                credentials: 'include', // Garante que os cookies são enviados com a requisição
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
        } finally {
            setLoadingDocs(false);
        }
    };
    
    
    

      const searchDocCompleted = async (idDocument) => {
        setLoadingDocs(true);
        try {
          const res = await fetch(`${PRD}doc?idDocument=${idDocument}`, {
            method: 'GET',
            credentials: 'include',
          });
          const data = await res.json();
      
          if (res.ok) {
            setDocSelected(data)
            setLoadingDocs(false);
            return data;
          } else {
            setLoadingDocs(false);
            throw new Error(data.message || 'Failed to fetch user');
          }
        } catch (error) {
            setLoadingDocs(false);
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
