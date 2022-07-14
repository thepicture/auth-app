import { Button, Typography, Stack } from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SnackbarContext from "../../../../contexts/SnackbarContext";
import api from "../../../../http/api";

export default function OrderForm() {
  const location: any = useLocation();
  const navigate = useNavigate();
  const { showSnackbar } = useContext(SnackbarContext);

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post(
        "/api/order",
        location.state.products.map((product: { id: number }) => product.id)
      );
      if (response.status === 201) {
        showSnackbar("Order has been confirmed");
        navigate("/home");
      }
    } catch (error) {
      showSnackbar("Cannot order products: " + error);
    }
  }

  return (
    <form onSubmit={handleSignIn}>
      <Stack>
        <Typography component="h1" variant="h3" align="center">
          Order {location.state.products.length} products
        </Typography>
        <Button
          type="submit"
          variant="contained"
          style={{ margin: "2em 0 0 0" }}
        >
          Confirm order
        </Button>
      </Stack>
    </form>
  );
}
