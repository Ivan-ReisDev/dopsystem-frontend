import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const PRD = 'https://dopsystem-backend.vercel.app/api/';

const PublicationContext = createContext("");

const PublicationProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [allPublications, setAllPublications] = useState([])

    const createPublication = async (data) => {
        try {
            const res = await fetch(`${PRD}create/publication`, {
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
                credentials: 'include',

            });
    
            if (!res.ok) {
                console.error('Erro na requisição', res.status, res.statusText);
                throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`);
            }
    
            const data = await res.json();
            setAllPublications(data); // Verifique se setAllPublications está definido
            setMessage(data); // Verifique se setMessage está definido
 
        } catch (error) {
            // Log adicional para depuração
            console.error('Erro ao buscar publicações:', error);
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
