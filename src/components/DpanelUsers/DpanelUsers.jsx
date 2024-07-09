import React, { useContext, useEffect, useState } from 'react';
import DpanelEdit from './DpanelEdit';
import { UserContext } from '../../context/UserContext';

const DpanelUsers = () => {
    const { user, getAll, setMessege } = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState('inicial');
    const [userSelect, setUserSelect] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [arrayUser, setArrayUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm, getAll]);

    useEffect(() => {

        if (Array.isArray(user)) {
            setArrayUser(user);
        } else {
            console.error('Expected user to be an array but got:', user);
        }
    }, [user]);

    const fetchData = async () => {
        try {
            let data;
            if (searchTerm.trim() === '') {
                data = await getAll(currentPage, itemsPerPage);
            } else {
                data = await getAll(currentPage, itemsPerPage, searchTerm);
            }
            setArrayUser(data);
            const totalCount = await getTotalUserCount();
            setTotalPages(Math.ceil(totalCount / itemsPerPage));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const getTotalUserCount = async () => {
        try {
            const data = await getAll(1, 1); // Assuming this retrieves total count
            return data.totalCount;
        } catch (error) {
            console.error('Error fetching total count:', error);
            return 0;
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewUser = (user) => {
        setPage('Edit');
        setUserSelect(user);
        setMessege('');
    };

    return (
        <>
            {page === "inicial" &&
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Usuários</h1>
                    <input
                        type="text"
                        placeholder="Buscar usuário"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="mb-4 p-2 border rounded w-full"
                    />
                    <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
                        {arrayUser.length === 0 ? (
                            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">Nenhum usuário encontrado.</span>
                            </div>
                        ) : (
                            arrayUser.map((user) => (
                                <li key={user._id} className="p-3 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">{user.nickname}</p>
                                        <p className="text-sm text-gray-500">{user.patent}</p>
                                    </div>
                                    <button
                                        onClick={() => handleViewUser(user)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        View
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 mx-1 bg-gray-300 rounded-md ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'}`}
                        >
                            Voltar
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`px-4 py-2 mx-1 bg-gray-300 rounded-md ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'}`}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            }
            {page === "Edit" &&
                <DpanelEdit
                    setPage={setPage}
                    userSelect={userSelect}
                />
            }
        </>
    );
};

export default DpanelUsers;
