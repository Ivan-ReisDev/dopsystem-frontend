import React, { useContext, useEffect, useState } from 'react';
import { DocsContext } from '../../context/DocsContext';
import { IoArrowUndo } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import DpanelEditor from '../DpanelEditor/DpanelEditor';
import Preloader from "../../assets/preloader.gif"

const DocsDpanel = () => {
    const { Documents, setMessage: setMessageBack, getDocuments, loadingDocs } = useContext(DocsContext);
    const [editDoc, setEditDoc] = useState(false);
    const [doc, setDoc] = useState([]);

    useEffect(() => {
        getDocuments()

    },[])

    const showDOC = (doc) => {
        setMessageBack('');
        setEditDoc(!editDoc);
        setDoc(doc);
    };

    const newDOC = () => {
        setMessageBack('');
        setDoc(false);
        setEditDoc(true);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800">Documentos</h2>
                {editDoc ? (
                    <button 
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition" 
                        onClick={() => setEditDoc(false)}
                    >
                        <IoArrowUndo size={24} />
                    </button>
                ) : (
                    <button 
                        className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition" 
                        onClick={() => newDOC()}
                    >
                        <FaPlus size={24} />
                    </button>
                )}
            </div>

            <div className="bg-white shadow rounded-lg p-4">
            {loadingDocs && <>
            <div className='flex w-full items-center justify-center h-[300px]'>
                <img src={Preloader} alt="" />
            </div>
            </> }


                {!loadingDocs && !editDoc && (
                    <ul className="divide-y divide-gray-200">
                        {Documents && Documents.map((doc) => (
                            <li 
                                className="py-4 flex justify-between items-center" 
                                key={doc._id}
                            >
                                <button 
                                    className="w-full text-left" 
                                    onClick={() => showDOC(doc)}
                                >
                                    <span className="text-xl font-semibold text-gray-900">{doc.nameDocs}</span>
                                    <div className="mt-2 text-sm text-gray-600">
                                        <span><strong>Tipo: </strong>{doc.docsType}</span><br />
                                        <span><strong>Status: </strong>{doc.status}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                {editDoc && (
                    <DpanelEditor doc={doc} />
                )}
            </div>
        </div>
    );
};

export default DocsDpanel;
