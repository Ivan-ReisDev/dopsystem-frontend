import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './DocsTeams.module.css';
import { DocsContext } from '../../context/DocsContext';

const DocsTeams = ({ DocsScripts, team }) => {
const { deleteDoc } = useContext(DocsContext);
const idUser = JSON.parse(localStorage.getItem('@Auth:ProfileUser'));

const handleDelete = (idDoc) => {
    const data  = {
        idUser: idUser._id,
        idDoc:idDoc,
        idTeam: team._id
    }
    
    deleteDoc(data)
}

    return (
        <>
                <div className={style.ListTeamsMembers}>
                    <div>
                        <h2><span>Documento</span><span>Ação</span></h2>
                    </div>
                    <ul>
                        {DocsScripts && DocsScripts.map((DocsScripts) => (
                            <li key={DocsScripts._id}>
                                <span>{DocsScripts.nameDocs}</span>
                                <span>
                                    <Link className={style.buttonEdit} to={`/editor/${DocsScripts.url}`}> Editar</Link>
                                    <button onClick={() => handleDelete(DocsScripts._id)} className={style.buttonExcluir}>Excluir</button>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            
        </>
    );
};

export default DocsTeams;