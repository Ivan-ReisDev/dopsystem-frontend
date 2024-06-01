import React, { useContext, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import DOMPurify from 'dompurify';
import style from './Publication.module.css'
const Publication = ({ publi } ) => {
    const [publication, setPublication] = useState(false);


    const sidebar = () => setPublication(!publication)
    const sanitizedContent = DOMPurify.sanitize(publi.content);


    // getPublication,
    // allPublications

    return (
        <div className={publication ? `${style.Publication} ${style.activePublic}` : `${style.Publication}`}>
            <div className={style.PublicationTitle} onClick={sidebar}>
                <div>
                    <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${publi.user}&direction=2&head_direction=2&size=m&action=std`} alt="Avatar" />
                    <h2>{publi.title}</h2>
                </div>
                <button onClick={sidebar}> {publication ? "-" : <FaPlus />}   </button>
            </div>

            <div className={publication ? `${style.active} ${style.PublicationBodyAnim}` : style.PublicationBodyAnim} >
                <img src={publi.linkImg} alt="" />
                <div  className='p-2' dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
            </div>

        </div>
    )
}

export default Publication