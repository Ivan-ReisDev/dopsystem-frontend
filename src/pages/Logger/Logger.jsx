import Table from 'react-bootstrap/Table';
import style from './logger.module.css'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
function Logger() {
    const { loggers } = useContext(UserContext);
    return (
        <div className={style.logger}>
            <h2> Loggers de acesso ao system</h2>
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
                {loggers &&
                            [...loggers].reverse().map((logger, index) => (
                                <tr key={index}>
                                <td>{index}</td>
                                <td>{logger.user}</td>
                                <td>{logger.loggerType}</td>
                                <td><Link target='_blank' to={`https://www.geolocation.com/pt?ip=${logger.ip}#ipresult`}>{logger.ip}</Link></td>
                            </tr>
                            ))}
            </tbody>
        </Table>


        </div>
    );
}

export default Logger;