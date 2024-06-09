import { createContext, useEffect, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const PRD = 'http://localhost:3000/api/';
const AuthContext = createContext('');
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [authProfile, setAuthProfile] = useState(null);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [message, setMessage ] = useState('')
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('@Auth:Token')
    
    // useEffect(() => {
    //     const loadingStorageData = async () => {
    //         const storageToken = localStorage.getItem("@Auth:Token");
    //         const storageProfile = JSON.stringify(localStorage.getItem("@Auth:Profile"));
            
    //         if (!storageProfile || !storageToken ) {
    //             localStorage.removeItem('@Auth:Token');
    //             localStorage.removeItem('@Auth:Profile');
    //             localStorage.removeItem('@Auth:ProfileUser');
    //             setIsAuthentication(false)
    //             navigate('/login') 
    //         }          
    //         else {
    //             setIsAuthentication(true)
    //             setAuthToken(storageToken);
    //         }
    //     };
    //     loadingStorageData();
    // }, [navigate]);

    useEffect(() => {
        const loadingStorageData = async () => {
            const storageToken = localStorage.getItem('@Auth:Token');
            const storageProfile = localStorage.getItem('@Auth:Profile');
            
            if (!storageProfile || !storageToken) {
                localStorage.removeItem('@Auth:Token');
                localStorage.removeItem('@Auth:Profile');
                localStorage.removeItem('@Auth:ProfileUser');
                setIsAuthentication(false);
                navigate('/login');
            } else {
                setIsAuthentication(true);
                setAuthToken(storageToken);
            }
        };

        loadingStorageData();
    }, [navigate, setIsAuthentication, setAuthToken]);


    // useEffect(() => {
    //     const checkAuthentication = async () => {
    //         try {
    //             const storageToken = localStorage.getItem('@Auth:Token');
    //             setAuthToken(storageToken);
    //             const res = await fetch(`${PRD}profile`, {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: `Bearer ${storageToken}`,
    //                 },
    //             });
    
    //             if (res.ok) {
    //                 const resJSON = await res.json();

    //                 localStorage.setItem('@Auth:Profile', JSON.stringify(resJSON));
    //                 localStorage.setItem('@Auth:ProfileUser', JSON.stringify(resJSON));
    //                 setAuthProfile(resJSON);
    //                 setIsAuthentication(true);

    //             } else {
    //                 setIsAuthentication(false);
    //                 navigate('/login') ;
    //                 localStorage.clear();
    //             }
    //         } catch (error) {
    //             setIsAuthentication(false);
    //             console.log(error, 'Erro ao verificar autenticação');
    //             localStorage.clear();
    //             window.location.reload('/') ;
    //         }
    //     };
    
    //     checkAuthentication();
    // }, [navigate]);
    

    // useEffect(() => {
    //     const checkAuthentication = async () => {
    //         try {
    //             const storageToken = localStorage.getItem('@Auth:Token');
    //             setAuthToken(storageToken);

    //             const res = await fetch(`${PRD}profile`, {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: `Bearer ${storageToken}`,
    //                 },
    //             });

    //             if (res.ok) {
    //                 const resJSON = await res.json();

    //                 localStorage.setItem('@Auth:Profile', JSON.stringify(resJSON));
    //                 localStorage.setItem('@Auth:ProfileUser', JSON.stringify(resJSON));
    //                 setAuthProfile(resJSON);
    //                 setIsAuthentication(true);
    //             } else {
    //                 setIsAuthentication(false);
    //                 navigate('/login');
    //                 localStorage.clear();
    //             }
    //         } catch (error) {
    //             setIsAuthentication(false);
    //             console.error('Erro ao verificar autenticação:', error);
    //             localStorage.clear();
    //             window.location.assign('/'); // Correção para recarregar a página corretamente
    //         }
    //     };

    //     checkAuthentication();
    // }, [navigate, setAuthToken, setAuthProfile, setIsAuthentication]);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                if (!authToken) {
                    setIsAuthentication(false);
                    navigate('/login');
                    return;
                }

                const res = await fetch(`${PRD}profile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (res.ok) {
                    const resJSON = await res.json();
                    const tokenActive = resJSON.tokenActive; // Assumindo que o token ativo é retornado pela API

                    if (tokenActive === authToken && resJSON.status === "Ativo") {
                        localStorage.setItem('@Auth:Profile', JSON.stringify(resJSON));
                        localStorage.setItem('@Auth:ProfileUser', JSON.stringify(resJSON));
                        setAuthProfile(resJSON);
                        setIsAuthentication(true);
                    } else {
                        setIsAuthentication(false);
                        navigate('/login');
                        localStorage.clear();
                    }
                } else {
                    setIsAuthentication(false);
                    navigate('/login');
                    localStorage.clear();
                }
            } catch (error) {
                setIsAuthentication(false);
                console.error('Erro ao verificar autenticação:', error);
                localStorage.clear();
                window.location.assign('/'); // Correção para recarregar a página corretamente
            }
        };

        checkAuthentication();
    }, [authToken, navigate, setAuthProfile, setIsAuthentication]);
    
    const signIn = async (dataLogin)  => {
        setLoadingLogin(true);
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
                navigate('/home');
                setLoadingLogin(false);

            } else {
                localStorage.removeItem('@Auth:Token');
                localStorage.removeItem('@Auth:Profile');
                console.error('Erro de login:', resJSON.error); // Assumindo que o servidor envia uma mensagem de erro no corpo da resposta
                navigate('/') 
                setLoadingLogin(false);// Redirecionando o usuário de volta para a página inicial
            }
        } catch (error) {
            console.error('Erro no login:', error);
            setLoadingLogin(false);
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
            message,
            loading, setLoading,
            loadingLogin
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
