import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const PRD = 'https://dopsystem-backend.vercel.app/api/';

const ClassesContext = createContext("");

const ClassesProvider = ({ children }) => {
    const token = localStorage.getItem('@Auth:Token')
    const [Classes, setClasses] = useState([])
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)

    const createClasse = async (data) => {
        try {
            const res = await fetch(`${PRD}create/classe`, {
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

            } else {
                setMessage(resJSON); 
                
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }
      
    };

    

    const deleteClasse = async (data) => {
        try {
            const res = await fetch(`${PRD}delete/classe`, {
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

    const createClasseRequeriment = async (data) => {
        setLoading(true)
        try {
            const res = await fetch(`${PRD}create/classe/requirement`, {
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
                setLoading(false)

            } else {
                setMessage('Não foi possível criar o documento.');
                setLoading(false)
            }
            setLoading(false)
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }
      
    };

    const postCI = async (data) => {
        setLoading(true)
        try {
            const res = await fetch(`${PRD}create/ci/requirement`, {
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
                setLoading(false)

            } else {
                setMessage(resJSON);
                setLoading(false)
            }
            setLoading(false)
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }
      
    };



    const getClasses = useCallback(async () => {
        try {
            const res = await fetch(`${PRD}get/classe`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setClasses(data);
        } catch (error) {
            console.log(error.message || 'Erro desconhecido');
        }
    }, []);

    useEffect(() => {
        getClasses(localStorage.getItem('@Auth:Token'));
    }, [getClasses]);

    const editClasse = async (data) => {
        try {
            const response = await fetch(`${PRD}update/classe`, {
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
                setMessage(responseData);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };
    

    return (
        <ClassesContext.Provider
            value={{
                getClasses,
                Classes,
                setMessage,
                message,
                editClasse,
                createClasse,
                createClasseRequeriment,
                loading,
                postCI,
                deleteClasse
            }}
        >
            {children}
        </ClassesContext.Provider>
    );
};

// Propriedades esperadas pelo componente DocsProvider
ClassesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { ClassesProvider, ClassesContext };