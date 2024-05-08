import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginSystem from './pages/LoginSystem'
import Home from './pages/Home.jsx';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { useAuth } from './hooks/useAuth.jsx';

function App() {

const navigate = useNavigate()
const {auth, loading} = useAuth();

  return (
    <>
      { auth && <Navbar />}
      <Routes>
        <Route path='/' element={auth ? <Home /> : <LoginSystem />}/>
        <Route path='/home' element={!auth ? <LoginSystem /> : <Home />} />
      </Routes>
    </>
  )
}

export default App
