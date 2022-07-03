import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import HomePage from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
