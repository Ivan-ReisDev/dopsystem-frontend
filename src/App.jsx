import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginSystem from './pages/LoginSystem';
import Document from './pages/Document/Document';
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
import EditDocs from './pages/EditDocs/EditDocs';
import { DocsContext } from './context/DocsContext';
import { TeamsContext } from './context/TeamsContext';
import Teams from './pages/Teams/Teams';
import Preloader from './components/Preloader/Preloader';
import Promotion from './pages/Promotion/Promotion';
import Sale from './pages/Sales/Sale';
import Warning from './pages/Warning/Warning';
import Relegation from './pages/Relegation/Relegation';
import Resignation from './pages/Resignation/Resignation';
import Contract from './pages/Contract/Contract';
import Members from './pages/members/Members';
import DPanel from './pages/DPanel/DPanel';
import NotFound from './pages/Notfound/NotFound';
import PostClasseInitial from './pages/PostClasseInitial/PostClasseInitial';
import PageBasic from './pages/PageBasic/PageBasic';
import Endorsement from './pages/Endorsement/Endorsement';
import { Analytics } from '@vercel/analytics/react';
import { UserProfile } from './routes/UserProfiler';
import { EditDocsView } from './routes/EditDocsView';
import { DocumentView } from './routes/DocumentView';
import useScrollToTop from './hooks/useScrollToTop ';
function App() {
  useScrollToTop()
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
          {isAuthentication && (userType?.userType === "Admin" ||  userType?.userType === "Diretor") && (
            <Route path='/dpanel' element={<DPanel />} />
          )}

          {/* ROTAS DE EQUIPE */}
          {Array.isArray(teams) && (
            (userType && userType.teans && (userType.userType === "Admin" || userType.userType === "Diretor")) ?
              teams.map((team, index) => (
                <Route
                  key={index}
                  path={`/team/${team.url}`}
                  element={isAuthentication ? <Teams team={team} /> : <LoginSystem />}
                />
              ))
              :
              teams
                .filter(team => userType && userType.teans && Array.isArray(userType.teans) && userType.teans.includes(team.nameTeams))
                .map((team, index) => (
                  <Route
                    key={index}
                    path={`/team/${team.url}`}
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
            path="/doc/:docUrl"
            element={isAuthentication ? <DocumentView /> : <LoginSystem />}
          />

          <Route
            path={`/editor/:docUrl`}
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

export default App;