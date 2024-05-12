import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginSystem from './pages/LoginSystem';
import Document from './pages/Document/Document'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Profile from './pages/Profile/Profile';
import EditDocs from './pages/EditDocs/EditDocs';
import { DocsContext } from './context/DocsContext';

function App() {
  const { isAuthentication } = useContext(AuthContext);
  const { Documents } = useContext(DocsContext);

  const userType = JSON.parse(localStorage.getItem('@Auth:ProfileUser'));

  return (
    <>
      {isAuthentication && <Navbar />}
      <Routes>
        <Route path='/' element={isAuthentication ? <Home /> : <LoginSystem />} />
        <Route path='/login' element={!isAuthentication ? <LoginSystem /> : <Home />} />
        <Route path='/home' element={isAuthentication ? <Home /> : <LoginSystem />} />
        <Route path='/profile' element={isAuthentication ? <Profile /> : <LoginSystem />} />
        <Route
          path='/dpanel/editor'
          element={
            isAuthentication && userType && userType.userType === "Admin" ? (
              <EditDocs />
            ) : (
              <Home />
            )
          }
        />

        {Documents &&
          Documents.map((doc, index) => (
            <Route
              key={index}
              path={`/docs/${doc._id}`}
              element={isAuthentication ? <Document doc={doc} /> : <LoginSystem />}
            />
          ))}
      </Routes>
    </>
  );
}

export default App;
