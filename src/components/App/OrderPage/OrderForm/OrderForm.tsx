import { Button, Typography, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../../../../http/Api";

export default function OrderForm() {
  const [cookies] = useCookies(["token"]);

  const location: any = useLocation();
  const navigate = useNavigate();

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(BASE_URL + "/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify(location.state.goods),
    });

    try {
      if (response.status === 201) {
        alert("Order has been confirmed");
        navigate("/home");
      }
    } catch (error) {
      alert("Cannot order products: " + error);
    }
  }

  return (
    <form onSubmit={handleSignIn}>
      <Stack>
        <Typography variant="h3" component="h1" align="center">
          Order {location.state.goods.length} products
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
