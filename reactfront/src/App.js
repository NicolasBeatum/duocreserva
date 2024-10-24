import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navBar.js';
import LoginForm from './components/loginView.js';
import MenuLocal from './components/Menu.js';
import { AuthProvider } from './context/authContext.js';
import Perfil from './components/Perfil.js';
import PrivateRoute from './components/privateRoutes.js';
import AdminView from './components/adminView.js';
import AdminRoute from './components/AdminRoutes.js'; 


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<MenuLocal />} />
            <Route path="/visualizar-menu" element={<MenuLocal />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminView /></AdminRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;