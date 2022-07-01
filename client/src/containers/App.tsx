import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
