import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import ECommerce from "./components/dashboard/main/main";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<ECommerce />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
