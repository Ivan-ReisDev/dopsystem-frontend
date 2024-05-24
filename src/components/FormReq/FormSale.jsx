
import { SystemContext } from '../../context/SystemContext';
import React, { useContext, useEffect, useState } from 'react'
import { FaFloppyDisk } from "react-icons/fa6";
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RhContext } from '../../context/RhContext';

const FormSale = ({ requerimentSelected }) => {

    const [loadingDocs, setLoadingDocs] = useState(false)
    const [promoted, setPromoted] = useState('');
    const [reason, setReason] = useState('');
    const [operator, setOperator] = useState('');
    const [patent, setPatent] = useState('');
    const [price, setPrice] = useState('')
    const { infoSystem, getSystem } = useContext(SystemContext)
    const patents = infoSystem.paidPositions
    const { user, searchAllUsers } = useContext(UserContext);
    const { createRequerimentSale } = useContext(RequirementsContext)
    const { resUser, newPatents } = user;
    const { rhStatus, message } = useContext(RhContext);

    useEffect(() => {
        setOperator(JSON.parse(localStorage.getItem("@Auth:Profile")));

        if (requerimentSelected) {
            setPromoted(requerimentSelected.promoted);
            setReason(requerimentSelected.reason);
        }
    }, [requerimentSelected]);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(operator.nickname)
        const data = {
            idUser: operator._id,
            promoted,
            patent,
            price,
            reason,
        }
        createRequerimentSale(data);
        setPromoted('')
        setReason('')
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
                <h2>Efetuar Venda de Cargo</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    * Vendedor:
                    <input type="text"
                        value={!requerimentSelected ? operator.nickname : requerimentSelected.operator}
                        disabled={requerimentSelected ? true : false}
                    />
                </label>

                <label>
                    * Comprador:
                    <input type="text"
                        value={promoted}
                        onChange={(e) => {
                            setPromoted(e.target.value)
                        }}
                        disabled={requerimentSelected ? true : false}
                        required
                        placeholder='Digite o nick do militar que está comprando cargo.'
                    />
                </label>

                <label>
                    * Cargo Comprado
                    <select onChange={(e) => setPatent(e.target.value)} disabled={requerimentSelected ? true : false}>
                        {requerimentSelected && <option value="">{requerimentSelected.newPatent}</option>}
                        {infoSystem && infoSystem.map((patents, patentsIndex) => (
                            patents.paidPositions.map((patent, index) => (
                                <option key={`${patentsIndex}-${index}`} value={patent}>{patent}</option>
                            ))
                        ))}
                    </select>
                </label>
                <label>
                    * Valor recebido:
                    <input type="number"
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                        required
                        placeholder='Digite o o valor em dinheiro ou em reais que o comprador pagou.'
                    />
                </label>
                <label>
                    * Observação:
                    <textarea 
                    value={reason}
                    placeholder='Digite observações sobre a compra.' onChange={(e) => setReason(e.target.value)} required>

                    </textarea>
                </label>

                {!requerimentSelected && !loadingDocs && <button className='BtnActive btn' onClick={handleSubmit}> <span className='SpanBtn'><FaFloppyDisk /></span>Publicar</button>}
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


                        <button className='flex m-2 items-center justify-center text-white bg-red-700 hover:bg-red-800 text-[14px] h-[30px] w-[120px] rounded-sm font-medium'>
                            <span className='mr-2'><MdDelete /></span>Excluir
                        </button>
                    </section>
                }
                {message && <p>{message.msg}</p>}


            </form>
        </div>

    );
}

export default FormSale