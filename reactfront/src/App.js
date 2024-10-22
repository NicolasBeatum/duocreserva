import './App.css';
import ComidasTable from './test/ComidasTable';
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VisualizarMenu from './visualizarMenu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/img/logoDuocReserva.png" className="App-logo" alt="logo" />
        <h1>DuocReserva</h1>
      </header>

      <Router>
        <Routes>
          <Route path="/visualizar-menu" element={<VisualizarMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

