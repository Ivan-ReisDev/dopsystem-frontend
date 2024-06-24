import { useState, useContext, useEffect, useRef } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { RequirementsContext } from '../../context/Requirements';
import Preloader from '../../assets/preloader.gif';

function Logger() {
  const { loggers, getLogs, currentPage, totalPages, message, goToPage, loading } = useContext(UserContext);
  const { formatarDataHora } = useContext(RequirementsContext);
  const [loggersPerPage] = useState(10); // Itens por página
  const [searchTerm, setSearchTerm] = useState(''); // Novo estado para termo de busca

  useEffect(() => {
    getLogs(currentPage, loggersPerPage, searchTerm);
  }, [currentPage, searchTerm]); // Adicione searchTerm como dependência

  const handleSearch = async (value) => {
    setSearchTerm(value);
    goToPage(1); // Redefine para a primeira página ao realizar uma nova busca
  };

  // Função para mudar de página
  const handlePageChange = (page) => {
    goToPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo com efeito suave
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Loggers de acesso ao sistema</h2>

      {/* Input de busca */}
      <input
        type="text"
        placeholder="Buscar log"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <ul>
        {!loading && loggers.map((logger, index) => (
          <li key={index} className="mb-4">
            <div className='italic'><span className='font-semibold not-italic'>Usuário:</span> {logger.user}</div>
            <div className='italic'><span className='font-semibold not-italic'>Ação: </span> {logger.loggerType}</div>
            <div className='italic'><span className='font-semibold not-italic'>Registro:</span> {formatarDataHora(logger.createdAt)}</div>
            <div className='italic'><span className='font-semibold not-italic'>
              Endereço de IP:</span>
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

        {loading &&
          <div className='flex w-full items-center justify-center h-[300px]'>
            <img src={Preloader} alt="Loading..." />
          </div>
        }
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
