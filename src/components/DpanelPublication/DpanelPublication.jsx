import React, { useState, useRef, useMemo, useContext, useEffect } from 'react';
import { IoArrowUndo } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import JoditEditor from 'jodit-react';
import { PublicationContext } from '../../context/PublicationContext';

const DpanelPublication = ({ placeholder }) => {
    const { createPublication, getPublication, allPublications } = useContext(PublicationContext);

    useEffect(() => {
        getPublication()

    }, [])

    //Editor
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || 'Escreva sua mensagem....',
            height: 500,
            width: 1000,
        }),
        [placeholder]
    );

    const handleBlur = (newContent) => {
        setContent(newContent);
    };


    const handleChange = (newContent) => {
        // Você pode adicionar lógica aqui, se necessário
    };


    const [view, setView] = useState('inicio');
    const [publications, setPublications] = useState([]);
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState("")
    const user = JSON.parse(localStorage.getItem("@Auth:Profile"))

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            idUser: user._id,
            title,
            content,
            linkImg: url
        }
        createPublication(data)
    };

    const renderHeader = () => (
        <div className="flex justify-between items-center mb-4">
            {view === 'inicio' && <h2 className="text-2xl font-bold text-gray-800">Publicações</h2>}
            {(view === 'novo' || view === "editar") && (
                <button
                    className="text-gray-600 hover:text-gray-800 transition"
                    onClick={() => setView('inicio')}
                >
                    <IoArrowUndo size={24} />
                </button>
            )}
            {view === 'inicio' && (
                <button
                    className="text-gray-600 hover:text-gray-800 transition"
                    onClick={() => setView('novo')}
                >
                    <FaPlus size={24} />
                </button>
            )}
        </div>
    );

    const renderPublicationsList = () => (
        <ul className="divide-y divide-gray-200">
            {allPublications.map((pub, index) => (
                <li key={index} className="py-4 flex justify-between items-center">
                    <span className="block text-lg font-semibold text-gray-800">{pub.title}</span>
                    <button
                        
                        className="text-red-500 hover:text-red-700"
                    >
                        Excluir
                    </button>
                </li>
            ))}
        </ul>
    );

    const renderForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Título</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Digite o título"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">URL da Imagem</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Digite o URL da imagem"
                />
            </div>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Publicar
                </button>
                <button
                    type="button"
                    onClick={() => setView('inicio')}
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );

    return (
        <div className="container mx-auto p-4">
            {renderHeader()}
            <div className="bg-white shadow rounded-lg p-4">
                {view === 'inicio' && renderPublicationsList()}
                {view === 'novo' && renderForm()}
            </div>
        </div>
    );
};

export default DpanelPublication;