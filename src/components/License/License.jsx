import React, { useContext, useState } from 'react'
import {
    FaClock,
    FaPlus
} from "react-icons/fa6";
import style from './Lisense.module.css'
import { EndorsementContext } from '../../context/EndorsementContext';

const License = ({ user }) => {
    const { createEndorsement, loading, messege, setMessege } = useContext(EndorsementContext);
    const [nicknameAval, setNicknameAval] = useState('');
    const [initialDate, setInitialDate] = useState('');
    const [reason, setReason] = useState('');
    const [endorsementdays, setEndorsementdays] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            idUser: user._id,
            nicknameAval,
            initialDate,
            reason,
            endorsementdays,
        }
        await createEndorsement(data);
        setNicknameAval('');
        setInitialDate('');
        setReason('');
        setEndorsementdays('')
    }

    return (
        <div className='contentBodyElement'>
            <div className='contentBodyElementTitle'>
                <h3 className={style.title}><span><FaClock /></span> Solicitar Aval</h3>
            </div>
            <form className={style.LicenseForm} onSubmit={handleSubmit}>
                <label>
                    Nickname:
                    <input type="text"
                        placeholder='Digite seu nick'
                        value={nicknameAval}
                        onChange={(e) => {
                            setNicknameAval(e.target.value)
                            setMessege('')
                        }}
                        required
                    />
                </label>

                <div className={style.formInterno}>
                    <label>
                        Data de início:
                        <input type="date"
                            value={initialDate}
                            onChange={(e) => {
                                setInitialDate(e.target.value)
                                setMessege('');
                            }} 
                            required
                            />
                    </label>

                    <label>
                        Dias:
                        <input type="number"
                            placeholder='Quantos dias você deseja de aval?'
                            value={endorsementdays}
                            onChange={(e) => {
                                setEndorsementdays(e.target.value)
                                setMessege('');
                            }} 
                            required
                            />
                    </label>
                </div>
                <label>
                    Motivo:
                    <textarea
                        value={reason}
                        onChange={(e) => {
                            setReason(e.target.value)
                            setMessege('');
                        }}
                        required
                    ></textarea>
                </label>
                {messege.msg && <p className="mt-4 text-green-500">{messege.msg}</p>}
                {messege.error && <p className="mt-4 text-red-500">{messege.error}</p>}
                {!loading && <button type='submit'><span><FaPlus /></span> Solicitar Aval</button>}
                {loading && <button disabled><span><FaPlus /></span> Aguarde...</button>}

            </form>


        </div>
    )
}

export default License