import React from 'react'
import { Link } from 'react-router-dom'

const Docs = () => {
  return (
    <div className='contentBodyElement'>
    <div className='contentBodyElementTitle'>
        <h3>Documentos</h3>
    </div>
    <ul>
        <li><Link to={'/'}>Estatuto de Ética Militar</Link></li>
        <li><Link to={'/'}>Código Penal Militar</Link></li>
        <li><Link to={'/'}>Código de Vestimenta Militar</Link></li>
        <li><Link to={'/'}>Curso Inicial [C.I]</Link></li>
        <li><Link to={'/'}>Balões recomendados</Link></li>
        <li><Link to={'/'}>Edital: Atualizações do Regulamento Interno</Link></li>
    </ul>

    </div>
  )
}

export default Docs