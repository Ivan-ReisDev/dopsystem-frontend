import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, json } from 'react-router-dom';
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
import Logger from './pages/Logger/Logger';
import { UserContext } from './context/UserContext';
import Preloader from './components/Preloader/Preloader';
import Promotion from './pages/Promotion/Promotion';
import Sale from "./pages/Sales/Sale"

import Warning from './pages/Warning/Warning';
import Relegation from './pages/Relegation/Relegation';
import Resignation from './pages/Resignation/Resignation';
import Contract from './pages/Contract/Contract';
import Members from './pages/members/Members';
import Footer from './components/Footer/Footer';
import DPanel from './pages/DPanel/DPanel';
import NotFound from './pages/Notfound/NotFound';


function App() {
  const { isAuthentication, userAllArray, getProfileAll, loading, setLoading } = useContext(AuthContext);
  const { Documents } = useContext(DocsContext);
  const { teams } = useContext(TeamsContext);
  const userType = JSON.parse(localStorage.getItem('@Auth:ProfileUser'));


  useEffect(() => {
    getProfileAll()
  }, [isAuthentication])

  return (

    <>
      <Preloader shoWstatus={loading} />
      {isAuthentication && <Navbar />}
      <Routes>
        <Route path='/' element={!isAuthentication ? <LoginSystem setLoading={setLoading} /> : <Home />} />
        <Route path='/home' element={isAuthentication ? <Home /> : <LoginSystem setLoading={setLoading} />} />
        <Route path='/login' element={!isAuthentication ? <LoginSystem setLoading={setLoading} /> : <Home />} />
        {isAuthentication && userType?.userType === "Admin" && (
          <Route path='/loggers' element={<Logger />} />
        )}

        {/* RODAS DO PAINEL ADMINISTRATIVO */}
        {isAuthentication && userType?.userType === "Admin" && (
          <Route path='/dpanel/editor' element={<EditDocs />} />
        )}

        {isAuthentication && userType?.userType === "Admin" && (
          <Route path='/dpanel' element={<DPanel />} />
        )}

       <Route path='/promotion' element={isAuthentication ? <Promotion /> : <LoginSystem setLoading={setLoading} />} />
       <Route path='/relegation' element={isAuthentication ? <Relegation /> : <LoginSystem setLoading={setLoading} />} />
       <Route path='/warning' element={isAuthentication ? <Warning /> : <LoginSystem setLoading={setLoading} />} />
       <Route path='/resignation' element={isAuthentication ? <Resignation /> : <LoginSystem setLoading={setLoading} />} />
       <Route path='/contract' element={isAuthentication ? <Contract /> : <LoginSystem setLoading={setLoading} />} />
       <Route path='/sale' element={isAuthentication ? <Sale /> : <LoginSystem setLoading={setLoading} />} />
       <Route path='/members' element={isAuthentication ? <Members /> : <LoginSystem setLoading={setLoading} />} />
        {Array.isArray(Documents) && Documents.map((doc, index) => (
          <Route
            key={index}
            path={`/docs/${doc._id}`}
            element={isAuthentication ? <Document doc={doc} /> : <LoginSystem />}
          />
        ))}

{Array.isArray(Documents) && Documents.map((doc, index) => (
          <Route
            key={index}
            path={`{/docs/${doc._id}`}
            element={isAuthentication ? <Document doc={doc} /> : <LoginSystem />}
          />
        ))};

{Array.isArray(teams) && teams.map((team, index) => (
          <Route
            key={index}
            path={`/team/${team.nameTeams}`}
            element={isAuthentication ? <Teams team={team} /> : <LoginSystem />}
          />
        ))}


        {Array.isArray(teams) && teams.map((team, index) => (
          <Route
            key={index}
            path={`/team/${team.nameTeams}/doc/new`}
            element={isAuthentication ? <EditDocs team={team} /> : <LoginSystem />}
          />
        ))}

{Array.isArray(Documents) && Documents.map((doc, index) => (
          <Route
            key={index}
            path={`/team/${doc.docsType}/doc/${doc._id}`}
            element={isAuthentication ? <Document doc={doc} /> : <LoginSystem />}
          />
        ))}

{Array.isArray(Documents) && Documents.map((doc, index) => (
          <Route
            key={index}
            path={`/editor/${doc.docsType}/doc/${doc._id}`}
            element={isAuthentication ? <EditDocs doc={doc} /> : <LoginSystem />}
          />
        ))}
       

        {isAuthentication && Array.isArray(userAllArray) && userAllArray.map((profile) => (
          <Route
            key={profile.nickname}
            path={`/search/profile/${profile.nickname}`}
            element={<Profile profile={profile} />}
          />
        ))}

        {Array.isArray(teams) && teams.map((team, index) => (
          <Route
            key={index}
            path={`/team/${team.nameTeams}`}
            element={isAuthentication ? <Teams team={team} /> : <LoginSystem />}
          />
        ))}

       <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
