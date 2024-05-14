import React, { useState, useRef, useMemo, useContext } from 'react';

import style from './EditDocs.module.css';
import JoditEditor from 'jodit-react';
import { DocsContext } from '../../context/DocsContext';
import { set } from 'react-hook-form';
import { FaFloppyDisk } from "react-icons/fa6";
const EditDocs = ({ placeholder }) => {

  const { createDocs, message: messageBack, loadingDocs, resOk } = useContext(DocsContext);
  const profileUser = JSON.parse(localStorage.getItem('@Auth:Profile'))

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [messege, setMessege] = useState('');
  const [docsType, setDocsType] = useState('')


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


  const handleSubmitDocs = (event) => {
    event.preventDefault();

    if (!content || !title) {
      return setMessege("Por favor preencha todos os campos!");
    }
    setMessege('')
    const data = {
      nameDocs: title,
      content,
      create: profileUser.nickname,
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
              <option value="Instrutores">Instrutores</option>
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
      {loadingDocs && <button className='BtnActive BtnActiveDisable' disabled onClick={handleSubmitDocs}> <span className='SpanBtn'><FaFloppyDisk /></span>Aguarde...</button>}
      {messege && <p className='error'>{messege}</p>}
      {messageBack && <p className='error'>{messageBack.msg}</p>}
    </div >
  );
};

export default EditDocs;
