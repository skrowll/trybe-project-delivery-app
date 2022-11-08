import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Products from './pages/Products';
import Register from './pages/Register';
import './App.css';
import Login from './pages/Login';
import Manage from './pages/Manage';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Details from './pages/Details';

function App() {
  return (
    <Routes>
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/admin/manage" element={ <Manage /> } />
      <Route path="/seller/orders" element={ <Orders /> } />
      <Route path="/seller/orders/:id" element={ <Details /> } />
      <Route path="/login" element={ <Login /> } />
      <Route exact path="/" element={ <Navigate to="/login" replace /> } />
    </Routes>
  );
}

export default App;
