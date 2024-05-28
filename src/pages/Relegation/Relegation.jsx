import React, { useContext, useEffect, useState } from 'react'
import { FaArrowCircleDown  , FaListUl } from "react-icons/fa";
import '../forms.css'
import { RequirementsContext } from '../../context/Requirements';
import TableRequirements from '../../components/TableRequirements/TableRequirements';
import FormReqdemi from '../../components/FormReq/FormRelegation';

const Relegation = () => {
    const { searchRequerimentsPromotedsUser, requerimentsFilter } = useContext(RequirementsContext);
    const [showPromotions, setShowPromotions] = useState(false)
    const typeStatus = "Rebaixamento";
    useEffect(() => {
        searchRequerimentsPromotedsUser("Rebaixamento", "")
        document.title = "Polícia DOP - Rebaixamento";
    }, [])



    return (
        <div className='BodyForms'>
            <article>
                <div className='contentBodyElement'>
                    <div className='contentBodyElementTitle '>
                        <h3>Menu Rápido</h3>
                    </div>
                    <ul>
                        <li><button className='contentBodyElementMenu' onClick={() => setShowPromotions(true)}>Rebaixar<span><FaArrowCircleDown  AltCircleUp /></span></button></li>
                        <li><button className='contentBodyElementMenu' onClick={() => setShowPromotions(false)}>Todos os Rebaixamentos<span><FaListUl /></span></button></li>
                    </ul>
                </div>
            </article>
            <main>
                {!showPromotions ? (
                    <>

                        <div className='divMainForms'>
                            <h2><span> <FaListUl /></span>Lista de Rebaixamento</h2>
                        </div>
                        <TableRequirements
                            typeStatus={typeStatus}
                            searchRequerimentsPromotedsUser={searchRequerimentsPromotedsUser}
                            requerimentsFilter={requerimentsFilter}
                        />
                         </>)
                   : (

                    <FormReqdemi
                    
                    />

                )}
            </main>
        </div>
    )
}

export default Relegation;