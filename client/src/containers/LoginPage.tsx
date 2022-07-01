import { Card, Stack } from "@mui/material";
import { LoginForm } from "../components/LoginForm";

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
      <Stack>
        <LoginForm />
      </Stack>
    </Card>
  );
}
