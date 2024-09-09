import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocsContext } from "../context/DocsContext";
import { TeamsContext } from "../context/TeamsContext";
import Preloader from "../components/Preloader/Preloader";
import EditDocs from "../pages/EditDocs/EditDocs";

export const EditDocsView = () => {
    const { docUrl } = useParams();
    const { searchDocCompleted } = useContext(DocsContext);
    const { teams, getTeams } = useContext(TeamsContext);
    const [docCompleted, setDocCompleted] = useState(null);
    const [leader, setLeader] = useState(null);  // Inicializado como null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userType = JSON.parse(localStorage.getItem('@Auth:ProfileUser'));
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchDoc = async () => {
        try {
          const doc = await searchDocCompleted(docUrl);
          setDocCompleted(doc);
        } catch (err) {
          setError(err.message);
        }
      };
  
      const fetchTeams = async () => {
        try {
          await getTeams();
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchDoc();
      fetchTeams();
    }, [docUrl, getTeams]);
  
    useEffect(() => {
      if (docCompleted && teams.length > 0) {
        const team = teams.find((team) => team.nameTeams === docCompleted.docsType);
        setLeader(team);
        setLoading(false);
      }
    }, [docCompleted, teams]);
  
    if (loading) {
      return <Preloader />;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (docCompleted && userType) {
      const isAdminOrDirector = userType.userType === 'Admin' || userType.userType === 'Diretor';
      const isLeaderOrViceLeader = leader && (leader.leader === userType.nickname || leader.viceLeader === userType.nickname);
  
      if (isAdminOrDirector || isLeaderOrViceLeader) {
        return <EditDocs doc={docCompleted} />;
      }
    }
  
    navigate('/home');
    return null; // Adicionado para evitar warnings sobre não retornar JSX
  };