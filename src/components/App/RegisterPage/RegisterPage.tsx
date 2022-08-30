import { useEffect } from "react";

import { Card } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { RegisterForm } from "./RegisterForm/RegisterForm";

import styles from "./RegisterPage.module.css";

export function RegisterPage() {
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
      <RegisterForm />
    </Card>
  );
}
