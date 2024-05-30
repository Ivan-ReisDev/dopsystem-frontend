import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DocsContext } from '../../context/DocsContext';

const Docs = () => {
  const { searchDoc, docSelected } = useContext(DocsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await searchDoc("System");
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className='contentBodyElement'>
      <div className='contentBodyElementTitle'>
        <h3>Documentos</h3>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {docSelected && Array.isArray(docSelected) && docSelected.map((doc, index) => (
            <li key={index}><Link to={`/docs/${doc._id}`}>{doc.nameDocs}</Link></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Docs;
