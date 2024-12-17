import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axiosInstance from '../provider/axiosInstance'; // Importa o axios configurado

const RequirementsContext = createContext("");
const RequirementsProvider = ({ children }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [requerimentsFilter, setRequerimentsFilter] = useState([]);
    const [requerimentsClasses, setRequerimentsClasses] = useState([]);
    const [requerimentsArray, setRequerimentsArray] = useState([]);
    const [loadingReq, setLoadingReq] = useState(false);
    const { setLoading } = useContext(AuthContext);

    const createRequeriment = async (data) => {
        try {
            const res = await axiosInstance.post('post/requirement/promoted', data);
            setMessage(res.data);
            if (res.status === 201) {
                navigate(`/search/${data.promoted}`);
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            setMessage(error.response?.data || 'Erro desconhecido');
        }
    };

    const createRequerimentRelegation = async (data) => {
        try {
            const res = await axiosInstance.post('post/requirement/relegation', data);
            setMessage(res.data);
            if (res.status === 201) {
                navigate(`/search/${data.promoted}`);
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            setMessage(error.response?.data || 'Erro desconhecido');
        }
    };

    const createRequerimentWarning = async (data) => {
        try {
            const res = await axiosInstance.post('post/requirement/warning', data);
            setMessage(res.data);
            if (res.status === 201) {
                navigate(`/search/${data.promoted}`);
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            setMessage(error.response?.data || 'Erro desconhecido');
        }
    };

    const createRequerimentResignationUpdateUser = async (idUser, promoted) => {
        try {
            const res = await axiosInstance.put('put/requirement/resignation', { idUser });
            setMessage(res.data);
            if (res.status === 200) {
                navigate(`/search/${promoted}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar produto', error);
            setMessage(error.response?.data || 'Erro desconhecido');
        }
    };

    const createRequerimentResignation = async (data) => {
        try {
            const res = await axiosInstance.post('post/requirement/resignation', data);
            setMessage(res.data);
            if (res.status === 201) {
                createRequerimentResignationUpdateUser(data.idUser, data.promoted);
                navigate(`/search/${data.promoted}`);
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            setMessage(error.response?.data || 'Erro desconhecido');
        }
    };

    const createRequerimentContract = async (data) => {
        try {
            const res = await axiosInstance.post('post/requeriments/contract', data);
            setMessage(res.data);
            if (res.status === 201) {
                setMessage('Requerimento postado com sucesso.');
                navigate(`/search/${data.promoted}`);
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            setMessage(error.response?.data || 'Erro desconhecido');
        }
    };

    const createRequerimentSale = async (data) => {
        try {
            const res = await axiosInstance.post('post/requeriments/sales', data);
            setMessage(res.data);
            if (res.status === 201) {
                navigate(`/search/${data.promoted}`);
            }
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            setMessage(error.response?.data || 'Erro desconhecido');
        }
    };

    const searchRequerimentsUser = useCallback(async (nickname) => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`search/requeriments?promoted=${nickname}`);
            setRequerimentsArray(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const searchRequerimentsPromotedsUser = async (typeRequirement, statusRequirement) => {
        setLoadingReq(true);
        try {
            const res = await axiosInstance.get(`search/requeriments/promoteds?typeRequirement=${typeRequirement}&statusRequirement=${statusRequirement}`);
            setRequerimentsFilter(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingReq(false);
        }
    };

    const searchRequerimentsClasses = async (teamRequirement, page, limit) => {
        try {
            const res = await axiosInstance.get(`search/requeriments/teams?teamRequirement=${teamRequirement}&page=${page}&limit=${limit}`);
            setRequerimentsClasses(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function formatarDataHora(dataHoraString) {
        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        const dataHora = new Date(dataHoraString);
        const dia = String(dataHora.getDate()).padStart(2, '0');
        const mes = meses[dataHora.getMonth()];
        const ano = dataHora.getFullYear();
        const hora = String(dataHora.getHours()).padStart(2, '0');
        const minuto = String(dataHora.getMinutes()).padStart(2, '0');
        const segundo = String(dataHora.getSeconds()).padStart(2, '0');

        return `${dia} de ${mes} de ${ano} ${hora}:${minuto}:${segundo}`;
    }

    return (
        <RequirementsContext.Provider
            value={{
                searchRequerimentsUser,
                requerimentsArray,
                formatarDataHora,
                requerimentsFilter,
                searchRequerimentsPromotedsUser,
                createRequeriment,
                createRequerimentRelegation,
                createRequerimentWarning,
                createRequerimentResignation,
                createRequerimentContract,
                createRequerimentSale,
                setRequerimentsClasses,
                requerimentsClasses,
                searchRequerimentsClasses,
                loadingReq,
                message
            }}
        >
            {children}
        </RequirementsContext.Provider>
    );
};

// Propriedades esperadas pelo componente TeamsProvider
RequirementsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { RequirementsProvider, RequirementsContext };
