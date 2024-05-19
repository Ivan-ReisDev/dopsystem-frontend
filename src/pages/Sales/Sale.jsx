import React, { useContext, useEffect, useState } from 'react'
import {  FaListUl, FaSuitcase } from "react-icons/fa";
import '../forms.css'
import { RequirementsContext } from '../../context/Requirements';
import TableRequirements from '../../components/TableRequirements/TableRequirements';


import FormSale from '../../components/FormReq/FormSale';

const Contract = () => {
    const { searchRequerimentsPromotedsUser, requerimentsFilter } = useContext(RequirementsContext);
   
    const [showPromotions, setShowPromotions] = useState(false)
    useEffect(() => {
        searchRequerimentsPromotedsUser("Venda", "")
        document.title = "Polícia DOP - Venda de Cargo";
    }, [])

    return (
        <div className='BodyForms'>
            <article>
                <div className='contentBodyElement'>
                    <div className='contentBodyElementTitle '>
                        <h3>Menu Rápido</h3>
                    </div>
                    <ul>
                        <li><button className='contentBodyElementMenu' onClick={() => setShowPromotions(true)}>Vender<span><FaSuitcase  AltCircleUp /></span></button></li>
                        <li><button className='contentBodyElementMenu' onClick={() => setShowPromotions(false)}>Todas as Vendas<span><FaListUl /></span></button></li>
                    </ul>
                </div>
            </article>
            <main>
                {!showPromotions ? (
                    <>

                        <div className='divMainForms'>
                            <h2><span> <FaListUl /></span>Lista de Venda de Cargos</h2>
                        </div>
                        <TableRequirements
                            searchRequerimentsPromotedsUser={searchRequerimentsPromotedsUser}
                            requerimentsFilter={requerimentsFilter}
                        />
                         </>)
                   : (

                    <FormSale />

                )}
            </main>
        </div>
    )
}

export default Contract;