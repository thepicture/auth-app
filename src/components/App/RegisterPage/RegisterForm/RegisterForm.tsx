import { FormEvent, useState } from "react";
import { TextField, Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export function RegisterForm() {
  const [user, setUser] = useState({ login: "", password: "", fullName: "" });

  function isCanSignUp() {
    return user.login && user.password && user.fullName;
  }

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 201) {
      alert("You have created a new account");
    } else if (response.status === 409) {
      alert("User with this login already exists");
    } else {
      alert("Server did not respond as expected: " + response.status);
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
        <TextField
          onChange={handleChange}
          name="fullName"
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
