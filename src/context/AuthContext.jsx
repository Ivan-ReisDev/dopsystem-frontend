import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const PRD = 'https://dopsystem-backend.vercel.app/api/';
const AuthContext = createContext('');
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [authProfile, setAuthProfile] = useState(null);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [message, setMessage ] = useState('')
    const [loading, setLoading] = useState(false)


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

    // useEffect(() => {
    //     const loadingStorageData = async () => {
 
    //         const storageProfile = localStorage.getItem('@Auth:Profile');
            
    //         if (!storageProfile || !storageToken) {
    //             localStorage.removeItem('@Auth:Token');
    //             localStorage.removeItem('@Auth:Profile');
    //             localStorage.removeItem('@Auth:ProfileUser');
    //             setIsAuthentication(false);
    //             navigate('/login');
    //         } else {
    //             setIsAuthentication(true);
    //             setAuthToken(storageToken);
    //         }
    //     };

    //     loadingStorageData();
    // }, [navigate, setIsAuthentication, setAuthToken]);


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
        const loadingStorageData = async () => {
            const storageProfile = localStorage.getItem('@Auth:Profile');
            if (!storageProfile) {
                localStorage.removeItem('@Auth:Profile');
                localStorage.removeItem('@Auth:ProfileUser');
                setIsAuthentication(false);
                navigate('/login');
            } else {
                setIsAuthentication(true);
            }
        };

        loadingStorageData();
    }, [navigate, setIsAuthentication]);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const res = await fetch(`${PRD}/profile`, {
                    method: 'GET',
                    credentials: 'include', // Inclui cookies (incluindo HTTPOnly)
                });
    
                if (res.ok) {
                    const resJSON = await res.json();
                    localStorage.setItem('@Auth:Profile', JSON.stringify(resJSON));
                    localStorage.setItem('@Auth:ProfileUser', JSON.stringify(resJSON));
                    setAuthProfile(resJSON);
                    setIsAuthentication(true);
                } else {
                    localStorage.clear();
                    setIsAuthentication(false);
                    navigate('/login');
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                localStorage.clear();
                setIsAuthentication(false);
                navigate('/'); // Correção para recarregar a página corretamente
            }
        };
    
        checkAuthentication();
    }, [setAuthProfile, setIsAuthentication, navigate]);
    
    
    
    const signIn = async (dataLogin) => {
        setLoadingLogin(true);
        try {
            const res = await fetch(`${PRD}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataLogin),
                credentials: 'include', // Inclui cookies
            });
    
            const resJSON = await res.json();
            setMessage(resJSON);
    
            if (res.ok) {
                setAuthProfile(resJSON);
                setIsAuthentication(true);
                localStorage.setItem('@Auth:Profile', JSON.stringify(resJSON));
                localStorage.setItem('@Auth:ProfileUser', JSON.stringify(resJSON));
                navigate('/home');
            } else {
                console.error('Erro de login:', resJSON.error); // Assumindo que o servidor envia uma mensagem de erro no corpo da resposta
                navigate('/');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            // Poderia mostrar uma mensagem de erro amigável para o usuário aqui
        } finally {
            setLoadingLogin(false);
        }
    };
    
    
        const handleActiveCout = async (data, dataActive) => {
        try {
            const res = await fetch(`${PRD}users/update`, {
                method: 'PUT',
                credentials: 'include',
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
        }
    };

    const logout = async () => {
        try {
          const res = await fetch(`${PRD}logout`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies na solicitação
          });
      
          const resJSON = await res.json();
          if (res.ok) {
            // Remove informações de autenticação do localStorage
            localStorage.removeItem('@Auth:Profile');
            localStorage.clear();
            setIsAuthentication(false);
            // Redireciona o usuário para a página inicial
            navigate('/login');
          } else {
            // Lida com possíveis erros retornados pelo servidor
            console.error('Erro de logout:', resJSON.message);
          }
        } catch (error) {
          // Em caso de erro, assume que a autenticação falhou e limpa o localStorage
          setIsAuthentication(false);
          console.log('Erro ao verificar autenticação:', error);
          localStorage.clear();
          // Redireciona o usuário para a página inicial
          navigate('/login');
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
