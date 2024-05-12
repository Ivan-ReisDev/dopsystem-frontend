import { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PRD = 'https://dopsystem-backend.vercel.app/api/';

const AuthContext = createContext('');
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isAuthentication, setIsAuthentication] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [authProfile, setAuthProfile] = useState(null);
    const [message, setMessage ] = useState('')

    useEffect(() => {
        const loadingStorageData = async () => {
            const storageToken = localStorage.getItem("@Auth:Token");
            const storageProfile = localStorage.getItem("@Auth:Profile");
            
            if (!storageProfile || !storageToken) {
                localStorage.removeItem('@Auth:Token');
                localStorage.removeItem('@Auth:Profile');
                navigate('/login') 
            } else {
                setIsAuthentication(true)
                setAuthToken(storageToken);
            }
        };
        loadingStorageData();
    }, []);


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
                    console.log('CONSOLE AQUI  '  + resJSON);
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
    }, []);
    

   const getProfile = useCallback(async (tokenAuth) => {
        try {
            const res = await fetch(`${PRD}profile`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenAuth}`,
                },
            });

            if (!res.ok) {
                throw new Error('Erro na requisição');
            }

            const data = await res.json();
            localStorage.setItem("@Auth:ProfileUser", JSON.stringify(data));
        } catch (error) {
            setMessage(error.message || 'Erro desconhecido');
        }
    }, []); // Não há dependências externas, então [] vazio

    useEffect(() => {
        if (authToken) {
            getProfile(authToken);
        }
    }, [authToken, getProfile]);

    const signIn = useCallback(async (dataLogin) => {
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
                window.location.reload('/home')
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
    }, [navigate, setAuthToken, setAuthProfile, setMessage]);
    

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
                setIsAuthentication(false)
                console.error('Erro de login:', resJSON.error);

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
            message
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
