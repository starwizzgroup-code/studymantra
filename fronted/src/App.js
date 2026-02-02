import './App.css';
import AppRoutes from './Routes/AppRoutes';


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

function App() {
  const URL = process.env.REACT_APP_SERVER_URL
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Load token from localStorage
  useEffect(() => {
    const getdata = window.sessionStorage.getItem('appSessionauthToken');
    if (getdata) {
      const parsed = JSON.parse(getdata);
      setToken(parsed);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.post(
          `${URL}/getdata`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRole(res.data?.Role);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(err.response?.data?.message);
      }
    };

    if (token) fetchdata();
  }, [token]);

  // Loading screen
  if (loading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ user, role, token }}>
      <Router>
        <AppRoutes/>
      </Router>
    </AuthContext.Provider >
  );
}

export default App;
