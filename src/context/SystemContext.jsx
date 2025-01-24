import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../provider/axiosInstance'; // Importa o axios configurado

const SystemContext = createContext("");

const SystemProvider = ({ children }) => {
    const [infoSystem, setInfoSystem] = useState([]);
    const [info, setInfo] = useState([]);
    const [messege, setMessage] = useState('');
    const [patents, setPatents] = useState([]);
    const [images, setImages] = useState({})
    const [infoSystemDpanel, setInfoSystemDpanel] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSystemDpanel = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('infos');

            if (response.data && response.data.systemInfo) {
                setInfo(response.data.info || []);
                setInfoSystemDpanel(response.data.systemInfo || []);
            } else {
                throw new Error('Dados incompletos na resposta da API');
            }
            setMessage(response.data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    const getSystem = useCallback(async () => {
        try {
            const response = await axiosInstance.get('all/info');
            setInfoSystem(response.data || []);
            setMessage(response.data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        }
    }, []);

    useEffect(() => {
        getSystem();
    }, [getSystem]);


    const updateSystemImages = async (data) => {
        try {
            const response = await axiosInstance.put('images', data);
            if (response.ok) {
                setMessage(response.data);
            } else {
                setMessage({ error: 'Ocorreu um erro na atualização do sistema.', details: response.data });
            }
        } catch (error) {
            setMessage({ error: 'Erro na requisição. Por favor, tente novamente mais tarde.' });
        }
    };

    const updateSystem = async (data) => {
        try {
            const response = await axiosInstance.put('infos', data);
            if (response.ok) {
                setMessage(response.data);
            } else {
                setMessage({ error: 'Ocorreu um erro na atualização do sistema.', details: response.data });
            }
        } catch (error) {
            setMessage({ error: 'Erro na requisição. Por favor, tente novamente mais tarde.' });
        }
    };
    const getImages = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(`images`);
            setImages(response.data || []);
            setLoading(false)
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
            setLoading(false)
        }
    };

    const getPatents = async (patent) => {
        try {
            const response = await axiosInstance.get(`patents?patent=${patent}`);
            setPatents(response.data || []);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        }
    };

    return (
        <SystemContext.Provider
            value={{
                updateSystemImages,
                getImages,
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
                updateSystem,
                images, setImages
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
