import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

// Imports
import { setCredentials, logout } from "./store/authSlice"; 
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import AIRecommendations from './components/AIRecommendations'; // Naya AI Component
import { loginUser } from "./services/api";

// --- 1. Activities Page (Dashboard) ---
const ActivitiesPage = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    dispatch(logout()); 
    window.location.href = "/"; 
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Welcome Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: '#1976d2' }}>
          Welcome, <strong>{user?.name}</strong>
        </Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* --- AI COACH SECTION --- */}
      <Box sx={{ mb: 4 }}>
        <AIRecommendations />
      </Box>

      {/* Activities Section */}
      <Box sx={{ border: '1px dashed grey', p: 2, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Your Activities</Typography>
        <ActivityForm onActivityAdded={() => window.location.reload()} />
        <ActivityList />
      </Box>
    </Box>
  );
};

// --- 2. Login Page ---
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!username || !password) {
      alert("Please enter both Name and Password");
      return;
    }
    try {
      const response = await loginUser({ username, password });
      onLogin(response.data.username); 
    } catch (error) {
      alert(error.response?.data || "Login failed. Check username/password.");
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Paper elevation={3} sx={{ p: 4, width: 350, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
          Fitness Tracker Login
        </Typography>
        <TextField fullWidth label="User Name" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} />
        <Button variant="contained" fullWidth size="large" onClick={handleSubmit}>Login</Button>
      </Paper>
    </Box>
  );
};

// --- 3. Main App Component ---
function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleLogin = (name) => {
    const userData = { name: name };
    dispatch(setCredentials({ token: "demo-token", user: userData }));
  };

  return (
    <Router>
      <Box component="section" sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
        <Routes>
          {!token ? (
            <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/" element={<Navigate to="/activities" replace />} />
            </>
          )}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;