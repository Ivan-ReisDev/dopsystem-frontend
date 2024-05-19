import React, { useContext, useEffect, useState } from 'react'
import { FaFloppyDisk } from "react-icons/fa6";
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';
import { SystemContext } from '../../context/SystemContent';
const FormSale = () => {

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
    useEffect(() => {
        setOperator(JSON.parse(localStorage.getItem("@Auth:Profile")))
        infoSystem
        getSystem()
    }, [])

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
    return (
        <div className='DivForm'>
            <div>
                <h2>Efetuar Venda de Cargo</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    * Vendedor:
                    <input type="text" value={operator.nickname} disabled />
                </label>

                <label>
                    * Comprador:
                    <input type="text"
                        onChange={(e) => {
                            setPromoted(e.target.value)
                        }}
                        required
                        placeholder='Digite o nick do militar que está comprando cargo.'
                    />
                </label>

                <label>
                    * Cargo Comprado
                    <select onChange={(e) => setPatent(e.target.value)}>
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
                    <textarea placeholder='Digite observações sobre a compra.' onChange={(e) => setReason(e.target.value)} required>

                    </textarea>
                </label>

                {!loadingDocs && <button className='BtnActive btn' onClick={handleSubmit}> <span className='SpanBtn'><FaFloppyDisk /></span>Publicar</button>}
                {loadingDocs && <button className='BtnActive BtnActiveDisable btn' disabled onClick={handleSubmit}> <span className='SpanBtn'><FaFloppyDisk /></span>Aguarde...</button>}
            </form>
        </div>

    );
}

export default FormSale