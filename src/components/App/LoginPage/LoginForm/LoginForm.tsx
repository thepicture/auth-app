import { useContext, useState } from "react";

import { TextField, Button, Typography, Stack } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import api from "../../../../http/api";
import SnackbarContext from "../../../../contexts/SnackbarContext";

export function LoginForm() {
  const navigate = useNavigate();
  const { showSnackbar } = useContext(SnackbarContext);

  const [loginUser, setLoginUser] = useState({ login: "", password: "" });

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/api/signin", loginUser, {
        validateStatus: (status) => status === 401 || status === 200,
      });
      if (response.status === 200) {
        navigate("/home");
      } else if (response.status === 401)
        showSnackbar("Incorrect login or password");
    } catch (error) {
      showSnackbar("Cannot login: " + error);
    }
  }

  function isCanSignIn() {
    return true;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  }

  return (
    <form onSubmit={handleSignIn}>
      <Stack>
        <Typography component="h1" variant="h3" align="center">
          Sign in to continue
        </Typography>
        <TextField
          onChange={handleChange}
          autoComplete="username"
          autoFocus
          name="login"
          label="Login"
          variant="standard"
          margin="normal"
        />
        <TextField
          onChange={handleChange}
          name="password"
          type="password"
          label="Password"
          variant="standard"
          margin="normal"
        />
        <Button
          type="submit"
          disabled={!isCanSignIn()}
          variant="contained"
          style={{ margin: "2em 0 0 0" }}
        >
          Sign in
        </Button>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button
            style={{
              margin: "2em auto 0 auto",
              width: "100%",
            }}
          >
            Sign Up
          </Button>
        </Link>
      </Stack>
    </form>
  );
}
