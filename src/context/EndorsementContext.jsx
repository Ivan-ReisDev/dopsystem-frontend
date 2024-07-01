import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const PRD = 'https://dopsystem-backend.vercel.app/api/';

const EndorsementContext = createContext("");

const EndorsementProvider = ({ children }) => {
    const [EndorsementDb, setEndorsementDb] = useState([]); 
    const [messege, setMessege] = useState('');
    const [loading, setLoading] = useState(false);

    const createEndorsement = async (data) => {
        setLoading(true);
        try {
            const res = await fetch(`${PRD}endorsement`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const resJSON = await res.json();

            if (res.ok) {
                setMessege(resJSON);
                setLoading(false);
            } else {
                setMessege(resJSON);
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro ao postar aval:', error);
            setMessege('Erro ao postar aval');
            setLoading(false);
        }
    };


    const getEndorsement = useCallback(async () => {
        try {
            const res = await fetch(`${PRD}endorsement`, {
                method: 'GET',
                credentials: 'include',

            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setEndorsementDb(data);
            setMessege(data)
        } catch (error) {
            setMessege(error.message || 'Erro desconhecido');
        }
    }, []);

    const EndorsementStatus = async (data) => {
        try {
            const res = await fetch(`${PRD}endorsement/status`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const DataMSG = await res.json();
    
            if (res.ok) {
                setMessege(DataMSG)

            } else {
                getEndorsement()
 
            }
        } catch (error) {
            console.error('Erro ao atualizar produto', error);
        }
    };

    const deleteEndorsement = async (data) => {
        try {
            const res = await fetch(`${PRD}endorsement/delete`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(data),
            });

            const DataMSG = await res.json();

            if (res.ok) {
                setMessege(DataMSG);

            } else {
                setMessege(DataMSG);
            }
        } catch (error) {
            console.error('Erro ao deletar documento', error);
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
                deleteEndorsement

            }}
        >
            {children}
        </EndorsementContext.Provider>
    );
};

// Propriedades esperadas pelo componente DocsProvider
EndorsementProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { EndorsementProvider, EndorsementContext };
