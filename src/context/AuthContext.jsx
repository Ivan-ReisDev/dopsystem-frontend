import { createContext, useEffect, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const PRD = 'https://dopsystem-backend.vercel.app/api/';
const AuthContext = createContext('');
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [userAllArray, setUserAllArray] = useState()
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [authProfile, setAuthProfile] = useState(null);
    const [message, setMessage ] = useState('')
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('@Auth:Token')
    
    useEffect(() => {
        const loadingStorageData = async () => {
            const storageToken = localStorage.getItem("@Auth:Token");
            const storageProfile = JSON.stringify(localStorage.getItem("@Auth:Profile"));
            
            if (!storageProfile || !storageToken ) {
                localStorage.removeItem('@Auth:Token');
                localStorage.removeItem('@Auth:Profile');
                localStorage.removeItem('@Auth:ProfileUser');
                setIsAuthentication(false)
                navigate('/login') 
            }          
            else {
                setIsAuthentication(true)
                setAuthToken(storageToken);
            }
        };
        loadingStorageData();
    }, [navigate]);


    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const storageToken = localStorage.getItem('@Auth:Token');
                setAuthToken(storageToken);
                const res = await fetch(`${PRD}profile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${storageToken}`,
                    },
                });
    
                if (res.ok) {
                    const resJSON = await res.json();

                    localStorage.setItem('@Auth:Profile', JSON.stringify(resJSON));
                    localStorage.setItem('@Auth:ProfileUser', JSON.stringify(resJSON));
                    setAuthProfile(resJSON);
                    setIsAuthentication(true);

                } else {
                    setIsAuthentication(false);
                    navigate('/login') ;
                    localStorage.clear();
                }
            } catch (error) {
                setIsAuthentication(false);
                console.log(error, 'Erro ao verificar autenticação');
                localStorage.clear();
                window.location.reload('/') ;
            }
        };
    
        checkAuthentication();
    }, [navigate]);
    

    const getProfileAll = useCallback(async () => {
        setAuthProfile(true)
        try {
            const res = await fetch(`${PRD}profile/pages`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("@Auth:Token")}`,
                },
            });
                const data = await res.json();
                setUserAllArray(data);
                setAuthProfile(false)

        } catch (error) {
            console.log(error.message || 'Erro desconhecido');
            setAuthProfile(false)
        }
    }, []);


    const signIn = async (dataLogin)  => {
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
                setAuthToken(resJSON.token);
                setAuthProfile(resJSON);
                localStorage.setItem('@Auth:Token', resJSON.token);
                localStorage.setItem('@Auth:Profile', JSON.stringify(resJSON));
                localStorage.setItem('@Auth:ProfileUser', JSON.stringify(resJSON));

                getProfileAll(resJSON.token)
                navigate('/home');

            } else {
                localStorage.removeItem('@Auth:Token');
                localStorage.removeItem('@Auth:Profile');
                console.error('Erro de login:', resJSON.error); // Assumindo que o servidor envia uma mensagem de erro no corpo da resposta
                navigate('/') // Redirecionando o usuário de volta para a página inicial
            }
        } catch (error) {
            console.error('Erro no login:', error);
            // Poderia mostrar uma mensagem de erro amigável para o usuário aqui
        }
    };
    
        const handleActiveCout = async (data, dataActive) => {
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

            const DataMSG = await res.json();
            if (res.ok) {
                setMessage(DataMSG);
            } else {
                setMessage(DataMSG);
            }

        } catch (error) {
            console.error(error);
        };
    };

    const logout = async () => {
        try {
            const storageToken = localStorage.getItem('@Auth:Token');
            setAuthToken(storageToken);
            const res = await fetch(`${PRD}logout`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${storageToken}`,
                },
            });

            const resJSON = await res.json();
            if (res.ok) {
                localStorage.removeItem('@Auth:Token');
                localStorage.removeItem('@Auth:Profile');
                localStorage.clear()
                setIsAuthentication(false)
                console.error('Erro de login:', resJSON.error);
                navigate('/');

            }
        } catch (error) {
            setIsAuthentication(false);
            console.log(error, 'Erro ao verificar autenticação');
            localStorage.clear();
            navigate('/');
        }
    };







return (
    <AuthContext.Provider
        value={{
            signIn,
            isAuthentication,
            logout,
            authProfile,
            handleActiveCout,
            getProfileAll,
            message,
            userAllArray,
            loading, setLoading
        }}
    >
        {children}
    </AuthContext.Provider>
);
};

// Propriedades esperadas pelo componente AuthContext
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { AuthProvider, AuthContext };
