import React, { useContext, useState } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function MainApp() {
  const { user, loading } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        width: '100vw',
        background: 'var(--bg-main)'
      }}>
        <div className="spinner" style={{ width: '40px', height: '40px', color: 'var(--primary)' }}></div>
      </div>
    );
  }

  if (!user) {
    return showRegister ? (
      <Register onToggleAuth={() => setShowRegister(false)} />
    ) : (
      <Login onToggleAuth={() => setShowRegister(true)} />
    );
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
