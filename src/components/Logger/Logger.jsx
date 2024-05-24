import { useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import style from './logger.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function Logger() {
    const { loggers } = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [loggersPerPage] = useState(12); // Defina quantos registros deseja exibir por página
    // Obtenha o índice do último registro na página atual
    const indexOfLastLogger = currentPage * loggersPerPage;
    // Obtenha o índice do primeiro registro na página atual
    const indexOfFirstLogger = indexOfLastLogger - loggersPerPage;
    // Obtenha os loggers da página atual
    const currentLoggers = loggers.slice(indexOfFirstLogger, indexOfLastLogger);
    // Mude de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={style.logger}>
            <h2>Loggers de acesso ao sistema</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuário</th>
                        <th>Ação</th>
                        <th>Endereço de IP</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLoggers.map((logger, index) => (
                        <tr key={index}>
                            <td>{index + indexOfFirstLogger + 1}</td>
                            <td>{logger.user}</td>
                            <td>{logger.loggerType}</td>
                            <td>
                                <Link target='_blank' to={`https://www.geolocation.com/pt?ip=${logger.ip}#ipresult`}>{logger.ip}</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {Array.from({ length: Math.ceil(loggers.length / loggersPerPage) }, (_, i) => (
                    <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
}

export default Logger;
