import { Box, Button, Card } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DialogContext from "../../../contexts/DialogContext";
import api from "../../../http/api";
import User from "../../../interfaces/User";
import Welcome from "./Welcome/Welcome";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const { showQuestion } = useContext(DialogContext);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get("/api/me");
      setUser(response.data.user);
    };
    fetchUser();
  }, []);

  function handleLogout() {
    showQuestion(
      "Do you really want to log out?",
      (isConfirmed: boolean) => isConfirmed && navigate("/")
    );
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
          onClick={() => navigate("/products")}
          style={{
            width: "100%",
            margin: "2em auto 0 auto",
          }}
        >
          Show products
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
