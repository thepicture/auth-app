import { Card } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm/LoginForm";

export function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const navigateToHomeIfHasAccessToken = async () => {
      const response = await fetch("/api/getAccessToken");
      if (response.ok) navigate("/home");
    };
    navigateToHomeIfHasAccessToken();
  }, []);

  return (
    <Card
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "3em",
      }}
    >
      <LoginForm />
    </Card>
  );
}
