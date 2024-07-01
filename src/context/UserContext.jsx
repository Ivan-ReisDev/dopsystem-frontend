import { createContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// const API = 'http://localhost:3000/api/';
const PRD = 'http://localhost:3000/api/';

const UserContext = createContext('');
const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [usersArray, setUsersArray] = useState('');
    const [messege, setMessege] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState([]);
    const [loggers, setLoggers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [itemsPerPage] = useState(10); // Itens por página (ajustável)
    const [loading, setLoading] = useState(false);
            
    const tokenUser = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));
    const abortControllerRef = useRef(null);

    const searchAllUsers = async (nickname, typeRequeriment) => {
      // Abortar a solicitação anterior se houver uma
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Criar um novo AbortController para a nova solicitação
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
    
      try {
        const res = await fetch(`${PRD}search?nickname=${nickname}&typeRequeriment=${typeRequeriment}`, {
          method: 'GET',
          credentials: 'include',
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
      }
    };

    const getAll = async (page, pageSize, nickname = '') => {
      try {
          const url = `${PRD}all/users?page=${page}&pageSize=${pageSize}&nickname=${nickname}` ;
  
          const res = await fetch(url, {
              method: 'GET',
              credentials: 'include',
          });
  
          const data = await res.json();
  
          if (!res.ok) {
              throw new Error(data.message || 'Failed to fetch users');
          }
  
          return data;
      } catch (error) {
          throw new Error(error.message || 'Error fetching users');
      }
  };
  
  
    
    const updateUserAdmin = async (data) => {
      try {
          const res = await fetch(`${PRD}admin/update`, {
              method: 'PUT',
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
          console.error(error);
      };
    };

    const createTag = async (data) => {
      try {
          const res = await fetch(`${PRD}update/tag`, {
              method: 'PUT',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
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

    const getLogs = async (page = 1, limit = 12, search = '') => {
      // Abortar a solicitação anterior se houver uma
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Criar um novo AbortController para a nova solicitação
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setLoading(true);
      try {
        const res = await fetch(`${PRD}loggers?nickname=${tokenUser.nickname}&page=${page}&limit=${limit}&search=${search}`, {
          method: 'GET',
          credentials: 'include',
          signal, // Passar o signal para o fetch
        });

        if (!res.ok) {
          throw new Error('Erro na requisição');
        }

        const data = await res.json();
        setLoggers(data.logs); // Definindo os logs retornados
        setCurrentPage(data.currentPage); // Definindo a página atual retornada
        setTotalPages(data.totalPages); // Definindo o total de páginas retornadas
        setLoading(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setMessage(error.message || 'Erro desconhecido');
          setLoading(false);
        }
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
              goToPage,
              loading
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
