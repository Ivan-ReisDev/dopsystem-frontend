import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocsContext } from "../context/DocsContext";
import Document from "../pages/Document/Document";
import Preloader from "../components/Preloader/Preloader";

export const DocumentView = () => {
    const { docUrl } = useParams(); // Obtenha a URL da rota
    const { searchDocCompleted } = useContext(DocsContext); // Função para buscar o documento por URL
    const [docCompleted, setDocCompleted] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userType = JSON.parse(localStorage.getItem('@Auth:ProfileUser'));
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchDoc = async () => {
        try {
          // Busque o documento pela URL
          const doc = await searchDocCompleted(docUrl);
          setDocCompleted(doc);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDoc();
    }, [docUrl]); // Atualize a busca sempre que o docUrl mudar
  
    if (loading) return <Preloader />; // Enquanto carrega, exiba o Preloader
  
    if (error) return <div>{error}</div>; // Caso tenha erro, exiba a mensagem de erro
  
    if (!docCompleted) return <div>Documento não encontrado</div>; // Caso não encontre o documento
  
    // Verifique o tipo de usuário antes de renderizar o documento
    if (userType && (userType.userType === 'Admin' || userType.userType === 'Diretor' || userType.teans.includes(docCompleted.docsType))) {
      return <Document docCompleted={docCompleted} />;
    }
    
    return navigate('/home'); // Redirecione se o usuário não tiver permissão
};
