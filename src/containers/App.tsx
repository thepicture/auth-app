import { Routes, Route, Navigate } from "react-router-dom";
import { GuestRoute } from "../components/GuestRoute/GuestRoute";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import HomePage from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
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
