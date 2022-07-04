import { Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Welcome() {
  const { user } = useContext(UserContext);

  return (
    <Typography component="h1" variant="h5" textAlign="center">
      You are logged as {user.fullName}
    </Typography>
  );
}
