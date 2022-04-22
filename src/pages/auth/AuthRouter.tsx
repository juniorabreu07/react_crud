import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './login/Login';


export function AuthRouter(){
  return (
    <Routes>
      <Route path="/login">
        <Login />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}