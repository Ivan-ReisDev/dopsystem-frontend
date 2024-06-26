import React, { useCallback, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FaUser, FaLock } from "react-icons/fa";
import LogoDOP from '../assets/logodop.png';
import CreateCont from '../components/CreateCont.jsx';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import style from "./imgLogin.module.css"

const LoginSystem = ({ setLoading }) => {
    const { signIn, message, loadingLogin, setLoadingLogin } = useContext(AuthContext);
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [stateColorInput, setStateColorInput] = useState(false);
    const [stateColorSecondFocus, setStateColorSecondFocus] = useState(false);
    const [createCont, setCreateCont] = useState(false);
    const [code, setCode]  = useState('');

    useEffect(()=> {
        const genereteCode = Math.ceil(Math.random() * 9999);
        const securityCode = `DOP-${genereteCode}`;
        setCode(securityCode);
    }, []);

    const handleSubmitLogin = async (e) => {

        e.preventDefault();
        
        const dataLogin = {
            nick,
            password,
        };

       await signIn(dataLogin);

    };

    const handleCreateCont = (e) => {
        e.preventDefault();
        setCreateCont(!createCont);
    };

    const handleFirstDivFocus = () => {
        setStateColorInput(true);
    };

    const handleFirstDivBlur = () => {
        setStateColorInput(false);
    };

    const handleSecondDivFocus = () => {
        setStateColorSecondFocus(true);
    };

    const handleSecondDivBlur = () => {
        setStateColorSecondFocus(false);
    };

    return (
        <div className={`${style.ImgLogin} text-[#ffffff] min-h-screen flex flex-col items-center justify-center`}>
            <h1 className='text-3xl mb-4'><span className='text-[#3146ff] font-bold'>DOP</span>System</h1>
            <div className='bg-white rounded-md p-4 max-w-md w-full flex flex-col items-center text-[#636363]'>
                <div className='w-full flex flex-col items-center p-2 border-b'>
                    <img src={LogoDOP} alt="logo da DOP" className='w-20 mb-3' />
                    {createCont === false ? (
                        <>
                            <h2 className='text-center font-bold text-lg mb-1'>Bem-vindo ao DOP System</h2>
                            <p>Entre com seu usuário e senha</p>
                        </>
                    ) : (
                        <>
                            <h2 className='text-center font-bold text-lg mb-1'>Ative sua conta do DOP System</h2>
                            <p className='text-center pb-2'>Para ativar sua conta, é necessário que você seja um dos policiais ativos da Polícia DOP.<br />
                                Caso não seja, não conseguirá ativá-la.</p>
                        </>
                    )}
                </div>
                {createCont === false ? (
                    <div className='mt-2 mb-2 w-full'>
                        <form className='flex flex-col items-center w-full' onSubmit={handleSubmitLogin}>
                            <div className={`border-b ${stateColorInput ? 'flex flex-row items-center w-full border-b-2 border-blue-500' : 'flex flex-row items-center w-full border-b-2'}`}
                                onFocus={handleFirstDivFocus}
                                onBlur={handleFirstDivBlur}>
                                <i className='text-xl mr-2'><FaUser className='text-[#9CA3AF]' /></i>
                                <input
                                    tabIndex={1}
                                    autoComplete="userDopSystem"
                                    onChange={(e) => setNick(e.target.value )}
                                    value={nick || ""}
                                    className='placeholder:font-bold w-full h-8 outline-none focus:ring-0 border-gray-300 focus:border-transparent'
                                    type="text"
                                    name="userDopSystem"
                                    id="userDopSystem"
                                    placeholder='Usuário'
                                />
                            </div>
                            <div className={`border-b my-2 ${stateColorSecondFocus ? 'flex flex-row items-center w-full border-b-2 border-blue-500' : 'flex flex-row items-center w-full border-b-2'}`}
                                onFocus={handleSecondDivFocus}
                                onBlur={handleSecondDivBlur}>
                                <i className='text-xl mr-2'><FaLock className='text-[#9CA3AF]' /></i>
                                <input
                                tabIndex={2}
                                    autoComplete="passwordDopSystem"
                                    onChange={(e) => setPassword(e.target.value )}
                                    value={password || ""}
                                    className='placeholder:font-bold w-full h-8 outline-none focus:ring-0 bg-transparent border-gray-300 focus:border-transparent'
                                    type="password"
                                    name="passwordDopSystem"
                                    id="passwordDopSystem"
                                    placeholder='Senha'
                                />
                            </div>
                            <div className='mt-2'>
                                <button type='button' onClick={handleCreateCont} className='text-xs no-underline'>Redefinir minha senha </button>
                            </div>
                            {message &&  <p className='error'> {message.error} </p> }
                            <div className='h-[50px] mt-3 flex flex-row justify-between w-full'>
                                <Button onClick={handleCreateCont} className='w-[49%] text-[#0D1450]  hover:bg-[#0D1450]' variant="outline-primary">Ativar Conta</Button>
                                { !loadingLogin && <Button tabIndex={3} type='submit' className='w-[49%] bg-[#0D1450] hover:bg-[#29327a]' variant="primary">Login</Button>}
                                { loadingLogin && <Button tabIndex={3} disabled type='submit' className='w-[49%] bg-[#303566] hover:bg-[#29327a]' variant="primary">Aguarde...</Button>}
                            </div>
                        </form>
                    </div>
                ) : (
                    <CreateCont 
                        createCont={createCont}
                        handleCreateCont={handleCreateCont} 
                        setCreateCont={setCreateCont}
                        stateColorInput={stateColorInput} 
                        setStateColorInput={setStateColorInput}
                        stateColorSecondFocus={stateColorSecondFocus} 
                        setStateColorSecondFocus={setStateColorSecondFocus}
                        handleFirstDivFocus={handleFirstDivFocus}
                        handleFirstDivBlur={handleFirstDivBlur}
                        handleSecondDivFocus={handleSecondDivFocus}
                        handleSecondDivBlur={handleSecondDivBlur}
                        code={code} />
                )}
            </div>
        </div>
    );
}

export default LoginSystem;
