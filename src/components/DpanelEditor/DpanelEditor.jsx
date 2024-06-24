import React, { useState, useRef, useMemo, useContext } from 'react';
import JoditEditor from 'jodit-react';
import { DocsContext } from '../../context/DocsContext';
import { MdDelete } from "react-icons/md";
import { FaFloppyDisk } from "react-icons/fa6";
import { TeamsContext } from '../../context/TeamsContext';
import DOMPurify from 'dompurify';

const DpanelEditor = ({ doc }) => {
    const { createDocs, message: messageBack, setMessage: setMessageBack, loadingDocs, deleteDoc, resOk, editDoc } = useContext(DocsContext);
    const profileUser = JSON.parse(localStorage.getItem('@Auth:Profile'));
    const { teams } = useContext(TeamsContext);

    const editor = useRef(null);
    const [content, setContent] = useState(doc ? doc.content : '');
    const [title, setTitle] = useState(doc ? doc.nameDocs : '');
    const [messege, setMessege] = useState('');
    const [docsType, setDocsType] = useState(doc ? doc.title : '');
    const [checkbox, setCheckbox] = useState(false);

    const sanitizedContent = DOMPurify.sanitize(content);
    const sanitizedTitle = DOMPurify.sanitize(title);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Escreva sua mensagem....',
            height: 500,
            width: 1000,
        }),
        []
    );

    const handleDeleteDoc = () => {
        const data = {
            idUser: profileUser._id,
            idDoc: doc._id
        };
        deleteDoc(data);
    };

    const handleBlur = (newContent) => {
        setContent(newContent);
    };

    const handleSubmitDocsEdit = (event) => {
        event.preventDefault();
        if (!content || !title) {
            return setMessege("Por favor preencha todos os campos!");
        }
        setMessege('');
        const data = {
            nameDocs: title,
            content,
            idUser: profileUser._id,
            docsType,
            script: checkbox,
            idDoc: doc._id
        };
        editDoc(data);
        if (resOk) {
            setTitle('');
            setContent('');
            setDocsType('');
            setCheckbox(false);
        }
    };

    const handleSubmitDocs = (event) => {
        event.preventDefault();
        if (!content || !title) {
            return setMessege("Por favor preencha todos os campos!");
        }
        setMessege('');
        const data = {
            nameDocs: title,
            content,
            idUser: profileUser._id,
            docsType,
            script: checkbox,
        };
        createDocs(data);
        if (resOk) {
            setTitle('');
            setContent('');
            setDocsType('');
            setCheckbox(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <label className="flex-1">
                            <span className="block text-sm font-medium text-gray-700">Título:</span>
                            <input
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                value={sanitizedTitle}
                                placeholder='Digite aqui o título.'
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </label>
                        <label className="flex-1">
                            <span className="block text-sm font-medium text-gray-700">Tipo do documento:</span>
                            <select
                                onChange={(e) => setDocsType(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" disabled selected>Selecione</option>
                                <option value="System">System</option>
                                {teams && teams.map((team) => (
                                    <option key={team.nameTeams} value={team.nameTeams}>{team.nameTeams}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <label className="block mt-4 text-lg font-medium text-gray-700 flex items-center">
                        <input
                            className="mr-2"
                            type="checkbox"
                            checked={checkbox}
                            onChange={(e) => setCheckbox(e.target.checked)}
                        />
                        Deseja criar uma aula com o nome do script?
                    </label>
                </div>
                <JoditEditor
                    ref={editor}
                    value={sanitizedContent}
                    config={config}
                    tabIndex={1}
                    onBlur={handleBlur}
                    onChange={() => { }}
                />
                <div className="mt-6 flex justify-between items-center">
                    {!doc && !loadingDocs &&
                        <button
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            onClick={handleSubmitDocs}
                        >
                            <FaFloppyDisk className="mr-2" />
                            Publicar
                        </button>
                    }
                    {loadingDocs && doc &&
                        <button
                            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md cursor-not-allowed"
                            disabled
                        >
                            <FaFloppyDisk className="mr-2" />
                            Aguarde...
                        </button>
                    }
                    {doc &&
                        <>
                            <button
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                onClick={handleSubmitDocsEdit}
                            >
                                <FaFloppyDisk className="mr-2" />
                                Salvar
                            </button>
                            <button
                                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                onClick={handleDeleteDoc}
                            >
                                <MdDelete className="mr-2" />
                                Excluir
                            </button>
                        </>
                    }
                </div>
                {messege && <p className="mt-4 text-yellow-500">{messege}</p>}
                {messageBack.msg && <p className="mt-4 text-green-500">{messageBack.msg}</p>}
                {messageBack.error && <p className="mt-4 text-red-500">{messageBack.error}</p>}
            </div>
        </div>
    );
};

export default DpanelEditor;
