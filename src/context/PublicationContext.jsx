import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PRD = 'https://dopsystem-backend.vercel.app/api/';

const PublicationContext = createContext("");

const PublicationProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [allPublications, setAllPublications] = useState([])
    const token = localStorage.getItem('@Auth:Token');

    const createPublication = async (data) => {
        try {
            const res = await fetch(`${PRD}create/publication`, {
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
            setMessage('Erro na criação do documento');
        }
    };

    const getPublication = async () => {
        try {
            const res = await fetch(`${PRD}publication`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setAllPublications(data);
            setMessage(data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        }
    };

    return (
        <PublicationContext.Provider
            value={{
                message, 
                setMessage,
                createPublication,
                getPublication,
                allPublications
  
            }}
        >
            {children}
        </PublicationContext.Provider>
    );
};

// Propriedades esperadas pelo componente PublicationProvider
PublicationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { PublicationProvider, PublicationContext };
