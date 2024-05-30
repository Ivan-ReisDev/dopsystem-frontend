import { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// const API = 'http://localhost:3000/api/';
const PRD = 'https://dopsystem-backend.vercel.app/api/';

const UserContext = createContext('');
const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [usersArray, setUsersArray] = useState('');
    const [messege, setMessege] = useState("")
    const [user, setUser] = useState([])
    const [loggers, setLoggers] = useState([])
    const token = localStorage.getItem('@Auth:Token')
              

    const tokenUser = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

    const searchAllUsers = async (nickname, typeRequeriment) => {
        try {
          const res = await fetch(`${PRD}search?nickname=${nickname}&typeRequeriment=${typeRequeriment}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await res.json();
      
          if (res.ok) {
            setUser(data)
            return data;
          } else {
            throw new Error(data.message || 'Failed to fetch user');
          }
        } catch (error) {
          throw new Error(error.message || 'Error fetching user');
        }
      };
     

      const getAll = async () => {
        try {
          const res = await fetch(`${PRD}all/users`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await res.json();
      
          if (res.ok) {
            setUser(data)
            return data;
          } else {
            throw new Error(data.message || 'Failed to fetch user');
          }
        } catch (error) {
          throw new Error(error.message || 'Error fetching user');
        }
      };

    

    const updateUserAdmin = async (data) => {
        try {
            const res = await fetch(`${PRD}admin/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
            console.error(error);
        };
    };

    const createTag = async (data) => {
        try {
            const res = await fetch(`${PRD}update/tag`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const DataMSG = await res.json();
            if (res.ok) {
                setMessege(DataMSG);
                navigate("/home")
            } else {
                setMessege(DataMSG);
            }

        } catch (error) {
            console.error(error);
        };
    };


    const getLogs = async () => {
        try {
            const res = await fetch(`${PRD}loggers?nickname=${tokenUser.nickname}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!res.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await res.json();
            setLoggers(data);
        } catch (error) {
            setMessege(error.message || 'Erro desconhecido');
        }
    };

    // Fornecimento do contexto para os componentes filhos
    return (
        <UserContext.Provider
            value={{
                usersArray,
                searchAllUsers,
                getLogs,
                loggers,
                user,
                messege,
                updateUserAdmin,
                createTag,
                getAll
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
