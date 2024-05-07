import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthContext, UserContext } from './context/UserContext.jsx';
import Navbar from './components/Navbar.jsx';


const dataUserJSON = localStorage.getItem('users');
const objProfile = dataUserJSON ? JSON.parse(dataUserJSON) : {};


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      {objProfile &&  <Navbar />}
    <AuthContext>
      <App />
    </AuthContext>
  </BrowserRouter>
);
