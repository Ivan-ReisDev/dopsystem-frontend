import React, { useContext, useEffect, useState } from 'react'
import { FaFloppyDisk } from "react-icons/fa6";
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';
import { SystemContext } from '../../context/SystemContext';
const FormClasses = () => {
    const [promoted, setPromoted] = useState('');
    const [reason, setReason] = useState('');
    const [operator, setOperator] = useState('');
    const [patent, setPatent] = useState('')
    const { infoSystem, getSystem } = useContext(SystemContext)
    const { createRequerimentContract } = useContext(RequirementsContext)
   


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
            reason,
        }
        createRequerimentContract(data);
        setPromoted('')
        setReason('')
    }
    return (
        <div className='DivForm'>
            <div>
                <h2>Postar aula</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    * Aluno:
                    <input type="text"
                        onChange={(e) => {
                            setPromoted(e.target.value)
                        }}
                        required
                        placeholder='Digite o nick do militar que teve aula.'
                    />
                </label>

                <label>
                    * Aula
                    <select onChange={(e) => setPatent(e.target.value)}>
                        {infoSystem && infoSystem.map((patents, patentsIndex) => (
                            patents.patents.map((patent, index) => (
                                <option key={`${patentsIndex}-${index}`} value={patent}>{patent}</option>
                            ))
                        ))}
                    </select>
                </label>
                <label>
                    * Observação:
                    <textarea placeholder='Digite as observações da aula' onChange={(e) => setReason(e.target.value)} required>

                    </textarea>
                </label>

                {!loadingDocs && <button className='BtnActive btn' onClick={handleSubmit}> <span className='SpanBtn'><FaFloppyDisk /></span>Publicar</button>}
                {loadingDocs && <button className='BtnActive BtnActiveDisable btn' disabled onClick={handleSubmit}> <span className='SpanBtn'><FaFloppyDisk /></span>Aguarde...</button>}
            </form>
        </div>

    );
}

export default FormClasses;