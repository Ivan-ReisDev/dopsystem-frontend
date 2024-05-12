import React from 'react'
import style from './document.module.css'

const Document = ({doc}) => {


  return (
    <div className={style.Documents}>
      <h2>{doc.nameDocs}</h2>
      <div className={style.DocumentContent}>
        <div dangerouslySetInnerHTML={{ __html: doc.content }}></div>
      </div>
    </div>
  )
}

export default Document