import { Routes, Route, Navigate } from "react-router-dom";
import { GuestRoute } from "../components/GuestRoute/GuestRoute";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import GoodsPage from "./GoodsPage/GoodsPage";
import HomePage from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { UserContext, User } from "../contexts/UserContext";
import { useMemo, useState } from "react";

function App() {
  const [user, setUser] = useState<User>({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
        <Route
          path="/goods"
          element={
            <PrivateRoute>
              <GoodsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
