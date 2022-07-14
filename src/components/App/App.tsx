import { Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./ProductsPage/ProductsPage";
import HomePage from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import OrderPage from "./OrderPage/OrderPage";
import OrdersPage from "./OrdersPage/OrdersPage";
import MakeOrderPage from "./MakeOrderPage/MakeOrderPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/makeOrder" element={<MakeOrderPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
