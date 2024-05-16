import React, { useContext, useEffect, useState } from 'react'
import { FaFloppyDisk } from "react-icons/fa6";
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';
const FormReqdemi = () => {

    const [loadingDocs, setLoadingDocs] = useState(false)
    const [promoted, setPromoted] = useState('');
    const [reason, setReason] = useState('');
    const [operator, setOperator ] = useState('');
    const { user, searchAllUsers} = useContext(UserContext);
    const { createRequerimentRelegation } = useContext(RequirementsContext)
    const { resUser, newPatents} = user;
    useEffect(() => {
        setOperator(JSON.parse(localStorage.getItem("@Auth:Profile")))

    },[]) 
        
    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            idUser: operator._id,
            promoted,
            reason,
        }

        console.log(data)
        createRequerimentRelegation(data);
        setPromoted('')
        setReason('')
    }
    return (
        <div className='DivForm'>
            <div>
                <h2>Efetuar Rebaixamento</h2>
            </div>
        
            <form onSubmit={handleSubmit}>
                <label>
                    * Aplicador:
                    <input type="text" value={operator.nickname} disabled />
                </label>

                <label>
                    * Rebaixado:
                    <input type="text"
                        onChange={(e) => {
                            setPromoted(e.target.value)
                            searchAllUsers(e.target.value, "Rebaixamento")}}
                        required
                        placeholder='Digite o nick do militar que será rebaixado'
                    />
                </label>

                <label>
                    * Nova Patente:
                    <input type="text"
                        required
                        value={newPatents}
                        disabled
                        placeholder='Digite a nova patente'
                    />
                </label>

                <label>
                    * Motivo:
                    <textarea placeholder='Digite o motivo do rebaixamento' onChange={(e) => setReason(e.target.value)} required>

                    </textarea>
                </label>

                {!loadingDocs && <button className='BtnActive btn' onClick={handleSubmit}> <span className='SpanBtn'><FaFloppyDisk /></span>Publicar</button>}
                {loadingDocs && <button className='BtnActive BtnActiveDisable btn' disabled onClick={handleSubmit}> <span className='SpanBtn'><FaFloppyDisk /></span>Aguarde...</button>}
            </form>
        </div>

    );
}

export default FormReqdemi