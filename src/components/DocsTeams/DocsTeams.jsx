import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DocsContext } from '../../context/DocsContext';

const DocsTeams = ({ DocsScripts, team }) => {
  const { deleteDoc } = useContext(DocsContext);
  const idUser = JSON.parse(localStorage.getItem('@Auth:ProfileUser'));

  const handleDelete = (idDoc) => {
    const data = {
      idUser: idUser._id,
      idDoc: idDoc,
      idTeam: team._id
    };
    deleteDoc(data);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800"><span>Documento</span><span className="float-right">Ação</span></h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {DocsScripts && DocsScripts.map((doc) => (
            <li key={doc._id} className="px-6 py-4 flex justify-between items-center">
              <span className="text-gray-800">{doc.nameDocs}</span>
              <span>
                <Link 
                  className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition" 
                  to={`/editor/${doc.docsType}/doc/${doc._id}`}
                >
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(doc._id)} 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                >
                  Excluir
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocsTeams;
