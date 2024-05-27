import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import DpanelEdit from './DpanelEdit';

const DpanelUsers = () => {
    const { userAllArray } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setpage] = useState('inicial');
    const [userSelect, setUserSelect] = useState('')
    const itemsPerPage = 7;

    // Calculate indices for slicing the user array
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userAllArray.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(userAllArray.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
        {page === "inicial" && <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
                {currentItems.map((user) => (
                    <li key={user._id} className="p-3 flex justify-between items-center">
                        <div>
                            <p className="text-lg font-medium text-gray-900">{user.nickname}</p>
                            <p className="text-sm text-gray-500">{user.patent}</p>
                        </div>
                        <button 
                        onClick={() => {setpage("Edit")
                                        setUserSelect(user)

                        }}    
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition">
                            View
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-4 flex justify-center">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mx-1 bg-gray-300 rounded-md ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'}`}
                >
                    Voltar
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index + 1} 
                        onClick={() => handlePageChange(index + 1)} 
                        className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 mx-1 bg-gray-300 rounded-md ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'}`}
                >
                    Próximo
                </button>
            </div>
        </div>}  
        { page === "Edit" &&
                <DpanelEdit
                userSelect={userSelect}
                
                />




        }</>
    );
};

export default DpanelUsers;
