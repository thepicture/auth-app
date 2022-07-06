import { useContext, useState } from "react";
import { TextField, Button, Typography, Stack } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { User, UserContext } from "../../../../contexts/UserContext";
import { BASE_URL } from "../../../../http/Api";

interface SignInResponse {
  token: string;
  exp: number;
}

export default function OrderForm(props: any) {
  const [cookies, setCookie] = useCookies(["token"]);

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
