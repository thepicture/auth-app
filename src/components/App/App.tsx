import { Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./ProductsPage/ProductsPage";
import HomePage from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import OrderPage from "./OrderPage/OrderPage";
import OrdersPage from "./OrdersPage/OrdersPage";
import MakeOrderPage from "./MakeOrderPage/MakeOrderPage";
import { Snackbar, Alert } from "@mui/material";
import SnackbarContext from "../../contexts/SnackbarContext";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showSnackbar(message: string) {
    setMessage(message);
    setOpen(true);
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {
        <>
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
          <Snackbar
            open={open}
            autoHideDuration={6400}
            onClose={() => setOpen(false)}
          >
            <Alert severity="info" sx={{ width: "100%" }}>
              {message}
            </Alert>
          </Snackbar>
        </>
      }
    </SnackbarContext.Provider>
  );
}

export default App;
