import React, { useEffect } from 'react';
import style from './document.module.css';
import DOMPurify from 'dompurify';

const Document = ({ docCompleted }) => {
  // Sanitize the content
  useEffect(() => {
    document.title = `Polícia DOP - ${docCompleted.nameDocs}`;
}, [])
  const sanitizedContent = DOMPurify.sanitize(docCompleted.content);
  return (
    <div className={style.Documents}>
      <h2>{docCompleted.nameDocs}</h2>
      <div className={style.DocumentContent}>
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>
    </div>
  );
};

export default Document;
