import { Box, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Welcome from "../../components/Welcome/Welcome";

export default function HomePage() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  function handleLogout() {
    if (!window.confirm("Do you really want to log out?")) return;

    removeCookie("token");
    navigate("/");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Welcome />
      <Link to="/goods" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          style={{
            margin: "2em auto 0 auto",
            width: "100%",
          }}
        >
          Show goods
        </Button>
      </Link>
      <Button
        onClick={handleLogout}
        variant="outlined"
        style={{
          margin: "2em auto 1em auto",
          width: "100%",
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
