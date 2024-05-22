import React, { useState, useRef, useMemo, useContext } from 'react';

import style from './EditDocs.module.css';
import JoditEditor from 'jodit-react';
import { DocsContext } from '../../context/DocsContext';
import { set } from 'react-hook-form';
import { FaFloppyDisk } from "react-icons/fa6";
const EditDocs = ({ placeholder, doc, team }) => {



  const { createDocs, message: messageBack, loadingDocs, resOk, editDoc } = useContext(DocsContext);
  const profileUser = JSON.parse(localStorage.getItem('@Auth:Profile'))

  const editor = useRef(null);
  const [content, setContent] = useState( doc ? doc.content : '');
  const [title, setTitle] = useState(doc ? doc.nameDocs : '');
  const [messege, setMessege] = useState();
  const [docsType, setDocsType] = useState(doc ? doc.title : '')


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

  const handleSubmitDocsEdit = (event) => {
    event.preventDefault();

    if (!content || !title) {
      return setMessege("Por favor preencha todos os campos!");
    }
    setMessege('')
    const data = {
      nameDocs: title,
      content,
      idUser: profileUser._id,
      docsType,
      idDoc: doc._id
    }


    
    editDoc(data);
    if(resOk) {
      setTitle('')
      setContent('')
      setDocsType('')
    }
  }


  const handleSubmitDocs = (event) => {
    event.preventDefault();

    if (!content || !title) {
      return setMessege("Por favor preencha todos os campos!");
    }
    setMessege('')
    const data = {
      nameDocs: title,
      content,
      idUser: profileUser._id,
      docsType,
    }
    
    createDocs(data);
    if(resOk) {
      setTitle('')
      setContent('')
      setDocsType('')
    }
  }

  return (
    <div className={style.editDocs}>
      <div className={style.editDocsBody}></div>
      <div>
        <div className={style.editDocsBodyTop}>
          <label >
            Título:
            <input type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='Digite aqui o título.' />
          </label>
          <label >
            Tipo do documento:
            <select onChange={(e) => setDocsType(e.target.value)}>
              <option value="" disabled selected>Selecione</option>
              <option value="System">System</option>
              <option value="Ensino">Ensino</option>
              <option value="Supervisores">Supervisores</option>
              <option value="Treinadores">Treinadores</option>
            </select>
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
      </div>
      
      {!loadingDocs && <button className='BtnActive' onClick={handleSubmitDocs}> <span className='SpanBtn'><FaFloppyDisk /></span>Publicar</button>}
      {doc ? <button className='BtnActive' onClick={handleSubmitDocsEdit}> <span className='SpanBtn'><FaFloppyDisk /></span>Editar</button>: ""}
      {loadingDocs && <button className='BtnActive BtnActiveDisable' disabled onClick={handleSubmitDocs}> <span className='SpanBtn'><FaFloppyDisk /></span>Aguarde...</button>}
      {messege && <p className='error'>{messege}</p>}
      {messageBack && <p className='error'>{messageBack.msg}</p>}
    </div >
  );
};

export default EditDocs;
