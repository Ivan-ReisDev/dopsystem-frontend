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
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const loadingStorageData = async () => {
    //         const storageToken = localStorage.getItem('@Auth:Token');
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

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const res = await fetch(`${PRD}profile`, {
                    method: 'GET',
                    credentials: 'include' // Inclui cookies na requisição
                });
    
                if (res.ok) {
                    const resJSON = await res.json();
                    localStorage.setItem('@Auth:Profile', JSON.stringify(resJSON));
                    setAuthProfile(resJSON);
                    setIsAuthentication(true);
                } else {
                    setIsAuthentication(false);
                    localStorage.clear();// Remove o perfil armazenado localmente
                    navigate('/login'); // Redireciona para a página de login
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                localStorage.clear();
                setIsAuthentication(false);
                navigate('/login'); // Em caso de erro, redireciona para a página de login
            }
        };
    
        checkAuthentication(); // Chama a função para verificar a autenticação ao montar o componente
    }, [navigate]);
    
    const signIn = async (dataLogin) => {
        setLoadingLogin(true);
        try {
            const res = await fetch(`${PRD}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataLogin),
                credentials: 'include', // Garante que o cookie será enviado automaticamente
            });
    
            const resJSON = await res.json();
    
            if (res.ok) {
                setAuthProfile(resJSON);
                localStorage.setItem('@Auth:ProfileUser', JSON.stringify(resJSON));
                localStorage.setItem('@Auth:Profile', JSON.stringify(resJSON));
                navigate('/home');
                setIsAuthentication(true);
            } else {
                console.error('Erro de login:', resJSON.error);
                localStorage.clear();
                setIsAuthentication(false);
                setMessage(resJSON.error); // Defina a mensagem de erro se necessário
            }
        } catch (error) {
            console.error('Erro no login:', error);
            setIsAuthentication(false);
            localStorage.clear();
            setMessage('Erro desconhecido ao tentar fazer login.'); // Mensagem genérica de erro
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

    const logout = async (nickname) => {
        try {
            const res = await fetch(`${PRD}logout?nickname=${nickname}`, {
                method: 'GET',
                credentials: 'include',
            });
            const resJSON = await res.json();
            if (res.ok) {
                localStorage.clear();
                setIsAuthentication(false);
                navigate('/login');
            }
        } catch (error) {
            setIsAuthentication(false);
            console.log(error, 'Erro ao verificar autenticação');
            localStorage.clear();
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

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
