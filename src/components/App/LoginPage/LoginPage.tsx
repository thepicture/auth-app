import { useEffect } from "react";

import { Card } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { LoginForm } from "./LoginForm/LoginForm";

import styles from "./LoginPage.module.css";
import api from "../../../http/api";

export function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const navigateToHomeIfHasAccessToken = async () => {
      const response = await api.get("/api/getAccessToken");
      if (response.status > 200 && response.status < 299) navigate("/home");
    };
    navigateToHomeIfHasAccessToken();
  }, []);

  return (
    <Card className={styles.Card}>
      <LoginForm />
    </Card>
  );
}
