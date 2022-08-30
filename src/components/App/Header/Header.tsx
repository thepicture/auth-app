import { Box, Card, Stack } from "@mui/material";

import { Link, useLocation } from "react-router-dom";
import { Logo } from "../Logo/Logo";

import styles from "./Header.module.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.Header}>
      <Card square={true}>
        <Logo />
        {location.pathname == "/login" || location.pathname == "/register" ? (
          <Stack
            direction="row"
            component="ul"
            sx={{
              listStyle: "none",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box component="li">
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Box>
            <Box component="li">
              <Link to="/register" style={{ textDecoration: "none" }}>
                Register
              </Link>
            </Box>
          </Stack>
        ) : (
          <Stack
            direction="row"
            component="ul"
            sx={{
              listStyle: "none",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box component="li">
              <Link to="/products" style={{ textDecoration: "none" }}>
                Products
              </Link>
            </Box>
            <Box component="li">
              <Link to="/orders" style={{ textDecoration: "none" }}>
                Orders
              </Link>
            </Box>
          </Stack>
        )}
      </Card>
    </header>
  );
};

export default Header;
