import React, { useContext, useState } from 'react'
import { DocsContext } from '../../context/DocsContext';
import { IoArrowUndo } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import style from './DocsDpanel.module.css'
import DpanelEditor from '../DpanelEditor/DpanelEditor';

const DocsDpanel = () => {
    const { Documents, setMessage: setMessageBack, } = useContext(DocsContext);
    const [editDoc, setEditDoc] = useState(false);
    const [doc, setDoc] = useState([])

    const showDOC = (doc) => {
        setMessageBack('');
        setEditDoc(!editDoc)
        setDoc(doc);
    }

    const newDOC = () => {
        setMessageBack('');
        setDoc(false)
        setEditDoc(true)

    }

    return (
        <div>
            <div className={style.head}>
                <h2 className={style.TitlePrimary}>Documentos</h2>
                { editDoc  && <button className={style.back} onClick={() => setEditDoc(false)}><IoArrowUndo /></button>}
                { !editDoc  && <button className={style.back} onClick={() => newDOC() }><FaPlus /></button>}
            </div>

            <div className={style.MainDoc}>
                {!editDoc && <ul className={style.MainDocUL}>
                    {Documents && Documents.map((doc) => (
                        <li className={style.MainDocLI} key={doc._id}>
                            <button onClick={() => showDOC(doc)}>
                                <span className={style.title}>{doc.nameDocs}</span>
                                <div className={style.MainDocMain}>
                                    <span><strong>Tipo: </strong> {doc.docsType}</span>
                                    <span><strong>Status: </strong>{doc.status}</span>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>}
                {editDoc &&
                    <DpanelEditor
                        doc={doc}
                        
                    />}
            </div>



        </div>
    )
}

export default DocsDpanel