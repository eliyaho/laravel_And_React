import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MortgageTable from './components/MortgageTable';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/MortgageTable" element={<MortgageTable />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
