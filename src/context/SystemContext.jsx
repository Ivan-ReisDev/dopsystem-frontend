import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const PRD = 'https://dopsystem-backend.vercel.app/api/';

const SystemContext = createContext("");

const SystemProvider = ({ children }) => {
    const [infoSystem, setInfoSystem] = useState([])
    const [messege, setMessage] = useState('');
    const [patents, setPatents] = useState([]);

    const getSystem = useCallback(async () => {
        try {
            const res = await fetch(`${PRD}all/info`, {
                method: 'GET',
                credentials: 'include',
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
        getSystem();
    }, []);


    const getPatents = async (patent) => {
        try {
            const res = await fetch(`${PRD}patents?patent=${patent}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setPatents(data);
        } catch (error) {
            console.log(error.message || 'Erro desconhecido');
        }
    }

    return (
        <SystemContext.Provider
            value={{
                infoSystem,
                getSystem,
                messege,
                getPatents,
                patents,
                setPatents
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
