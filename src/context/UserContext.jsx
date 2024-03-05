import { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// const API = 'http://localhost:3000/api/';
const PRD = 'https://backend-a5fznvv1t-ivan-reisdev.vercel.app/api/'

const UserContext = createContext('');

const AuthContext = ({ children }) => {

    const [selectedUser, setSelecteUser] = useState(null);
    const [isModalOpenUser, setIsModalOpenUser] = useState(false)
    const [isModalOpenUserDelete, setIsModalOpenUserDelete] = useState(false)

    const navigate = useNavigate();

    const [statePage, setStatePage] = useState(1);

    // Obtém dados do usuário do armazenamento local
    const dataUser = localStorage.getItem('dataUser');

    // Estado para dados de login
    const [dataLogin, setDataLogin] = useState({
        nick: '',
        password: '',
    });

    const [dataActive, setDataActive] = useState('')

    // Estado para mensagens de resposta
    const [message, setMessage]  = useState('');
    const [tokenUser, setTokenUser] = useState('');

    const [profile, setProfile] = useState(dataUser || null);

    const [getUserAll, setGetUserAll] = useState([]);

    // const [selectUser, setSelectUser] = useState(null);
    // const [isModalOpenDeleteUser, setIsModalOpenDeleteUser] = useState(false)

    // Função para lidar com o envio do formulário de login





    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${PRD}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataLogin),
            });

            const resJSON = await res.json();
            setMessage(resJSON);

            if (res.ok) {
                localStorage.setItem('token', resJSON.token);
                localStorage.setItem('dataUser', resJSON);
                navigate('/home');
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('dataUser');
                navigate('/');
            }
        } catch (error) {
            console.error('Erro no login', error);
        }
    };

    const handleActiveCout = async (data) => {
        try { 
            const res = await fetch(`${PRD}users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formdata: data,
                    securityCode: dataActive,
                }),
            });

            console.log(res)

            const DataMSG = await res.json();
            if (res.ok) {
                setMessage(DataMSG.msg);
            } else {
                setMessage(DataMSG.msg);
            }
            console.log(message)
        } catch (error) {
            console.error(error);
        };
    };


    // Efeito para obter o perfil do usuário
    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await fetch(`${PRD}profile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${tokenUser}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Erro na requisição');
                }
                const data = await res.json();

                localStorage.setItem('dataUser', JSON.stringify(data));
                setProfile(data);
            } catch (error) {
                setMessage(error.message || 'Erro desconhecido');
            }
        };

        if (tokenUser) {
            getProfile();
        }
    }, [tokenUser, setProfile, setMessage]);

    // Efeito para verificar se há um token de autenticação no armazenamento local
    useEffect(() => {
        const tokenAuth = localStorage.getItem('token');
        if (tokenAuth) {
            setTokenUser(tokenAuth);
        } else {
            navigate('/');
        }
    }, [setTokenUser, navigate]);

    // Função para realizar logout
    const exit = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('dataUser');
        navigate('/');
        window.location.reload();
    };

    // Função para formatar data do MongoDB
    function formatarData(dataDoMongoDB) {
        const dataObjeto = new Date(dataDoMongoDB);
        const dia = dataObjeto.getDate().toString().padStart(2, '0');
        const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObjeto.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const getUsers = async () => {
        try {
            const res = await fetch(`${PRD}all/users`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenUser}`,
                },
            });
            const data = await res.json();
            setGetUserAll(data); // Atualize o estado local com os novos dados
            return data;
        } catch (error) {
            setMessage(error);
        }
    };

    const fetchDataAndSetData = useCallback(async () => {
        try {
            const result = await getUsers();

            if (result) {
                localStorage.setItem('users', JSON.stringify(result));
            }

        } catch (error) {
            setMessage("Ocorreu um erro, tente novamente mais tarde");
        }
    }, []);


    useEffect(() => {
        // Check if cached data exists
        const cachedData = localStorage.getItem(('users'));
        if (cachedData) {
            setGetUserAll(JSON.parse(cachedData));
        }

        // Fetch new data
        fetchDataAndSetData();

        const refreshInterval = setInterval(fetchDataAndSetData, 1 * 60 * 1000);

        return () => {
            clearInterval(refreshInterval);
        };
    }, [fetchDataAndSetData]);

    // const onClose = () => {
    //     setSelectUser(null);
    //     setIsModalOpenDeleteUser(false);
    // }

    const handleDeleteUser = async (id) => {
        try {
            const res = await fetch(`${PRD}user/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const DataMSG = await res.json();

            if (res.ok) {
                fetchDataAndSetData();
                setMessage(DataMSG.msg);
                // onClose()
            } else {
                setMessage(`Erro ao excluir usuário: ${DataMSG.msg}`);
            }
        } catch (error) {
            console.error('Erro ao deletar usuário', error);
        }
    };

    const handleSubmitUser = async (data) => {
        try {
            const res = await fetch(`${PRD}register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formdata: data,

                })
            });
    
            console.log(res);
    
            if (res.ok) {
                const DataMSG = await res.json();
                console.log(DataMSG);
                setMessage(DataMSG.msg);
            } else {
                const errorData = await res.json().catch(() => null); // Tentar analisar o corpo da resposta como JSON
                const errorMessage = errorData ? errorData.msg : 'Erro desconhecido';
                setMessage(`Erro ao cadastrar categoria: ${errorMessage}`);
            }
    
        } catch (error) {
            console.error('Erro ao criar produto', error);
        }
    };

//delete 
    
    // Fornecimento do contexto para os componentes filhos
    return (
        <UserContext.Provider
            value={{
                dataLogin,
                setDataLogin,
                handleSubmitLogin,
                setMessage,
                tokenUser,
                exit,
                message,
                formatarData,
                profile,
                getUsers,
                getUserAll,
                handleDeleteUser,
                statePage, 
                setStatePage,
                isModalOpenUser, 
                setIsModalOpenUser,
                selectedUser, 
                setSelecteUser,
                handleSubmitUser,
                isModalOpenUserDelete, 
                setIsModalOpenUserDelete,
                dataActive, 
                setDataActive,
                
                handleActiveCout,
                
                // onClose,
                // setSelectUser,
                // selectUser,
                // isModalOpenDeleteUser,
                // setIsModalOpenDeleteUser,


            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Propriedades esperadas pelo componente AuthContext
AuthContext.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { AuthContext, UserContext };