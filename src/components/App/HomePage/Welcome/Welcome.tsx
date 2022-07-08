import { Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import UserContextInterface from "../../../../interfaces/UserContextInterface";

export default function Welcome() {
  const { user } = useContext(UserContext) as UserContextInterface;

  return (
    <Typography component="h1" variant="h3" textAlign="center">
      You are logged in as {user.fullName}
    </Typography>
  );
}
