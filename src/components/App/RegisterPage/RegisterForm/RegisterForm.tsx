import { FormEvent, useContext, useState } from "react";
import { TextField, Button, Typography, Stack } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import api from "../../../../http/api";
import SnackbarContext from "../../../../contexts/SnackbarContext";

export function RegisterForm() {
  const [user, setUser] = useState({ login: "", password: "", fullName: "" });
  const navigate = useNavigate();
  const { showSnackbar } = useContext(SnackbarContext);

  function isCanSignUp() {
    return user.login && user.password && user.fullName;
  }

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/api/signup", user, {
        validateStatus: (status) => status >= 201 && status <= 409,
      });
      if (response.status === 201) {
        showSnackbar("You have created a new account");
        navigate("/login");
      } else if (response.status === 409) {
        showSnackbar("User with this login already exists");
      }
    } catch (error: any) {
      showSnackbar("Server did not respond as expected: " + error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  return (
    <form onSubmit={handleSignUp}>
      <Stack>
        <Typography variant="h3" component="h1" align="center">
          Create a new account
        </Typography>
        <TextField
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          type="text"
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
        <TextField
          onChange={handleChange}
          autoComplete="name"
          name="fullName"
          type="text"
          label="Full name"
          variant="standard"
          margin="normal"
        />
        <Button
          type="submit"
          disabled={!isCanSignUp()}
          variant="contained"
          style={{ margin: "2em 0 0 0" }}
        >
          Create account
        </Button>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            style={{
              margin: "2em auto 0 auto",
              width: "100%",
            }}
          >
            To login form
          </Button>
        </Link>
      </Stack>
    </form>
  );
}
