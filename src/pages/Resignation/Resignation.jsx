import React, { useContext, useEffect, useState } from 'react'
import { FaArrowAltCircleUp, FaListUl } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import '../forms.css'
import { RequirementsContext } from '../../context/Requirements';
import TableRequirements from '../../components/TableRequirements/TableRequirements';
import FormReq from '../../components/FormReq/FormReq';
import FormResignation from '../../components/FormReq/FormResignation';

const Resignation = () => {
    const { searchRequerimentsPromotedsUser, requerimentsFilter } = useContext(RequirementsContext);
    const [showPromotions, setShowPromotions] = useState(false)

    useEffect(() => {
        searchRequerimentsPromotedsUser("Demissão", "")
        document.title = "Polícia DOP - Demissões";
    }, [])



    return (
        <div className='BodyForms'>
            <article>
                <div className='contentBodyElement'>
                    <div className='contentBodyElementTitle '>
                        <h3>Menu Rápido</h3>
                    </div>
                    <ul>
                        <li><button className='contentBodyElementMenu' onClick={() => setShowPromotions(true)}>Demitir<span><GiExitDoor /></span></button></li>
                        <li><button className='contentBodyElementMenu' onClick={() => setShowPromotions(false)}>Todas as Demissões<span><FaListUl /></span></button></li>
                    </ul>
                </div>
            </article>
            <main>
                {!showPromotions ? (
                    <>

                        <div className='divMainForms'>
                            <h2><span> <FaListUl /></span>Lista de Demissões</h2>
                        </div>
                        <TableRequirements
                            searchRequerimentsPromotedsUser={searchRequerimentsPromotedsUser}
                            requerimentsFilter={requerimentsFilter}
                        />
                         </>)
                   : (

                    <FormResignation />

                )}
            </main>
        </div>
    )
}

export default Resignation