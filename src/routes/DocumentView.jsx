import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocsContext } from "../context/DocsContext";
import Document from "../pages/Document/Document";
import Preloader from "../components/Preloader/Preloader";

export const DocumentView = () => {
    const { docId } = useParams();
    const { searchDocCompleted } = useContext(DocsContext);
    const [docCompleted, setDocCompleted] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userType = JSON.parse(localStorage.getItem('@Auth:ProfileUser'));
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchDoc = async () => {
        try {
          const doc = await searchDocCompleted(docId);
          setDocCompleted(doc);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDoc();
    }, [docId]);
  
    if (!docCompleted) {
      return <Preloader />;
    }
  
  
  
    if (userType && (userType.userType === 'Admin' || userType.userType === 'Diretor' || userType.teans.includes(docCompleted.docsType))) {
      if (error) return <div>{error}</div>;
      return <Document docCompleted={docCompleted} />;
    }
    return navigate('/home');
  };