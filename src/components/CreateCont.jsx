import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert';
import { FaUser, FaLock } from "react-icons/fa";
import { UserContext } from '../context/UserContext';


const CreateCont = ({
    createCont,
    handleCreateCont,
    setCreateCont,
    stateColorInput,
    setStateColorInput,
    stateColorSecondFocus,
    setStateColorSecondFocus,
    handleFirstDivFocus,
    handleFirstDivBlur,
    handleSecondDivFocus,
    handleSecondDivBlur,
    code }) => {




    const { handleActiveCout, dataActive, setDataActive, message } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [handleTriDivBlur, seThandleTriDivBlur] = useState(false);

    const onSubmit = (data) => {
        handleActiveCout(data);
        setValue("newUserDopSystem", "")
        setValue("newPasswordDopSystem", "")
        setValue("newPasswordDopSystemConf", "")

        useEffect(() => {
            // Definir um temporizador para mudar a mensagem após 3 segundos
            setTimeout(() => {
                setMessage('');
            }, 5000);

        }, [message]);

    };

    const handleTresDivBlur = () => {
        seThandleTriDivBlur(true)
    }

    const handleTresDivFocus = () => {
        seThandleTriDivBlur(false)

    }

    const watchPassword = watch("newPasswordDopSystem")
    return (
        <div className='mt-2 mb-2 w-full'>
            <form className='flex flex-col items-center w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className={`border-b ${stateColorInput ? 'flex flex-row items-center w-full border-b-2 border-blue-500' : 'flex flex-row items-center w-full border-b-2'}`}
                    tabIndex={0}>
                    <i className='text-xl mr-2'><FaUser className='text-[#9CA3AF]' /></i>
                    <input
                        autoComplete="newUserDopSystem"
                        onFocus={handleFirstDivFocus}
                        onBlur={handleFirstDivBlur}
                        className='placeholder:font-bold w-full h-8 outline-none focus:ring-0 border-gray-300 focus:border-transparent'
                        type="text"
                        name="newUserDopSystem"
                        id="newUserDopSystem"
                        placeholder='Usuário'
                        {...register("newUserDopSystem", { required: true })}
                    />
                </div>
                {errors?.newUserDopSystem && <p className="text-xs p-0 m-0 text-red-500 ">Adicione o nome de usuário.</p>}
                <div className={`border-b my-2 ${stateColorSecondFocus ? 'flex flex-row items-center w-full border-b-2 border-blue-500' : 'flex flex-row items-center w-full border-b-2'}`}
                    tabIndex={0}>
                    <i className='text-xl mr-2'><FaLock className='text-[#9CA3AF]' /></i>
                    <input
                        autoComplete="newPasswordDopSystem"
                        onFocus={handleSecondDivFocus}
                        onBlur={handleSecondDivBlur}
                        className='placeholder:font-bold w-full h-8 outline-none focus:ring-0 bg-transparent border-gray-300 focus:border-transparent'
                        type="password"
                        name="newPasswordDopSystem"
                        id="newPasswordDopSystem"
                        placeholder='Senha'
                        {...register("newPasswordDopSystem", {
                            minLength: 8,
                            required: true
                        })}
                    />
                </div>
                {errors?.newPasswordDopSystem && <p className=" text-xs p-0 m-0 text-red-500 ">A senha deve ter no minimo 8 caracteres.</p>}

                <div className={`border-b my-2 ${handleTriDivBlur ? 'flex flex-row items-center w-full border-b-2 border-blue-500' : 'flex flex-row items-center w-full border-b-2'}`}
                    tabIndex={0}>
                    <i className='text-xl mr-2'><FaLock className='text-[#9CA3AF]' /></i>
                    <input
                        autoComplete="newPasswordDopSystemConf"
                        onFocus={handleTresDivBlur}
                        onBlur={handleTresDivFocus}
                        className='placeholder:font-bold w-full h-8 outline-none focus:ring-0 bg-transparent border-gray-300 focus:border-transparent'
                        type="password"
                        name="newPasswordDopSystemConf"
                        id="newPasswordDopSystemConf"
                        placeholder='Confime a senha'
                        {...register("newPasswordDopSystemConf", {
                            required: true,
                            minLength: 8,
                            validate: (value) => value === watchPassword
                        })}
                    />
                </div>
                {errors?.newPasswordDopSystemConf && <p className=" text-xs p-0 m-0  text-red-500 ">As senhas digitadas não coincidem.</p>}

                <div className='flex flex-col items-center w-full mt-2'>
                    <p className='text-center'>Coloque na sua missão o código:<br /> {code} </p>
                </div>

                {message && <Alert variant='warning' className='h-[15px] flex items-center mt-2'>
                    <p className='text-[13px] text-center'>{message ? message : ''}</p>
                </Alert>}

                <div className='h-[50px] mt-3 flex flex-row justify-between w-full'>
                    <Button onClick={handleCreateCont} className='w-[49%] text-[#0D1450]  hover:bg-[#0D1450]' variant="outline-primary">Voltar</Button>
                    <Button type='submit' className='w-[49%] bg-[#0D1450] hover:bg-[#29327a]' variant="primary">Ativar</Button>
                </div>
            </form>
        </div>
    )
}

export default CreateCont