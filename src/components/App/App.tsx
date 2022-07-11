import { Routes, Route, Navigate } from "react-router-dom";
import { GuestRoute } from "./GuestRoute/GuestRoute";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import GoodsPage from "./GoodsPage/GoodsPage";
import HomePage from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import { UserContext } from "./../../contexts/UserContext";
import { useState } from "react";
import OrderPage from "./OrderPage/OrderPage";
import User from "../../interfaces/User";
import MyOrdersPage from "./MyOrdersPage/MyOrdersPage";
import OrderGoods from "./OrderGoods/OrderGoods";

function App() {
  const [user, setUser] = useState<User | null>(null) as [
    User,
    React.Dispatch<React.SetStateAction<User>>
  ];

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
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <MyOrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orderProducts/:id"
          element={
            <PrivateRoute>
              <OrderGoods />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={!!user ? "/home" : "/login"} />}
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
