import React, { useContext, useEffect } from 'react';
import Preloader from "../../assets/preloader.gif"
import style from './document.module.css';
import DOMPurify from 'dompurify';
import { DocsContext } from '../../context/DocsContext';

const Document = ({ docCompleted }) => {

  const { loadingDocs } = useContext(DocsContext)


  // Sanitize the content
  useEffect(() => {
    document.title = `Polícia DOP - ${docCompleted.nameDocs}`;
  }, [])
  const sanitizedContent = DOMPurify.sanitize(docCompleted.content);


  if (loadingDocs) {
    return (
      <> <div className='w-screen min-w-min  min-h-min h-screen flex items-center justify-center relative'>
        <img src={Preloader} alt="" />
      </div>
      </>

    )

  }



  return (
    <>
      {!loadingDocs && <div className={style.Documents}>
        <h2>{docCompleted.nameDocs}</h2>
        <div className={style.DocumentContent}>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
      </div>
      }

    </>
  );
};

export default Document;
