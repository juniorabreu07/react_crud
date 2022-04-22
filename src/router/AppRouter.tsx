import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from '../pages/auth/login/Login';
import React from 'react';
import Register from '../pages/auth/register/Register';
import { ProductView } from '../pages/product/ProductView';
import { ApiService } from '../services/ApiService';






export function AppRouter() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {ApiService.getCurrentUser() == null ?
          <Route path="/" element={<Login />} /> :
          <Route path="products" element={<ProductView title={"MY SHOP"} />} />
        }
        <Route path="products" element={<ProductView title={"MY SHOP"} />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}