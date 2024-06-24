import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginSystem from './pages/LoginSystem';
import Document from './pages/Document/Document';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import Profile from './pages/Profile/Profile';
import EditDocs from './pages/EditDocs/EditDocs';
import { DocsContext } from './context/DocsContext';
import { TeamsContext } from './context/TeamsContext';
import Teams from './pages/Teams/Teams';
import { UserContext } from './context/UserContext';
import Preloader from './components/Preloader/Preloader';
import Promotion from './pages/Promotion/Promotion';
import Sale from './pages/Sales/Sale';
import Warning from './pages/Warning/Warning';
import Relegation from './pages/Relegation/Relegation';
import Resignation from './pages/Resignation/Resignation';
import Contract from './pages/Contract/Contract';
import Members from './pages/members/Members';
import Footer from './components/Footer/Footer';
import DPanel from './pages/DPanel/DPanel';
import NotFound from './pages/Notfound/NotFound';
import PostClasseInitial from './pages/PostClasseInitial/PostClasseInitial';
import PageBasic from './pages/PageBasic/PageBasic';
import Endorsement from './pages/Endorsement/Endorsement';
import { Analytics } from '@vercel/analytics/react';
function App() {
  const { isAuthentication } = useContext(AuthContext);

  const userType = JSON.parse(localStorage.getItem('@Auth:ProfileUser'));
  // Configurações de equipe
  const { teams } = useContext(TeamsContext);

  return (
    <>
      <Routes>
        <Route path='/' element={<PageBasic />} >
          <Route path='/login' element={!isAuthentication ? <LoginSystem /> : <Home />} />
          <Route path='/home' element={isAuthentication ? <Home /> : <LoginSystem />} />
          <Route index element={isAuthentication ? <Home /> : <LoginSystem />} />

          {/* RODAS DO PAINEL ADMINISTRATIVO */}
          {isAuthentication && userType?.userType === "Admin" ||  userType?.userType === "Diretor" && (
            <Route path='/dpanel' element={<DPanel />} />
          )}

          {/* ROTAS DE EQUIPE */}
          {Array.isArray(teams) && (
            (userType && userType.teans && (userType.userType === "Admin" || userType.userType === "Diretor")) ?
              teams.map((team, index) => (
                <Route
                  key={index}
                  path={`/team/${team.nameTeams}`}
                  element={isAuthentication ? <Teams team={team} /> : <LoginSystem />}
                />
              ))
              :
              teams
                .filter(team => userType && userType.teans && Array.isArray(userType.teans) && userType.teans.includes(team.nameTeams))
                .map((team, index) => (
                  <Route
                    key={index}
                    path={`/team/${team.nameTeams}`}
                    element={isAuthentication ? <Teams team={team} /> : <LoginSystem />}
                  />
                ))
          )}

          {Array.isArray(teams) && (
            teams
              .filter(team => {
                // Verifica se o usuário é Admin ou Diretor
                if (userType && (userType.userType === "Admin" || userType.userType === "Diretor")) {
                  return true;
                }
                // Verifica se o usuário é líder da equipe
                return userType && userType.teans && Array.isArray(userType.teans) && userType.teans.includes(team.nameTeams) && team.leader === userType.nickname;
              })
              .map((team, index) => (
                <Route
                  key={index}
                  path={`/team/${team.nameTeams}/doc/new`}
                  element={isAuthentication ? <EditDocs team={team} /> : <LoginSystem />}
                />
              ))
          )}

          {/* ROTAS DE FORMULÁRIO */}
          <Route path='/postclasse' element={isAuthentication ? <PostClasseInitial /> : <LoginSystem />} />
          <Route path='/promotion' element={isAuthentication ? <Promotion /> : <LoginSystem />} />
          <Route path='/relegation' element={isAuthentication ? <Relegation /> : <LoginSystem />} />
          <Route path='/warning' element={isAuthentication ? <Warning /> : <LoginSystem />} />
          <Route path='/resignation' element={isAuthentication ? <Resignation /> : <LoginSystem />} />
          <Route path='/contract' element={isAuthentication ? <Contract /> : <LoginSystem />} />
          <Route path='/sale' element={isAuthentication ? <Sale /> : <LoginSystem />} />
          <Route path='/members' element={isAuthentication ? <Members /> : <LoginSystem />} />

          {/*  RODAS DE CONFIGURAÇÃO DE DOCUMENTOS */}

          <Route
            path="/doc/:docId"
            element={isAuthentication ? <DocumentView /> : <LoginSystem />}
          />

          <Route
            path={`/editor/:docId`}
            element={isAuthentication ? <EditDocsView /> : <LoginSystem />}
          />


          {isAuthentication && (
            <Route path='/search/:nickname' element={<UserProfile />} />
          )}


          {/* Rota de aval */}

          <Route
            path={`/endorsement`}
            element={isAuthentication && (userType.userType === "Admin" || userType.userType === "Diretor" || userType.userType === "Recursos Humanos") ? <Endorsement /> : <LoginSystem />}
          />


          <Route path="*" element={<NotFound />} />


        </Route>
      </Routes>
      <Analytics />
    </>
  );
}

const EditDocsView = () => {
  const { docId } = useParams();
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
        const doc = await searchDocCompleted(docId);
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
  }, [docId, getTeams]);

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




// Certifique-se de que o contexto está definido corretamente
const DocumentView = () => {
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

  console.log(userType.teans)

  if (userType && (userType.userType === 'Admin' || userType.userType === 'Diretor' || userType.teans.includes(docCompleted.docsType))) {
    if (error) return <div>{error}</div>;
    return <Document docCompleted={docCompleted} />;
  }
  return navigate('/home');
};



const UserProfile = () => {
  const { nickname } = useParams();
  const { searchAllUsers } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await searchAllUsers(nickname); // Ajuste 'specificType' conforme necessário
        setProfile(user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [nickname]);

  if (loading) return <Preloader />;
  if (error) return <div>{error}</div>;

  return profile ? <Profile profile={profile} /> : <div>User not found</div>;
};

export default App;
