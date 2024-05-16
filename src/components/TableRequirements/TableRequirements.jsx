import React from 'react'
import Table from 'react-bootstrap/Table';
import { FaEye } from "react-icons/fa";
const TableRequirements = ({ searchRequerimentsPromotedsUser, requerimentsFilter }) => {
    
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Promotor</th>
                    <th>Promovido</th>
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

                            <td><button className='BtnActiveForm'><span className='SpanBtn'><FaEye /> Ver </span></button></td>
                        </tr>
                    ))}
            </tbody>
        </Table>


    )
}

export default TableRequirements