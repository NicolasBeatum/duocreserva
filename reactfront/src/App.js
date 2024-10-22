import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VisualizarMenu from './visualizarMenu.js';
import LoginForm from './test/loginView.js';
import logo from './images/logo.png'
import LocalLunchReservation from './test/posiblemenu.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>DuocReserva</h1>
        
      </header>
      <Router>
        <Routes>
          <Route path="/visualizar-menu" element={<VisualizarMenu />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;