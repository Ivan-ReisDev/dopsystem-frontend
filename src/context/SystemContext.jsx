import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'https://dopsystem-backend.vercel.app/api/';

const SystemContext = createContext("");

const SystemProvider = ({ children }) => {
    const [infoSystem, setInfoSystem] = useState([])
    const [messege, setMessage] = useState('')
    const token = localStorage.getItem('@Auth:Token')

    const getSystem = useCallback(async (tokenAuth) => {
        try {
            const res = await fetch(`${PRD}all/info`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setInfoSystem(data);
            setMessage(data)
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        }
    }, []);

    useEffect(() => {
        getSystem(localStorage.getItem('@Auth:Token'));
    }, []);

    

    return (
        <SystemContext.Provider
            value={{
                infoSystem,
                getSystem,
                messege
            }}
        >
            {children}
        </SystemContext.Provider>
    );
};

// Propriedades esperadas pelo componente DocsProvider
SystemProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { SystemProvider, SystemContext };
