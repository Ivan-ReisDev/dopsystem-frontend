import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { FaEye } from "react-icons/fa";
import FormReq from '../FormReq/FormReq';
import FormRelegation from '../FormReq/FormRelegation';
import FormWarning from '../FormReq/FormWarning';
import FormSale from '../FormReq/FormSale';
const TableRequirements = ({ requerimentsFilter, typeStatus }) => {

    const [requerimentSelected, RequerimentSelected] = useState([]);
    const [stateRequeri, setStateRequeri] = useState(false)

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
                            <th>Ações</th>
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
                                    {requirement && requirement.status === "Pendente" ? (
                                        <td className='TdTags'> <span className='TagPendente'>{requirement.status}</span></td>

                                    ) : requirement.status === "Aprovado" ? (

                                        <td className='TdTags'><span className='TagAprovado'>{requirement.status}</span></td>
                                    )
                                        : (<td className='TdTags'> <span className='TagReprovado'>{requirement.status}</span></td>)
                                    }

                                    <td><button onClick={(e) => {
                                        setStateRequeri(true)
                                        RequerimentSelected(requirement)

                                    }} className='BtnActiveForm'><span className='SpanBtn'><FaEye /> Ver </span></button></td>
                                </tr>
                            ))}
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


            {stateRequeri && typeStatus === "Demissão" && <FormSale
                requerimentSelected={requerimentSelected}
            />}


        </>
    )
}

export default TableRequirements