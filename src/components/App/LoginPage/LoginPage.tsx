import { useEffect } from "react";

import { Card } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { LoginForm } from "./LoginForm/LoginForm";

import styles from "./LoginPage.module.css";

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
    <Card className={styles.Card}>
      <LoginForm />
    </Card>
  );
}
