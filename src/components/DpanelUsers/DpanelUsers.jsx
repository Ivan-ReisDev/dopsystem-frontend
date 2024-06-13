import React, { useContext, useEffect, useState } from 'react';
import DpanelEdit from './DpanelEdit';
import { UserContext } from '../../context/UserContext';

const DpanelUsers = () => {
    const { user, getAll, setMessege, searchAllUsers } = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState('inicial');
    const [userSelect, setUserSelect] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [arrayUser, setArrayUser] = useState([]);
    const itemsPerPage = 7;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAll(currentPage, itemsPerPage);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, [currentPage, getAll]);

    useEffect(() => {
        console.log('User:', user);
        if (Array.isArray(user)) {
            setArrayUser(user);
        } else {
            console.error('Expected user to be an array but got:', user);
        }
    }, [user]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {page === "inicial" &&
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Usuários</h1>
                    <input
                        type="text"
                        placeholder="Buscar usuário"
                        onChange={(e) => searchAllUsers(e.target.value)}
                        className="mb-4 p-2 border rounded w-full"
                    />
                    <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
                        {arrayUser.map((user) => (
                            <li key={user._id} className="p-3 flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium text-gray-900">{user.nickname}</p>
                                    <p className="text-sm text-gray-500">{user.patent}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setPage("Edit");
                                        setUserSelect(user);
                                        setMessege('');
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    View
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            {page === "Edit" &&
                <DpanelEdit
                    setPage={setPage}
                    userSelect={userSelect}
                />
            }

            {page === "inicial" && (
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
            )}
        </>
    );
};

export default DpanelUsers;
