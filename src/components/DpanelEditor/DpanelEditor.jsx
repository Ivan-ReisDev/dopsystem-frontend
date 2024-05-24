import React, { useState, useRef, useMemo, useContext } from 'react';
import JoditEditor from 'jodit-react';
import { DocsContext } from '../../context/DocsContext';
import { MdDelete } from "react-icons/md";
import { set } from 'react-hook-form';
import { FaFloppyDisk } from "react-icons/fa6";
import style from './DpanelEditor.module.css'
import { TeamsContext } from '../../context/TeamsContext';
const DpanelEditor = ({ doc }) => {

    const { createDocs, message: messageBack, setMessage: setMessageBack, loadingDocs, deleteDoc, resOk, editDoc } = useContext(DocsContext);
    const profileUser = JSON.parse(localStorage.getItem('@Auth:Profile'));

    const { teams } = useContext(TeamsContext)


    const editor = useRef(null);
    const [content, setContent] = useState(doc ? doc.content : '');
    const [title, setTitle] = useState(doc ? doc.nameDocs : '');
    const [messege, setMessege] = useState();
    const [docsType, setDocsType] = useState(doc ? doc.title : '')


    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Escreva sua mensagem....',
            height: 500,
            width: 1000,
        }),
        []
    );

    //idUser, idDoc

    const handleDeleteDoc = () => {
        const data = {
            idUser: profileUser._id,
            idDoc: doc._id
        }
        deleteDoc(data)
        window.location.reload('/dpanel')
    }

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
        if (resOk) {
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
        if (resOk) {
            setTitle('')
            setContent('')
            setDocsType('')
        }
    }

    console.log(messageBack)
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
                            {teams && teams.map((team) => (
                                <option key={team.nameTeams} value={team.nameTeams}>{team.nameTeams}</option>
                            ))}

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
            {messageBack.msg && <p>{messageBack.msg}</p>}
            {messageBack.error && <p className='error'>{messageBack.error}</p>}    
            {!loadingDocs && !doc && <button className='BtnActive' onClick={handleSubmitDocs}> <span className='SpanBtn'><FaFloppyDisk /></span>Publicar</button>}
            {loadingDocs && !!doc && <button className='BtnActive BtnActiveDisable' disabled onClick={handleSubmitDocs}> <span className='SpanBtn'><FaFloppyDisk /></span>Aguarde...</button>}
            <div className={style.btns}>
                {doc ? <button className='BtnActive' onClick={handleSubmitDocsEdit}> <span className='SpanBtn'><FaFloppyDisk /></span>Salvar</button> : ""}
                {doc ? <button className='BtnActive BtnActiveError' onClick={handleDeleteDoc}> <span className='SpanBtn'><MdDelete /></span>Excluir</button> : ""}
            </div>
            

        </div >
    );
};

export default DpanelEditor;
