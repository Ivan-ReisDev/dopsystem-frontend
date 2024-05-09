import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginSystem from './pages/LoginSystem';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Profile from './pages/Profile/Profile';

function App() {

  const { isAuthentication } = useContext(AuthContext)

  
  return (
    <>
        { isAuthentication && < Navbar/>}
      <Routes>
        <Route path='/' element={isAuthentication ? <Home /> : <LoginSystem />} />
        <Route path='/login' element={!isAuthentication ? <LoginSystem /> : <Home />} />
        <Route path='/home' element={ isAuthentication ? <Home /> : <LoginSystem />} />
        <Route path='/profile' element={ isAuthentication ? <Profile /> : <LoginSystem />} />
      </Routes>
    </>
  );
}

export default App;
