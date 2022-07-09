import { Typography } from "@mui/material";
import { useCookies } from "react-cookie";

export default function Welcome() {
  const [cookies] = useCookies(["user"]);

  return (
    <Typography component="h1" variant="h3" textAlign="center">
      You are logged in as {cookies.user.fullName}
    </Typography>
  );
}
