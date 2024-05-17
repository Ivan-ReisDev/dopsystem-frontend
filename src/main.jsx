import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { DocsProvider } from './context/DocsContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { TeamsProvider } from './context/TeamsContext.jsx';
import { RequirementsProvider } from './context/Requirements.jsx';
import { SystemProvider } from './context/SystemContent.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <SystemProvider>
        <DocsProvider>
          <UserProvider>
            <TeamsProvider>
              <RequirementsProvider>
                <App />
              </RequirementsProvider>
            </TeamsProvider>
          </UserProvider>
        </DocsProvider>
      </SystemProvider>
    </AuthProvider>
  </BrowserRouter>
);
