import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginSystem from './pages/LoginSystem'
import Home from './pages/Home.jsx';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';


function App() {
  const { tokenUser, profile } = useContext(UserContext)
  return (
    <>
      <Routes>
        <Route path='/' element={tokenUser ? <Home /> : <LoginSystem />} />
        <Route path='/home' element={tokenUser && <Home />} />
      </Routes>
    </>
  )
}

export default App
