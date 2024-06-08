import React, { useState, useRef, useMemo, useContext, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { DocsContext } from '../../context/DocsContext';
import { FaFloppyDisk } from "react-icons/fa6";
import { TeamsContext } from '../../context/TeamsContext';

const EditDocs = ({ placeholder, doc, team }) => {
  const { teams } = useContext(TeamsContext);
  const { createDocs, message: messageBack, loadingDocs, resOk, editDoc } = useContext(DocsContext);
  const profileUser = JSON.parse(localStorage.getItem('@Auth:Profile'));

  const editor = useRef(null);
  const [content, setContent] = useState(doc ? doc.content : '');
  const [title, setTitle] = useState(doc ? doc.nameDocs : '');
  const [messege, setMessege] = useState("");
  const [docsType, setDocsType] = useState(doc ? doc.docsType : '');
  const [checkbox, setCheckbox] = useState(false);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Escreva sua mensagem....',
      height: 500,
      width: 1000,
    }),
    [placeholder]
  );

  useEffect(() => {
    document.title = `Polícia DOP - Editor`;
  }, []);

  const handleBlur = (newContent) => {
    setContent(newContent);
  };

  const handleChange = (newContent) => {
    // Adicione lógica aqui, se necessário
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
      setCheckbox(false)
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
      setCheckbox(false)
    }
  };

  return (
    <div className=" relative top-[61px] p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Título:
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='Digite aqui o título.'
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-4 text-lg font-medium text-gray-700">
            Tipo do documento:
            <select
              onChange={(e) => setDocsType(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled selected>Selecione</option>
              {!doc && <option value="System">System</option>}
              {teams &&
                teams.map((team) => (
                  <option key={team._id} value={team.nameTeams}>{team.nameTeams}</option>
                ))
              }
            </select>
          </label>
          <label className="block mb-4 text-lg font-medium text-gray-700 flex items-center">
            <input
              className="mr-2"
              value={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
              type="checkbox"
            />
            Deseja criar uma aula com o nome do script?
          </label>
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="mt-6 flex justify-between items-center">
          {!doc && !loadingDocs &&
            <button
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSubmitDocs}
            >
              <FaFloppyDisk className="mr-2" />
              Publicar
            </button>
          }
          {doc &&
            <button
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSubmitDocsEdit}
            >
              <FaFloppyDisk className="mr-2" />
              Editar
            </button>
          }
          {loadingDocs &&
            <button
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md cursor-not-allowed"
              disabled
            >
              <FaFloppyDisk className="mr-2" />
              Aguarde...
            </button>
          }
        </div>
        {messege && <p className="mt-4 text-red-500">{messege}</p>}
        {messageBack && <p className="mt-4 text-red-500">{messageBack.msg}</p>}
      </div>
    </div>
  );
};

export default EditDocs;
