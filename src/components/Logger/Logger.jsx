import { useState, useContext, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';

function Logger() {
    const { loggers, getLogs, currentPage, totalPages, message, goToPage } = useContext(UserContext);
    const { formatarDataHora } = useContext(RequirementsContext);
    const [loggersPerPage] = useState(5); // Itens por página

    useEffect(() => {
        getLogs(currentPage, loggersPerPage);
    }, [currentPage]);
    // Função para mudar de página
    const handlePageChange = (page) => {
        goToPage(page);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Loggers de acesso ao sistema</h2>
            <ul>
                {loggers.map((logger, index) => (
                    <li key={index} className="mb-4">
                        <div>Usuário: {logger.user}</div>
                        <div>Ação: {logger.loggerType}</div>
                        <div>Registro: {formatarDataHora(logger.createdAt)}</div>
                        <div>
                            Endereço de IP: 
                            <Link 
                                target='_blank' 
                                to={`https://www.geolocation.com/pt?ip=${logger.ip}#ipresult`} 
                                className="text-blue-500 hover:underline"
                            >
                                {logger.ip}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <Pagination className="mt-4">
                <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    className="cursor-pointer"
                />
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item 
                        key={i} 
                        active={i + 1 === currentPage} 
                        onClick={() => handlePageChange(i + 1)}
                        className="cursor-pointer"
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                    className="cursor-pointer"
                />
            </Pagination>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Logger;
