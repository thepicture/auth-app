import { Typography } from "@mui/material";
import { useCookies } from "react-cookie";

export default function Welcome() {
  const [cookies] = useCookies(["token"]);

  return (
    <Typography component="h1" variant="h5" textAlign="center">
      You are logged in with token
      {" " + cookies.token}
    </Typography>
  );
}
