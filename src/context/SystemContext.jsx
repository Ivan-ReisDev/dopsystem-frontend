import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PRD = 'https://dopsystem-backend.vercel.app/api/';

const SystemContext = createContext("");

const SystemProvider = ({ children }) => {
    const [infoSystem, setInfoSystem] = useState([]);
    const [info, setInfo] = useState([]);
    const [messege, setMessage] = useState('');
    const [patents, setPatents] = useState([]);
    const [infoSystemDpanel, setInfoSystemDpanel] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('@Auth:Token');

    const getSystemDpanel = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${PRD}infos`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            if (data && data.systemInfo) {
                setInfo(data.info || []);
                setInfoSystemDpanel(data.systemInfo || []);
            } else {
                throw new Error('Dados incompletos na resposta da API');
            }
            setMessage(data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    const getSystem = useCallback(async () => {
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
            setInfoSystem(data || []);
            setMessage(data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        }
    }, [token]);

    useEffect(() => {
        getSystem(localStorage.getItem('@Auth:Token'));
    }, [getSystem]);

    const updateSystem = async (data) => {
        try {
            const response = await fetch(`${PRD}infos`, {
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
                setMessage({ error: 'Ocorreu um erro na atualização do sistema.', details: responseData });
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setMessage({ error: 'Erro na requisição. Por favor, tente novamente mais tarde.' });
        }
    };

    const getPatents = async (patent) => {
        try {
            const res = await fetch(`${PRD}patents?patent=${patent}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setPatents(data || []);
        } catch (error) {
            console.log(error.message || 'Erro desconhecido');
        }
    };

    return (
        <SystemContext.Provider
            value={{
                infoSystem,
                getSystem,
                messege,
                getPatents,
                patents,
                setPatents,
                infoSystemDpanel,
                getSystemDpanel,
                info,
                loading,
                updateSystem
            }}
        >
            {children}
        </SystemContext.Provider>
    );
};

SystemProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { SystemProvider, SystemContext };
