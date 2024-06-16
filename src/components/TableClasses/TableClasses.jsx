import React, { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import { RequirementsContext } from '../../context/Requirements';

const TableClasses = ({ team }) => {
    const { requerimentsClasses, searchRequerimentsClasses } = useContext(RequirementsContext);
    const [classesDb, setClassesDb] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; // Número de itens por página

    useEffect(() => {
        fetchClasses(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (requerimentsClasses) {
            setClassesDb(requerimentsClasses.requirements);
            setTotalPages(requerimentsClasses.totalPages);
        }
    }, [requerimentsClasses, team.nameTeams]);

    const fetchClasses = async (page) => {
        try {
            const data = await searchRequerimentsClasses(team.nameTeams, page, limit);
            setClassesDb(data.requirements);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar classes:', error);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <Table className="w-full text-center border-collapse border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Instrutor</th>
                        <th className="px-4 py-2">Aluno</th>
                        <th className="px-4 py-2">Aula</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(classesDb) && classesDb.map((classe, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2 text-center align-middle">{classe.operator}</td>
                            <td className="border px-4 py-2 text-center align-middle">{classe.promoted}</td>
                            <td className="border px-4 py-2 text-center align-middle">{classe.classe}</td>
                            <td className="border px-4 py-2 text-center align-middle">
                                <span
                                    className={`px-2 py-1 rounded ${
                                        classe.status === "Pendente" ? "bg-yellow-600 text-white" :
                                        classe.status === "Aprovado" ? "bg-green-600 text-white" :
                                        "bg-red-600 text-white"
                                    }`}
                                >
                                    {classe.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Controles de Paginação Estilizados com Tailwind CSS */}
            <div className="flex justify-center items-center mt-4">
                <button
                    className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span className="mx-4 text-lg font-semibold">
                    {currentPage} de {totalPages}
                </span>
                <button
                    className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Próxima
                </button>
            </div>
        </>
    );
};

export default TableClasses;
