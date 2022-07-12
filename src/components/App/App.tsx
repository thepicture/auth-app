import { Routes, Route, Navigate } from "react-router-dom";
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
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/goods" element={<GoodsPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/orders" element={<MyOrdersPage />} />
      <Route path="/orderProducts/:id" element={<OrderGoods />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
