import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import Manage from './pages/Manage';
import Checkout from './pages/Checkout';
import CustomerOrders from './pages/CustomerOrders';
import './App.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route element={ <PrivateRoute /> }>
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/checkout" element={ <Checkout /> } />
        <Route path="/customer/orders" element={ <CustomerOrders /> } />
        <Route path="/admin/manage" element={ <Manage /> } />
      </Route>
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route exact path="/" element={ <Navigate to="/login" replace /> } />
    </Routes>
  );
}

export default App;
