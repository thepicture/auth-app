import { Card } from "@mui/material";
import { RegisterForm } from "./RegisterForm/RegisterForm";

export function RegisterPage() {
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
      <RegisterForm />
    </Card>
  );
}
