import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      {/* <Route path="/login" element={ <Login /> } /> */}
      <Route path="/register" element={ <Register /> } />
      <Route exact path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}

export default App;
