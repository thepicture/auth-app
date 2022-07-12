import { Typography } from "@mui/material";
import User from "../../../../interfaces/User";

interface WelcomeProps {
  user: User | undefined;
}

export default function Welcome({ user }: WelcomeProps) {
  return (
    <Typography component="h1" variant="h3" textAlign="center">
      You are logged in as {user?.fullName} with role {user?.roleTitle}
    </Typography>
  );
}
