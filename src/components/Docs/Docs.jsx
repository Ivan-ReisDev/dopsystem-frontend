import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DocsContext } from '../../context/DocsContext';
import Preloader from "../../assets/preloader.gif"
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
        <div className='flex items-center justify-center'> <img className='w-[50px]' src={Preloader} alt="Loading..." /></div>
      ) : (
        <ul>
          {docSelected && Array.isArray(docSelected) && docSelected.map((doc, index) => (
            <li key={index}><Link to={`/doc/${doc._id}`}>{doc.nameDocs}</Link></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Docs;
