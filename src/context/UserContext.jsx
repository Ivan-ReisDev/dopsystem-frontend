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
    const [message, setMessage] = useState("")
    const [user, setUser] = useState([])
    const [loggers, setLoggers] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [itemsPerPage] = useState(10); // Itens por página (ajustável)
    const token = localStorage.getItem('@Auth:Token')
              
    let currentController = null;
    const tokenUser = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

    const searchAllUsers = async (nickname, typeRequeriment) => {
      // Abortar a solicitação anterior se houver uma
      if (currentController) {
        currentController.abort();
      }
    
      // Criar um novo AbortController para a nova solicitação
      currentController = new AbortController();
      const signal = currentController.signal;
    
      try {
        const res = await fetch(`${PRD}search?nickname=${nickname}&typeRequeriment=${typeRequeriment}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          signal, // Passar o signal para o fetch
        });
    
        const data = await res.json();
    
        if (res.ok) {
          setUser(data);
          return data;
        } else {
          throw new Error(data.message || 'Failed to fetch user');
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch request was aborted');
        } else {
          throw new Error(error.message || 'Error fetching user');
        }
      } finally {
        // Limpar o controller depois da solicitação ser concluída
        currentController = null;
      }
    };
     

      const getAll = async (page, pageSize) => {
        try {
          const res = await fetch(`${PRD}all/users?page=${page}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await res.json();
      
          if (res.ok) {
            setUser(data);
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


    const getLogs = async (page = 1, limit = 12) => {
      try {
        const res = await fetch(`${PRD}loggers?nickname=${tokenUser.nickname}&page=${page}&limit=${limit}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (!res.ok) {
          throw new Error('Erro na requisição');
        }
    
        const data = await res.json();
        setLoggers(data.logs); // Definindo os logs retornados
        setCurrentPage(data.currentPage); // Definindo a página atual retornada
        setTotalPages(data.totalPages); // Definindo o total de páginas retornadas
      } catch (error) {
        setMessage(error.message || 'Erro desconhecido');
      }
    };
    
    
    // Função para mudar de página
    const goToPage = (page) => {
      getLogs(page, itemsPerPage);
    };
    
    // Chame getLogs inicialmente para carregar a primeira página
    useEffect(() => {
      getLogs(currentPage, itemsPerPage);
    }, []);
    // Fornecimento do contexto para os componentes filhos
    return (
        <UserContext.Provider
            value={{
                usersArray,
                searchAllUsers,
                setMessege,
                getLogs,
                loggers,
                user,
                messege,
                updateUserAdmin,
                createTag,
                getAll,
                currentPage, 
                setCurrentPage,
                goToPage

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
