import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const ProtectedRoutes=window.sessionStorage.getItem("token Value")
    console.log("Value of auth token",ProtectedRoutes);
    
  return ProtectedRoutes?<Outlet/>:<Navigate to ="/error"/>
}

export default ProtectedRoutes