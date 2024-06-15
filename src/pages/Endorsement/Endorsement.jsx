import React, { useContext, useEffect, useState } from 'react';
import { FaListUl } from "react-icons/fa";
import { TbLicense, TbLicenseOff } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";
import '../forms.css'
import TableEndorsement from '../../components/TableEndorsement/TableEndorsement';
import { EndorsementContext } from '../../context/EndorsementContext';

const Endorsement = () => {
    const [showPromotions, setShowPromotions] = useState("Avais")
    const { getEndorsement, EndorsementDb, messege, loading } = useContext(EndorsementContext);

    useEffect(() => {
        getEndorsement();
        document.title = "Polícia DOP - Avais";
    }, [])


   
    return (
        <div className='BodyForms'>
            <article>
                <div className='contentBodyElement'>
                    <div className='contentBodyElementTitle '>
                        <h3>Menu Rápido</h3>
                    </div>
                    <ul>
                        <li><button className='contentBodyElementMenu' onClick={() => {
                            setShowPromotions("Avais")
                            getEndorsement()
                            }}>Avais<span><MdOutlinePendingActions /></span></button></li>

                        <li><button className='contentBodyElementMenu' onClick={() => {
                            setShowPromotions("Avais Ativos")
                            getEndorsement()
                        }}>Avais ativos<span><TbLicense /></span></button></li>

                        <li><button className='contentBodyElementMenu' onClick={() => {
                            setShowPromotions("Avais Encerrados")
                            getEndorsement()
                            }}>Avais encerrados<span><TbLicenseOff /></span></button></li>
                    </ul>
                </div>
            </article>
            <main>
                {showPromotions === "Avais" &&
                    <>
                        <div className='divMainForms'>
                            <h2><span> <FaListUl /></span>Lista de Avais</h2>
                        </div>
                        <TableEndorsement
                            typeStatus={"Avais"}
                        />
                    </>
                }

                {showPromotions === "Avais Ativos" &&
                    <>
                        <div className='divMainForms'>
                            <h2><span> <FaListUl /></span>Lista de Avais Ativos</h2>
                        </div>
                        <TableEndorsement
                            typeStatus={"Avais Ativos"}
                        />
                    </>
                }

                {showPromotions === "Avais Encerrados" &&
                    <>
                        <div className='divMainForms'>
                            <h2><span> <FaListUl /></span>Lista de Avais Encerrados</h2>
                        </div>
                        <TableEndorsement
                            typeStatus={"Avais Encerrados"}
                            
                        />
                    </>
                }
            </main>
        </div>
    )
}

export default Endorsement;
