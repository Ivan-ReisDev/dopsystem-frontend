import { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../provider/axiosInstance'; // Importa o axios configurado

const EndorsementContext = createContext("");

const EndorsementProvider = ({ children }) => {
    const [EndorsementDb, setEndorsementDb] = useState([]); 
    const [messege, setMessege] = useState('');
    const [loading, setLoading] = useState(false);

    const createEndorsement = async (data) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post('endorsement', data);

            setMessege(res.data);
        } catch (error) {
            console.error('Erro ao postar aval:', error);
            setMessege(error.response?.data || 'Erro ao postar aval');
        } finally {
            setLoading(false);
        }
    };

    const getEndorsement = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('endorsement');

            setEndorsementDb(res.data);
            setMessege(res.data);
        } catch (error) {
            setMessege(error.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }, []);

    const EndorsementStatus = async (data) => {
        try {
            const res = await axiosInstance.put('endorsement/status', data);

            setMessege(res.data);
        } catch (error) {
            console.error('Erro ao atualizar produto', error);
        }
    };

    const deleteEndorsement = async (data) => {
        try {
            const res = await axiosInstance.delete('endorsement/delete', {
                data: data,
            });

            setMessege(res.data);
        } catch (error) {
            console.error('Erro ao deletar documento', error);
            setMessege(error.response?.data || 'Erro ao deletar documento');
        }
    };

    return (
        <EndorsementContext.Provider
            value={{
                createEndorsement,
                messege,
                setMessege,
                loading,
                getEndorsement,
                EndorsementDb,
                EndorsementStatus,
                deleteEndorsement,
            }}
        >
            {children}
        </EndorsementContext.Provider>
    );
};

// Propriedades esperadas pelo componente EndorsementProvider
EndorsementProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { EndorsementProvider, EndorsementContext };
