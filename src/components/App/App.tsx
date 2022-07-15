import { Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./ProductsPage/ProductsPage";
import HomePage from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import OrderPage from "./OrderPage/OrderPage";
import OrdersPage from "./OrdersPage/OrdersPage";
import MakeOrderPage from "./MakeOrderPage/MakeOrderPage";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogContentText,
  DialogActions,
  useTheme,
} from "@mui/material";
import SnackbarContext from "../../contexts/SnackbarContext";
import { useState } from "react";
import DialogContext from "../../contexts/DialogContext";

function App() {
  const [open, setOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [callback, setCallback] = useState<{
    onClose: (result: boolean) => void;
  }>({ onClose: () => {} });

  const showSnackbar = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const showQuestion = (
    question: string,
    callback: (result: boolean) => void
  ) => {
    setCallback({ onClose: callback });
    setQuestion(question);
    setIsDialogOpen(true);
  };

  const handleDialogResult = (result: boolean) => {
    callback.onClose(result);
    setIsDialogOpen(false);
  };

  return (
    <DialogContext.Provider value={{ showQuestion }}>
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
            <Dialog
              open={isDialogOpen}
              onClose={() => handleDialogResult(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {question}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleDialogResult(true)}>Yes</Button>
                <Button onClick={() => handleDialogResult(false)} autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </>
        }
      </SnackbarContext.Provider>
    </DialogContext.Provider>
  );
}

export default App;
