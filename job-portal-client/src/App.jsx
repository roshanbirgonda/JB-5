import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import {RouterProvider} from "react-router-dom";
import router from './Router/Router.jsx';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  // console.log(token)

  const handleNavigation = () => {
    if (isAuthenticated) {
      // Navigating to the home page if authenticated
      if (location.pathname !== '/') {
        <RouterProvider router={router} />
        // navigate('/');
      }
    } else {
      // Navigating to the login page if not authenticated
      if (location.pathname !== '/login') {
        navigate('/login');
        if (location.pathname==='/sign-up') {
          navigate('/sign-up');
        }
      }
    }
  };

  useEffect(() => {
    handleNavigation();
  }, [location.pathname, isAuthenticated]); 

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;

