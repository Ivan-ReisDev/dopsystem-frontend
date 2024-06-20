import React, { useContext, useState } from 'react'
import { FaFloppyDisk } from "react-icons/fa6";
import style from './PostClasseInitial.module.css'
import { ClassesContext } from '../../context/ClassesContext';

const PostClasseInitial = () => {
    const [student, setStudent] = useState('');
    const [reason, setReason] = useState('');
    const { loading, postCI, message } = useContext(ClassesContext);
    const user = JSON.parse(localStorage.getItem("@Auth:Profile"))

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            idUser: user._id,
            student,
            reason,
        }
        postCI(data);
        
    }
    return (
        
        <div className={style.formCurso}>
        <div className='DivForm'>
            <div>
                <h2>Postar aula</h2>
            </div>

            <form onSubmit={handleSubmit} >
                <label>
                    * Aluno:
                    <input type="text"
                    value={student}
                    onChange={(e) => setStudent(e.target.value)}
                        required
                        placeholder='Digite o nick do militar que teve aula.'
                    />
                </label>
                <label>
                    * Aula:
                    <input type="text"
                    value={`Curso Inicial [C.I]`}
                        required
                        disabled
                        placeholder='Digite o nick do militar que teve aula.'
   
                    />
                </label>
                <label> 
                    * Observação:
                    <textarea placeholder='Digite as observações da aula'
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    >
                    </textarea>
                </label>
                {message && <p>{message.msg}</p>}
                {message && <p>{message.error}</p>}
                {!loading && <button className='BtnActive btn' type="submit"> <span className='SpanBtn'><FaFloppyDisk /></span>Publicar</button>}
                {loading &&<button className='BtnActive BtnActiveDisable btn' disabled> <span className='SpanBtn'><FaFloppyDisk /></span>Aguarde...</button>}
            </form>
        </div>
        </div>
    );


}

export default PostClasseInitial