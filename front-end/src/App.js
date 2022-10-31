import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route exact path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}

export default App;
