import React, { useContext, useEffect, useState } from 'react'
import { FaFloppyDisk } from "react-icons/fa6";
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RhContext } from '../../context/RhContext';


const FormReq = ({ requerimentSelected }) => {
    const [loadingDocs, setLoadingDocs] = useState(false);
    const [promoted, setPromoted] = useState('');
    const [reason, setReason] = useState('');
    const [operator, setOperator] = useState('');

    const { user, searchAllUsers } = useContext(UserContext);
    const { createRequeriment } = useContext(RequirementsContext);
    const { resUser, newPatents } = user;
    const { rhStatus, messege, deleteRequeriment } = useContext(RhContext);

    useEffect(() => {
        setOperator(JSON.parse(localStorage.getItem("@Auth:Profile")));

        if (requerimentSelected) {
            setPromoted(requerimentSelected.promoted);
            setReason(requerimentSelected.reason);
        }
    }, [requerimentSelected]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            idUser: operator._id,
            promoted,
            reason,
        };

        createRequeriment(data);
        setPromoted('');
        setReason('');
    };

    const deleteRequirements = (e) => {
        e.preventDefault()
        const data = {
            idUser: operator._id,
            idRequirements: requerimentSelected._id,
            type: "promotion"
        }
        deleteRequeriment(data)
    }

    //Aprova reprova ou exclui 
    const atualizaStatus = (e, status) => {
        e.preventDefault()
        const data = {
            idUser: operator._id,
            idRequirements: requerimentSelected._id,
            statusRequirements: status
        }
        rhStatus(data)
    }


    return (
        <div className='DivForm'>
            <div>
                <h2>Efetuar Promoção</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    * Promotor:
                    <input
                        type="text"
                        value={!requerimentSelected ? operator.nickname : requerimentSelected.operator}
                        disabled={requerimentSelected ? true : false}
                    />
                </label>

                <label>
                    * Promovido:
                    <input
                        type="text"
                        value={promoted}
                        onChange={(e) => {
                            setPromoted(e.target.value);
                            searchAllUsers(e.target.value, "Promoção");
                        }}
                        disabled={requerimentSelected ? true : false}
                        required
                        placeholder='Digite o nick do militar que será promovido'
                    />
                </label>

                <label>
                    * Nova Patente:
                    <input
                        type="text"
                        required
                        value={!requerimentSelected ? newPatents : requerimentSelected.newPatent}
                        disabled
                        placeholder='Digite o nick do militar que será promovido'
                    />
                </label>

                <label>
                    * Motivo:
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        placeholder='Digite o motivo da promoção'
                    />
                </label>
                {messege && <p className='text-green-700 text-[13px]'>{messege.msg}</p>}
                {messege && <p className='text-red-700-700 text-[13px]'>{messege.error}</p>}

                {!requerimentSelected && !loadingDocs && (
                    <button className='BtnActive btn' type="submit">
                        <span className='SpanBtn'><FaFloppyDisk /></span>Publicar
                    </button>
                )}
                {loadingDocs && (
                    <button className='BtnActive BtnActiveDisable btn' disabled>
                        <span className='SpanBtn'><FaFloppyDisk /></span>Aguarde...
                    </button>
                )}

                {requerimentSelected &&  requerimentSelected.status === "Pendente" &&
                    <section className='flex row items-center justify-center'>
                        <button
                            type="button"
                            onClick={(e) => atualizaStatus(e, "Aprovado")}
                            className='flex m-2 items-center justify-center text-white bg-green-700 hover:bg-green-800 text-[14px] h-[30px] w-[120px] rounded-sm font-medium transition duration-300'>
                            <span className='mr-2'><FaCheck /></span>Aprovar
                        </button>

                        <button
                            onClick={(e) => atualizaStatus(e, "Reprovado")}
                            type="button"
                            className='flex m-2 items-center justify-center text-white bg-orange-600 hover:bg-orange-700 text-[14px] h-[30px] w-[120px] rounded-sm font-medium transition duration-300'>
                            <span className='mr-2'><MdDelete /></span>Reprovado
                        </button>


                        <button 
                        type="button"
                        onClick={(e) => deleteRequirements(e)} className='flex m-2 items-center justify-center text-white bg-red-700 hover:bg-red-800 text-[14px] h-[30px] w-[120px] rounded-sm font-medium'>
                            <span className='mr-2'><MdDelete /></span>Excluir
                        </button>
                    </section>
                }

            </form>
        </div>
    );
};

export default FormReq;
