import React, { useContext, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { EndorsementContext } from '../../context/EndorsementContext';

const FormAval = ({ singleAval }) => {
    // Função para formatar a data para DD/MM/AAAA
    const { getEndorsement, EndorsementDb, messege, loading, EndorsementStatus, deleteEndorsement } = useContext(EndorsementContext);

    const [operator, setOperator] = useState([]);
    useEffect(() => {
        setOperator(JSON.parse(localStorage.getItem("@Auth:Profile")));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    }

    const atualizaStatus = (e, status) => {
        e.preventDefault();
        const data = {
            idUser: operator._id,
            idAval: singleAval._id,
            statusAval: status
        }
        EndorsementStatus(data);
    }

    const deleteRequirements = async (e) => {
        e.preventDefault();
        const data = {
            idUser: operator._id,
            idAval: singleAval._id,
        }
        deleteEndorsement(data)
    }
    return (
        <div className='DivForm'>
            <div>
                <h2>Aval</h2>
            </div>

            <form>
                <label>
                    * Solicitante:
                    <input type="text"
                        value={singleAval.nicknameAval}
                        disabled
                    />
                </label>

                <label>
                    * Data inicial:
                    <input type="text"
                        value={formatDate(singleAval.startDate)}
                        disabled
                    />
                </label>

                <label>
                    * Dias de aval:
                    <input type="text"
                        value={singleAval.endorsementdays}
                        disabled
                    />
                </label>

                <label>
                    * Data final:
                    <input type="text"
                        value={formatDate(singleAval.endDate)}
                        disabled
                    />
                </label>

                <label>
                    * Motivo:
                    <textarea placeholder='Digite o motivo do rebaixamento' value={singleAval.reason} disabled>
                    </textarea>
                </label>

                {messege && <p className='text-green-700 text-[13px]'>{messege.msg}</p>}
                {messege && <p className='text-red-700 text-[13px]'>{messege.error}</p>}
                {singleAval && singleAval.status === "Pendente" &&
                    <section className='flex row items-center justify-center'>
                        <button
                            type="button"
                            onClick={(e) => atualizaStatus(e, "Aprovado")}
                            className='flex m-2 items-center justify-center text-white bg-green-700 hover:bg-green-800 text-[14px] h-[30px] w-[120px] rounded-sm font-medium transition duration-300'>
                            <span className='mr-2'><FaCheck /></span>Aprovar
                        </button>

                        <button
                            onClick={(e) => atualizaStatus(e, "Reprovado")}
                            type="button"
                            className='flex m-2 items-center justify-center text-white bg-orange-600 hover:bg-orange-700 text-[14px] h-[30px] w-[120px] rounded-sm font-medium transition duration-300'>
                            <span className='mr-2'><MdDelete /></span>Reprovado
                        </button>

                        <button
                            type="button"
                            onClick={(e) => deleteRequirements(e)} className='flex m-2 items-center justify-center text-white bg-red-700 hover:bg-red-800 text-[14px] h-[30px] w-[120px] rounded-sm font-medium'>
                            <span className='mr-2'><MdDelete /></span>Excluir
                        </button>
                    </section>
                }
            </form>
        </div>
    );
}

export default FormAval;
