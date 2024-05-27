import { useState, useContext } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function Logger() {
    const { loggers } = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [loggersPerPage] = useState(12); // Defina quantos registros deseja exibir por página

    // Invertendo a ordem dos loggers
    const reversedLoggers = [...loggers].reverse();

    // Obtenha o índice do último registro na página atual
    const indexOfLastLogger = currentPage * loggersPerPage;
    // Obtenha o índice do primeiro registro na página atual
    const indexOfFirstLogger = indexOfLastLogger - loggersPerPage;
    // Obtenha os loggers da página atual
    const currentLoggers = reversedLoggers.slice(indexOfFirstLogger, indexOfLastLogger);
    // Mude de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Loggers de acesso ao sistema</h2>
            <ul>
                {currentLoggers.map((logger, index) => (
                    <li key={index} className="mb-4">
                        <div>ID: {index + indexOfFirstLogger + 1}</div>
                        <div>Usuário: {logger.user}</div>
                        <div>Ação: {logger.loggerType}</div>
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
                {Array.from({ length: Math.ceil(loggers.length / loggersPerPage) }, (_, i) => (
                    <Pagination.Item 
                        key={i} 
                        active={i + 1 === currentPage} 
                        onClick={() => paginate(i + 1)}
                        className="cursor-pointer"
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
}

export default Logger;
