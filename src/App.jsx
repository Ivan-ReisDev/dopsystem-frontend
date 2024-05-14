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

function App() {
  const { isAuthentication, userAllArray, getProfileAll } = useContext(AuthContext);
  const { Documents } = useContext(DocsContext);
  const { teams } = useContext(TeamsContext);
  const [loading, setLoading] = useState(false)
  const userType = JSON.parse(localStorage.getItem('@Auth:ProfileUser'));
 

  useEffect(() => {
    getProfileAll()
  }, [isAuthentication])

  JSON.stringify(userAllArray)
  console.log('A ARRAY ESTÀ AQUI' + userAllArray)


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
        {isAuthentication && userType?.userType === "Admin" && (
          <Route path='/dpanel/editor' element={<EditDocs />} />
        )}
        {Array.isArray(Documents) && Documents.map((doc, index) => (
          <Route
            key={index}
            path={`/docs/${doc._id}`}
            element={isAuthentication ? <Document doc={doc} /> : <LoginSystem />}
          />
        ))}



        {Array.isArray(userAllArray) && userAllArray.map((profile) => (
          <Route
            key={profile.nickname}
            path={`/search/profile/${profile.nickname}`}
            element={<Profile profile={profile} />}
          />
        ))}

        {Array.isArray(teams) && teams.map((team, index) => (
          <Route
            key={index}
            path={`/team/${team._id}`}
            element={isAuthentication ? <Teams team={team} /> : <LoginSystem />}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
