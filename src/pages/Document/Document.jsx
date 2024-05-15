import React from 'react';
import style from './document.module.css';
import DOMPurify from 'dompurify';

const Document = ({doc}) => {
  // Sanitize the content
  const sanitizedContent = DOMPurify.sanitize(doc.content);

  return (
    <div className={style.Documents}>
      <h2>{doc.nameDocs}</h2>
      <div className={style.DocumentContent}>
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>
    </div>
  );
};

export default Document;
