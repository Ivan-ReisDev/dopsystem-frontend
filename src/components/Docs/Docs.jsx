import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DocsContext } from '../../context/DocsContext';

const Docs = () => {

  const { searchDoc, docSelected } = useContext(DocsContext);
  const newArrayDocumentos = docSelected;

  return (
    <div className='contentBodyElement'>
    <div className='contentBodyElementTitle'>
        <h3>Documentos</h3>
    </div>
    <ul>
    {docSelected &&
          newArrayDocumentos.map((doc, index) => (
            <li key={index}><Link to={`/docs/${doc._id}`}>{doc.nameDocs}</Link></li>
          ))
        }
    </ul>

    </div>
  )
}

export default Docs