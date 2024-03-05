import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FaUser, FaLock } from "react-icons/fa";
import LogoDOP from '../assets/logodop.png'
import CreateCont from '../components/CreateCont.jsx';
import { UserContext } from '../context/UserContext.jsx';

const LoginSystem = () => {

    const { dataLogin, setDataLogin, handleSubmitLogin, dataActive, setDataActive, setMessage, message } = useContext(UserContext)
    const [stateColorInput, setStateColorInput] = useState(false);
    const [stateColorSecondFocus, setStateColorSecondFocus] = useState(false);
    const [createCont, setCreateCont] = useState(false);
    const [code, setCode]  = useState('')

    useEffect(()=> {
        const genereteCode = Math.ceil(Math.random() * 9999);
        const securityoode = `DOP-${genereteCode}`;
        setCode(securityoode) ;
        setDataActive(securityoode)
        return ;
    }, [])

    const handleCreateCont = (e) => {
        e.preventDefault()
        setMessage('')
        setCreateCont(!createCont)
    }

    const handleFirstDivFocus = (e) => {
        e.preventDefault()
        setStateColorInput(true);
    };

    const handleFirstDivBlur = (e) => {
        e.preventDefault()
        setStateColorInput(false);
    };

    const handleSecondDivFocus = (e) => {
        e.preventDefault()
        setStateColorSecondFocus(true);
    };

    const handleSecondDivBlur = (e) => {
        e.preventDefault()
        setStateColorSecondFocus(false);
    };


    return (
        <div className='text-[#ffffff] w-screen h-screen flex items-center justify-center bg-[#0D1450] flex-col'>
            <h1 className='text-3xl mb-4'><span className='text-[#3146ff] font-bold'>DOP</span>System</h1>
            <div className='bg-white rounded-md p-4 w-[480px] flex items-center justify-center flex-col text-[#636363]'>
                <div className='w-full flex flex-col items-center justify-center p-2 border-b'>
                    <img src={LogoDOP} alt="logo da DOP" className='w-20 mb-3' />
                    {createCont === false ? (
                        <h2 className='text-center font-bold text-lg mb-1'>Bem-vindo ao DOP System</h2>,
                        <p>Entre com seu usuário e senha</p>
                    ) : (<h2 className='text-center font-bold text-lg mb-1'>Ative sua conta do RCC System</h2>,
                        <p className='text-center pb-2'>Para ativar sua conta, é necessário que você seja um dos policiais ativos da Polícia DOP.<br />
                            Caso não seja, não conseguirá ativá-la.</p>)}
                </div>
                {createCont === false ? (
                    <div className='mt-2 mb-2 w-full'>
                        <form className='flex flex-col items-center w-full' onSubmit={handleSubmitLogin}>
                            <div className={`border-b ${stateColorInput ? 'flex flex-row items-center w-full border-b-2 border-blue-500' : 'flex flex-row items-center w-full border-b-2'}`}
                                tabIndex={0}>
                                <i className='text-xl mr-2'><FaUser className='text-[#9CA3AF]' /></i>
                                <input
                                    autoComplete="userDopSystem"
                                    onFocus={handleFirstDivFocus}
                                    onBlur={handleFirstDivBlur}
                                    onChange={(e) => setDataLogin({ ...dataLogin, nick: e.target.value })}
                                    className='placeholder:font-bold w-full h-8 outline-none focus:ring-0 border-gray-300 focus:border-transparent'
                                    type="text"
                                    name="userDopSystem"
                                    id="userDopSystem"
                                    placeholder='Usuário'
                                />
                            </div>
                            <div className={`border-b my-2 ${stateColorSecondFocus ? 'flex flex-row items-center w-full border-b-2 border-blue-500' : 'flex flex-row items-center w-full border-b-2'}`}
                                tabIndex={0}>
                                <i className='text-xl mr-2'><FaLock className='text-[#9CA3AF]' /></i>
                                <input
                                    autoComplete="passwordDopSystem"
                                    onFocus={handleSecondDivFocus}
                                    onBlur={handleSecondDivBlur}
                                    onChange={(e) => setDataLogin( { ...dataLogin, password: e.target.value })}
                                    className='placeholder:font-bold w-full h-8 outline-none focus:ring-0 bg-transparent border-gray-300 focus:border-transparent'
                                    type="password"
                                    name="passwordDopSystem"
                                    id="passwordDopSystem"
                                    placeholder='Senha'
                                />
                            </div>
                            <div className='mt-2'>
                                <a href="#" className='text-xs no-underline'>Redefinir minha senha</a>
                            </div>
                        <div className='flex items-center mt-2'>

                        </div>
                        {console.log(message)} 
                            { message.error && <Alert variant='danger' className='h-[15px] flex items-center'>
                                    <p className='text-[13px] text-center'>{message ? message.error : ''}</p>
                                </Alert> }   

                            <div className='h-[50px] mt-3 flex flex-row justify-between w-full'>
                                <Button onClick={handleCreateCont} className='w-[49%] text-[#0D1450]  hover:bg-[#0D1450]' variant="outline-primary">Ativar Conta</Button>
                                <Button type='submit' className='w-[49%] bg-[#0D1450] hover:bg-[#29327a]' variant="primary">Login</Button>
                            </div>
                        </form>
                    </div> ) :

                    (<CreateCont 
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
                        code={code} />)
                }
            </div>
        </div>

    )
}

export default LoginSystem