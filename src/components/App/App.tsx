import { Routes, Route, Navigate } from "react-router-dom";
import { GuestRoute } from "./GuestRoute/GuestRoute";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import GoodsPage from "./GoodsPage/GoodsPage";
import HomePage from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import OrderPage from "./OrderPage/OrderPage";
import MyOrdersPage from "./MyOrdersPage/MyOrdersPage";
import OrderGoods from "./OrderGoods/OrderGoods";

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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
