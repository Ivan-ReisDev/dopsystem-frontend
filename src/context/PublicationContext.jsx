import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../provider/axiosInstance'; // Importa o axios configurado

const PublicationContext = createContext("");

const PublicationProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [allPublications, setAllPublications] = useState([]);
    const token = localStorage.getItem('@Auth:Token');

    const createPublication = async (data) => {
        try {
            const res = await axiosInstance.post('create/publication', data);

            setMessage(res.data); // Supondo que a resposta contenha a mensagem desejada
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            setMessage(error.response?.data || 'Erro na criação do documento');
        }
    };

    const getPublication = async () => {
        try {
            // Verifique se o token não está undefined ou null
            if (!token) {
                throw new Error('Token não fornecido');
            }

            const res = await axiosInstance.get('publication', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setAllPublications(res.data); // Verifique se setAllPublications está definido
            setMessage(res.data); // Verifique se setMessage está definido
        } catch (error) {
            console.error('Erro ao buscar publicações:', error);
            setMessage(error.response?.data || 'Erro desconhecido');
        }
    };

    return (
        <PublicationContext.Provider
            value={{
                message,
                setMessage,
                createPublication,
                getPublication,
                allPublications,
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
