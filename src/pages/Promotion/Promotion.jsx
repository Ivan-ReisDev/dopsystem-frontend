import React, { useContext, useEffect, useState } from 'react'
import { FaArrowAltCircleUp, FaListUl } from "react-icons/fa";
import { Link } from 'react-router-dom'
import '../forms.css'
import { RequirementsContext } from '../../context/Requirements';
import TableRequirements from '../../components/TableRequirements/TableRequirements';
import FormReq from '../../components/FormReq/FormReq';

const Promotion = () => {
    const { searchRequerimentsPromotedsUser, requerimentsFilter } = useContext(RequirementsContext);
    const [showPromotions, setShowPromotions] = useState(false)

    useEffect(() => {
        searchRequerimentsPromotedsUser("Promoção", "")
        document.title = "Polícia DOP - Promoções";
    }, [])



    return (
        <div className='BodyForms'>
            <article>
                <div className='contentBodyElement'>
                    <div className='contentBodyElementTitle '>
                        <h3>Menu Rápido</h3>
                    </div>
                    <ul>
                        <li><button className='contentBodyElementMenu' onClick={() => setShowPromotions(true)}>Promover<span><FaArrowAltCircleUp /></span></button></li>
                        <li><button className='contentBodyElementMenu' onClick={() => setShowPromotions(false)}>Todas as Promoções<span><FaListUl /></span></button></li>
                    </ul>
                </div>
            </article>
            <main>
                {!showPromotions ? (
                    <>

                        <div className='divMainForms'>
                            <h2><span> <FaListUl /></span>Lista de Promoções</h2>
                        </div>
                        <TableRequirements
                            searchRequerimentsPromotedsUser={searchRequerimentsPromotedsUser}
                            requerimentsFilter={requerimentsFilter}
                        />
                         </>)
                   : (

                    <FormReq />

                )}
            </main>
        </div>
    )
}

export default Promotion