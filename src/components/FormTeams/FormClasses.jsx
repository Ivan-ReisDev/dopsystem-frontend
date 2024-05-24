import React, { useContext, useEffect, useState } from 'react'
import { FaFloppyDisk } from "react-icons/fa6";
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';
import { SystemContext } from '../../context/SystemContext';
import { ClassesContext } from '../../context/ClassesContext';
import { useNavigate } from 'react-router-dom';
const FormClasses = ({team}) => {
    const [student, setStudent] = useState('');
    const [reason, setReason] = useState('');
    const [operator, setOperator] = useState('');
    const [classeRecebida, setClasseRecebida] = useState('')
    const { infoSystem, getSystem } = useContext(SystemContext);
    const  navigate = useNavigate()

    const { Classes, createClasseRequeriment, loading, message } = useContext(ClassesContext)
    const newArrayClesses = Classes.filter(classes => classes.team === team.nameTeams);
   
    useEffect(() => {
        setOperator(JSON.parse(localStorage.getItem("@Auth:Profile")))
        infoSystem
        getSystem()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            idUser: operator._id,
            promoted: student,
            reason: reason,
            classe:classeRecebida,
            team: team.nameTeams
            }

            createClasseRequeriment(data);
            setStudent("");
            setReason("")
            classeRecebida("")
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
                            setStudent(e.target.value)
                        }}
                        required
                        placeholder='Digite o nick do militar que teve aula.'
                    />
                </label>

                <label>
                    * Aula
                    <select onChange={(e) => setClasseRecebida(e.target.value)}>
                        {newArrayClesses && newArrayClesses.map((classe) => (
                                <option key={`${classe._id}`} value={classe.nameClasse}>{classe.nameClasse}</option>
                        ))}
                    </select>
                </label>
                <label>
                    * Observação:
                    <textarea placeholder='Digite as observações da aula' onChange={(e) => setReason(e.target.value)} required>

                    </textarea>
                </label>
                        {message && <p>{message.msg}</p>}
                {!loading && <button className='BtnActive btn' onClick={handleSubmit}> <span className='SpanBtn'><FaFloppyDisk /></span>Publicar</button>}
                {loading && <button className='BtnActive BtnActiveDisable btn' disabled onClick={handleSubmit}> <span className='SpanBtn'><FaFloppyDisk /></span>Aguarde...</button>}
            </form>
        </div>

    );
}

export default FormClasses;