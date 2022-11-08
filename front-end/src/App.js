import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Products from './pages/Products';
import Register from './pages/Register';
import './App.css';
import Login from './pages/Login';
import Manage from './pages/Manage';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/admin/manage" element={ <Manage /> } />
      <Route path="/login" element={ <Login /> } />
      <Route exact path="/" element={ <Navigate to="/login" replace /> } />
    </Routes>
  );
}

export default App;
