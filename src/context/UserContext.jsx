import { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// const API = 'http://localhost:3000/api/';
const PRD = 'http://localhost:3000/api/';
const UserContext = createContext('');
const UserProvider = ({ children }) => {

    const [usersArray, setUsersArray] = useState("");

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
            console.log('data', data);
            setUsersArray(data); // Atualize o estado local com os novos dados
            return data;
        } catch (error) {
            console.log(error);
        }

    };

    // Fornecimento do contexto para os componentes filhos
    return (
        <UserContext.Provider
            value={{
                usersArray,
                searchAllUsers
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
