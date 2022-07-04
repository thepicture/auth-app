import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Welcome from "../../components/Welcome/Welcome";

export default function HomePage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
    >
      <Welcome />
      <Link to="/goods" style={{ textDecoration: "none" }}>
        <Button
          style={{
            margin: "2em auto 0 auto",
            width: "100%",
          }}
        >
          Show goods
        </Button>
      </Link>
    </Box>
  );
}
