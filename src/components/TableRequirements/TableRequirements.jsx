import React, { useContext, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { FaEye } from "react-icons/fa";
import FormReq from '../FormReq/FormReq';
import FormRelegation from '../FormReq/FormRelegation';
import FormWarning from '../FormReq/FormWarning';
import FormSale from '../FormReq/FormSale';
import FormContract from '../FormReq/FormContract';
import FormResignation from '../FormReq/FormResignation'
import { RhContext } from '../../context/RhContext';
import { json } from 'react-router-dom';
const TableRequirements = ({ requerimentsFilter, typeStatus }) => {

    const [requerimentSelected, RequerimentSelected] = useState([]);
    const [stateRequeri, setStateRequeri] = useState(false);
    const localStoregeUser = JSON.parse(localStorage.getItem("@Auth:Profile"))
    const { setMessege } = useContext(RhContext);

    return (
        <>
            {!stateRequeri && <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {typeStatus === "Promoção" && <> <th>#</th>
                                <th>Promotor</th>
                                <th>Promovido</th>
                            </>}

                            {typeStatus === "Venda" && <> <th>#</th>
                                <th>Vendedor</th>
                                <th>Comprador</th>
                            </>}

                            {typeStatus === "Contrato" && <> <th>#</th>
                                <th>Contratante</th>
                                <th>Contratado</th>
                            </>}


                            {typeStatus === "Advertência" && <> <th>#</th>
                                <th>Aplicador</th>
                                <th>Advertido</th>
                            </>}

                            {typeStatus === "Rebaixamento" && <> <th>#</th>
                                <th>Aplicador</th>
                                <th>Rebaixado</th>
                            </>}

                            {typeStatus === "Demissão" && <> <th>#</th>
                                <th>Aplicador</th>
                                <th>Demitido</th>
                            </>}

                            <th>Patente</th>
                            <th>Status</th>

                            { localStoregeUser && (localStoregeUser.userType === "Admin" || localStoregeUser.userType === "Diretor" || localStoregeUser.userType === "Recursos Humanos")  && 
                            <th>Ações</th> }
                        </tr>
                    </thead>
                    <tbody>
                    {requerimentsFilter &&
    [...requerimentsFilter].reverse().map((requirement, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{requirement.operator}</td>
            <td>{requirement.promoted}</td>
            <td>{requirement.newPatent}</td>
            <td className='TdTags'>
                {requirement.status === "Pendente" ? (
                    <span className='TagPendente'>{requirement.status}</span>
                ) : requirement.status === "Aprovado" ? (
                    <span className='TagAprovado'>{requirement.status}</span>
                ) : (
                    <span className='TagReprovado'>{requirement.status}</span>
                )}
            </td>
            { localStoregeUser && (localStoregeUser.userType === "Admin" || localStoregeUser.userType === "Diretor" || localStoregeUser.userType === "Recursos Humanos")  && (
                <td>
                    <button onClick={(e) => {
                        setStateRequeri(true);
                        RequerimentSelected(requirement);
                        setMessege('');
                    }} className='BtnActiveForm'>
                        <span className='SpanBtn'><FaEye /> Ver </span>
                    </button>
                </td>
            )}
        </tr>
    ))
}
                    </tbody>
                </Table>

            </>}

            {stateRequeri && typeStatus === "Promoção" && <FormReq
                requerimentSelected={requerimentSelected}
            />}

            {stateRequeri && typeStatus === "Rebaixamento" && <FormRelegation
                requerimentSelected={requerimentSelected}
            />}

            {stateRequeri && typeStatus === "Advertência" && <FormWarning
                requerimentSelected={requerimentSelected}
            />}


            {stateRequeri && typeStatus === "Venda" && <FormSale
                requerimentSelected={requerimentSelected}
            />}


            {stateRequeri && typeStatus === "Demissão" && <FormResignation
                requerimentSelected={requerimentSelected}
            />}


            {stateRequeri && typeStatus === "Contrato" && <FormContract
                requerimentSelected={requerimentSelected}
            />}
        </>
    )
}

export default TableRequirements