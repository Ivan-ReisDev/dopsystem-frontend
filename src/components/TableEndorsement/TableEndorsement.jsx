import React, { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaEye } from "react-icons/fa";
import { format } from 'date-fns';
import { EndorsementContext } from '../../context/EndorsementContext';
import FormAval from '../formAval/FormAval';

const TableEndorsement = ({ typeStatus }) => {
    const { EndorsementDb } = useContext(EndorsementContext);
    const [avais, setAvais] = useState([]);
    const [singleAval, setSingleAval] = useState([]); // Corrigido para setSingleAval
    const [statusAval, setStatusAval] = useState(false); // Corrigido para setStatusAval

    useEffect(() => {
        const currentDate = new Date();

        const filteredAvals = EndorsementDb.map(aval => ({
            ...aval,
            startDate: new Date(aval.startDate.split('/').reverse().join('-')),
            endDate: new Date(aval.endDate.split('/').reverse().join('-'))
        })).filter(aval => {
            if (typeStatus === "Avais Ativos") {
                return currentDate >= aval.startDate && currentDate <= aval.endDate;
            } else if (typeStatus === "Avais Encerrados") {
                return currentDate > aval.endDate;
            }
            // Para "Avais" ou se typeStatus for indefinido
            return true;
        });

        setAvais(filteredAvals); // Atualiza o estado apenas uma vez aqui
    }, [EndorsementDb, typeStatus]); // Dependências do useEffect

    const handleViewDetails = (aval) => {
        setSingleAval(aval); // Corrigido para setSingleAval
        setStatusAval(true); // Corrigido para setStatusAval
    };

    return (
        <>
            {statusAval === false && <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>Início</th>
                        <th>Final</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {avais.map((aval, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{aval.nicknameAval}</td>
                            <td>{format(aval.startDate, 'dd/MM/yyyy')}</td>
                            <td>{format(aval.endDate, 'dd/MM/yyyy')}</td>
                            <td className='TdTags'>
                                {aval.status === "Pendente" ? (
                                    <span className='TagPendente'>{aval.status}</span>
                                ) : aval.status === "Aprovado" ? (
                                    <span className='TagAprovado'>{aval.status}</span>
                                ) : (
                                    <span className='TagReprovado'>{aval.status}</span>
                                )}
                            </td>
                            <td>
                                <button onClick={() => { handleViewDetails(aval) }} className='BtnActiveForm'>
                                    <span className='SpanBtn'><FaEye /> Ver </span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>}

            {statusAval === true &&

                <FormAval
                    singleAval={singleAval}
                />

            }
        </>
    );
};

export default TableEndorsement;
