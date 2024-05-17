import React, { useContext, useEffect, useState } from 'react'
import {  FaListUl, FaSuitcase } from "react-icons/fa";
import '../forms.css'
import { RequirementsContext } from '../../context/Requirements';
import TableRequirements from '../../components/TableRequirements/TableRequirements';
import FormContract from '../../components/FormReq/FormContract';
import { SystemContext } from '../../context/SystemContent';

const Contract = () => {
    const { searchRequerimentsPromotedsUser, requerimentsFilter } = useContext(RequirementsContext);
   
    const [showPromotions, setShowPromotions] = useState(false)
    useEffect(() => {
        searchRequerimentsPromotedsUser("Contrato", "")
        document.title = "Polícia DOP - Contratos";
    }, [])

    return (
        <div className='BodyForms'>
            <article>
                <div className='contentBodyElement'>
                    <div className='contentBodyElementTitle '>
                        <h3>Menu Rápido</h3>
                    </div>
                    <ul>
                        <li><button className='contentBodyElementMenu' onClick={() => setShowPromotions(true)}>Contratar<span><FaSuitcase  AltCircleUp /></span></button></li>
                        <li><button className='contentBodyElementMenu' onClick={() => setShowPromotions(false)}>Todos os Contratos<span><FaListUl /></span></button></li>
                    </ul>
                </div>
            </article>
            <main>
                {!showPromotions ? (
                    <>

                        <div className='divMainForms'>
                            <h2><span> <FaListUl /></span>Lista de Contratados</h2>
                        </div>
                        <TableRequirements
                            searchRequerimentsPromotedsUser={searchRequerimentsPromotedsUser}
                            requerimentsFilter={requerimentsFilter}
                        />
                         </>)
                   : (

                    <FormContract />

                )}
            </main>
        </div>
    )
}

export default Contract;