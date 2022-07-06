import { Routes, Route } from "react-router-dom";
import { GuestRoute } from "./GuestRoute/GuestRoute";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import GoodsPage from "./GoodsPage/GoodsPage";
import HomePage from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import { UserContext, User } from "./../../contexts/UserContext";
import { useState } from "react";

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
