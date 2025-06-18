import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({children,type}) => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    if(!admin || admin.type !== type){
      return <Navigate to='/'/>;
    }
  return children;
}

export default ProtectedRoute
