import { Card } from "@mui/material";
import { LoginForm } from "./LoginForm/LoginForm";

export function LoginPage() {
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
