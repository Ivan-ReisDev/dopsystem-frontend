import { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// const API = 'http://localhost:3000/api/';
const PRD = 'https://dopsystem-backend.vercel.app/api/';

const UserContext = createContext('');
const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [usersArray, setUsersArray] = useState('');
 
    const [loggers, setLoggers] = useState([])

    const tokenUser = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

    const searchAllUsers = async (nickname) => {
        try {
            const value = nickname ? nickname.target.value : '';
            
            const res = await fetch(`${PRD}search?nickname=${value}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenUser.token}`,
                },
            });
            const data = await res.json();
            console.log('data' + "TESSSSSSSSSSTEEEEEEEEEEEEEE" + JSON.parse(data) );
            setUsersArray(data); // Atualize o estado local com os novos dados
            return data;
        } catch (error) {
            console.log(error);
        }

    };

    const getLogs = useCallback(async (tokenAuth, nickname) => {
        try {
            const res = await fetch(`${PRD}loggers?nickname=${nickname}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenAuth}`,
                },
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setLoggers(data);
        } catch (error) {
            console.log(error.message || 'Erro desconhecido');
        }
    }, []);

    useEffect(() => {
        if(localStorage.getItem('@Auth:Token') && tokenUser){
            getLogs(localStorage.getItem('@Auth:Token'), tokenUser.nickname)
        }
    }, [navigate]);

    // Fornecimento do contexto para os componentes filhos
    return (
        <UserContext.Provider
            value={{
                usersArray,
                searchAllUsers,
                getLogs,
                loggers,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Propriedades esperadas pelo componente AuthContext
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { UserContext, UserProvider };
