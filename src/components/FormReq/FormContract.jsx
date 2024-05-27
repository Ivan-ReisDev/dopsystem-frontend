import React, { useContext, useEffect, useState } from 'react'
import { FaFloppyDisk } from "react-icons/fa6";
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RhContext } from '../../context/RhContext';
import { SystemContext } from '../../context/SystemContext';
const FormContract = ({ requerimentSelected }) => {

    const [loadingDocs, setLoadingDocs] = useState(false)
    const [promoted, setPromoted] = useState('');
    const [reason, setReason] = useState('');
    const [operator, setOperator] = useState('');
    const [patent, setPatent] = useState('')
    const { infoSystem, getSystem } = useContext(SystemContext)
    const patents = infoSystem.patents
    const { user, searchAllUsers } = useContext(UserContext);
    const { rhStatus, messege, deleteRequeriment } = useContext(RhContext);
    const { createRequerimentContract } = useContext(RequirementsContext)
    const { resUser, newPatents } = user;

    useEffect(() => {
        setOperator(JSON.parse(localStorage.getItem("@Auth:Profile")));

        if (requerimentSelected) {
            setPromoted(requerimentSelected.promoted);
            setReason(requerimentSelected.reason);
        }
    }, [requerimentSelected]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            idUser: operator._id,
            promoted,
            patent,
            reason,
        }
        createRequerimentContract(data);
        setPromoted('')
        setReason('')
    }

    const deleteRequirements = (e) => {
        e.preventDefault()
        const data = {
            idUser: operator._id,
            idRequirements: requerimentSelected._id,
            type: "promotion"
        }
        deleteRequeriment(data)
    }

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
                <h2>Efetuar Contratação</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    * Contratante:
                    <input
                        type="text"
                        value={!requerimentSelected ? operator.nickname : requerimentSelected.operator}
                        disabled={requerimentSelected ? true : false}
                    />
                </label>

                <label>
                    * Contratado:
                    <input type="text"
                        value={promoted}
                        onChange={(e) => {
                            setPromoted(e.target.value)
                        }}
                        required
                        disabled={requerimentSelected ? true : false}
                        placeholder='Digite o nick do militar que será promovido'
                    />
                </label>

                <label>
                    * Patente
                    <select onChange={(e) => setPatent(e.target.value)} disabled={requerimentSelected ? true : false}>
                        {requerimentSelected && <option value={requerimentSelected.newPatent}>{requerimentSelected.newPatent}</option>}
                        {infoSystem && infoSystem.map((patents, patentsIndex) => (
                            patents.patents.map((patent, index) => (
                                <option key={`${patentsIndex}-${index}`} value={patent}>{patent}</option>
                            ))
                        ))}
                    </select>
                </label>
                <label>
                    * Motivo:
                    <textarea
                    value={reason}
                    placeholder='Digite o motivo da promoção' onChange={(e) => setReason(e.target.value)} required>

                    </textarea>
                </label>

                {messege && <p className='text-green-700 text-[13px]'>{messege.msg}</p>}
                {messege && <p className='text-red-700-700 text-[13px]'>{messege.error}</p>}

                {!requerimentSelected && !loadingDocs && (
                    <button className='BtnActive btn' type="submit">
                        <span className='SpanBtn'><FaFloppyDisk /></span>Publicar
                    </button>
                )}
                {loadingDocs && <button className='BtnActive BtnActiveDisable btn' disabled onClick={handleSubmit}> <span className='SpanBtn'><FaFloppyDisk /></span>Aguarde...</button>}
                {requerimentSelected && requerimentSelected.status === "Pendente" &&
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
}

export default FormContract