// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />} />ssss
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
σ
      {/* Ολα τα protected routes πχ. dashboard και άλλα μέσα στο AppLayout */}
      <Route path="/dashboard/" element={<Dashboard />}/> 
    </Routes>
  );
}

export default App;



