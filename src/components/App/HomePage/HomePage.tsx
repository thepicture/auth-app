import { Box, Button, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../http/api";
import User from "../../../interfaces/User";
import Welcome from "./Welcome/Welcome";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get("/api/me");
      setUser(response.data.user);
    };
    fetchUser();
  }, []);

  function handleLogout() {
    if (!window.confirm("Do you really want to log out?")) return;
    else navigate("/");
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
        <Welcome user={user} />
        <Button
          variant="contained"
          onClick={() => navigate("/goods")}
          style={{
            width: "100%",
            margin: "2em auto 0 auto",
          }}
        >
          Show goods
        </Button>
        <Link
          to="/orders"
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
            Show my orders
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
