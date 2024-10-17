import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../provider/axiosInstance'; // Importa o axios configurado

const DocsContext = createContext("");

const DocsProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [resOk, setResOk] = useState(false);
    const [Documents, setDocuments] = useState([]);
    const [docSelected, setDocSelected] = useState([]);
    const [loadingDocs, setLoadingDocs] = useState(false);
    const navigate = useNavigate();

    const createDocs = async (data) => {
        setLoadingDocs(true);
        setResOk(false);
        try {
            const res = await axiosInstance.post('create/docs', data);

            setMessage(res.data);
            setResOk(true);
            navigate(`/`);
        } catch (error) {
            console.error('Erro na criação do documento:', error);
            setMessage('Não foi possível criar o documento.');
        } finally {
            setLoadingDocs(false);
        }
    };

    const deleteDoc = async (data) => {
        try {
            const res = await axiosInstance.delete('delete/docs', {
                data: data,
            });

            setMessage(res.data);
        } catch (error) {
            console.error('Erro ao deletar documento', error);
            setMessage(error.response?.data || 'Erro ao deletar documento');
        }
    };

    const editDoc = async (data) => {
        try {
            const response = await axiosInstance.put('update/docs', data);

            setMessage(response.data);
            navigate(`/doc/${data.idDoc}`);
        } catch (error) {
            console.error("Erro na requisição:", error);
            setMessage(error.response?.data || 'Erro ao atualizar documento');
        }
    };

    const getDocuments = async (page, limit) => {
        setLoadingDocs(true);
        try {
            const res = await axiosInstance.get(`all/docs?page=${page}&limit=${limit}`);
            setDocuments(res.data);
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        } finally {
            setLoadingDocs(false);
        }
    };

    const searchDoc = async (typeDocument) => {
        setLoadingDocs(true);
        try {
            const res = await axiosInstance.get(`doc/search?typeDocument=${typeDocument}`);
                if (Array.isArray(res.data)) {
                    setDocSelected(res.data);
                    setLoadingDocs(false)
                    return res.data;
                } else {
                    console.error('A resposta não é um array:', res.data);
                    return [];
                }
            
        } catch (error) {
            console.error('Erro ao buscar documentos:', error);
            setLoadingDocs(false)
            throw new Error(error.message || 'Erro ao buscar documentos');
        } finally {
            setLoadingDocs(false);
        }
    };

    const searchDocCompleted = async (urlDocument) => {
        setLoadingDocs(true);
        try {
            const res = await axiosInstance.get(`doc?urlDocument=${urlDocument}`);
                setDocSelected(res.data);
                return res.data;
        } catch (error) {
            throw new Error(error.message || 'Error fetching user');
        } finally {
            setLoadingDocs(false);
        }
    };

    return (
        <DocsContext.Provider
            value={{
                createDocs,
                Documents,
                loadingDocs,
                message,
                resOk,
                editDoc,
                deleteDoc,
                getDocuments,
                setMessage,
                searchDoc,
                docSelected,
                searchDocCompleted
            }}
        >
            {children}
        </DocsContext.Provider>
    );
};

// Propriedades esperadas pelo componente DocsProvider
DocsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { DocsProvider, DocsContext };
