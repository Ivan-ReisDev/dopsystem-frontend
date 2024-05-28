import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {


  useEffect(() => {
    document.title = `Polícia DOP - Not Found`;
}, [])
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Página Não Encontrada</h2>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Link to="/">Voltar para a Home</Link>
    </div>
  );
};

export default NotFound;