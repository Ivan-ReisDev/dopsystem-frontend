import React, { useState, useRef, useMemo, useContext } from 'react';

import style from './EditDocs.module.css';
import JoditEditor from 'jodit-react';
import { DocsContext } from '../../context/DocsContext';
import { set } from 'react-hook-form';
import { FaFloppyDisk } from "react-icons/fa6";
const EditDocs = ({ placeholder }) => {

  const { createDocs } = useContext(DocsContext);
  const profileUser = JSON.parse(localStorage.getItem('@Auth:Profile'))

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [messege, setMessege] = useState('');

    const { loadingDocs } = useContext(DocsContext);

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

  if(!content || !title) {
    return setMessege("Por favor preencha todos os campos!");
  } 
  setMessege('')
  const data = {
    nameDocs: title,
    content,
    create: profileUser.nickname
  }
  createDocs(data);
}


    return (
      <div className={style.editDocs}>
          <div className={style.editDocsBody}></div>
          <div>
              <label >
                  Título: 
                  <input type="text" 
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder='Digite aqui o título.' />
              </label>
              <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1}
                  onBlur={handleBlur}
                  onChange={handleChange}
              />
          </div>
          {!loadingDocs && <button className='BtnActive' onClick={handleSubmitDocs}> <span className='SpanBtn'><FaFloppyDisk/></span>Publicar</button>}
          {loadingDocs && <button className='BtnActive BtnActiveDisable' disabled onClick={handleSubmitDocs}> <span className='SpanBtn'><FaFloppyDisk/></span>Aguarde...</button>}  
          { messege && <p className='error'>{messege}</p>}
      </div>
    );
};

export default EditDocs;
