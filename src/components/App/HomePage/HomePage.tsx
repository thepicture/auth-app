import { Box, Button, Card } from "@mui/material";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Welcome from "./Welcome/Welcome";

export default function HomePage() {
  const [_cookies, _setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  function handleLogout() {
    if (!window.confirm("Do you really want to log out?")) return;

    removeCookie("token");
    navigate("/");
  }

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Welcome />
        <Link
          to="/goods"
          style={{
            textDecoration: "none",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            style={{
              width: "100%",
              margin: "2em auto 0 auto",
            }}
          >
            Show goods
          </Button>
        </Link>
        <Button
          onClick={handleLogout}
          sx={{
            margin: "2em auto 1em auto",
            width: "100%",
          }}
        >
          Logout
        </Button>
      </Box>
    </Card>
  );
}
