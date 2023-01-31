import { useEffect } from "react";

import { Card } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { RegisterForm } from "./RegisterForm/RegisterForm";

import styles from "./RegisterPage.module.css";
import api from "../../../http/api";

export function RegisterPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const navigateToHomeIfHasAccessToken = async () => {
      const response = await api.get("/api/getAccessToken");
      if (response.status > 200 && response.status < 299) navigate("/home");
    };
    navigateToHomeIfHasAccessToken();
  }, [navigate]);
  return (
    <Card className={styles.Card}>
      <RegisterForm />
    </Card>
  );
}
