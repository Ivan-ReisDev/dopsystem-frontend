import React from 'react'
import { FaClock,
    FaPlus
 } from "react-icons/fa6";



import style from './Lisense.module.css'

const License = () => {
    return (
        <div className='contentBodyElement'>
            <div className='contentBodyElementTitle'>
                <h3 className={style.title}><span><FaClock /></span> Solicitar Aval</h3>
            </div>
            <form className={style.LicenseForm}>
                <label>
                    Nickname:
                    <input type="text" placeholder='Digite seu nick' />
                </label>

                <div className={style.formInterno}>
                    <label>
                        Data de início:
                        <input type="date" />
                    </label>

                    <label>
                        Dias:
                        <input type="number" placeholder='Digite seu nick' />
                    </label>
                </div>

                <label>
                    Motivo:
                    <textarea></textarea>
                </label>

                <button type='submit'><span><FaPlus /></span> Solicitar Aval</button>

            </form>


        </div>
    )
}

export default License