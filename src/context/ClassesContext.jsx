import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'https://dopsystem-backend.vercel.app/api/';

const ClassesContext = createContext("");

const ClassesProvider = ({ children }) => {

    const [Classes, setClasses] = useState([])
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)

    const createClasse = async (data) => {
        try {
            const res = await fetch(`${PRD}create/classe`, {
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
                setMessage('Não foi possível criar o documento.');
                
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            
        }
      
    };

    const createClasseRequeriment = async (data) => {
        setLoading(true)
        try {
            const res = await fetch(`${PRD}create/classe/requirement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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


    const getClasses = useCallback(async (tokenAuth) => {
        try {
            const res = await fetch(`${PRD}get/classe`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenAuth}`,
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
                loading
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
