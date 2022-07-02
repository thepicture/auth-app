import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

interface SignInResponse {
  token: string;
}

interface ResponseUser {
  fullName: string;
}

export function LoginForm() {
  const [user, setUser] = useState({ login: "", password: "" });

  async function handleSignIn() {
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    try {
      if (response.status === 200) {
        const json: SignInResponse = await response.json();
        const user: ResponseUser = jwt_decode(json.token);
        alert("You are logged in as " + user.fullName);
      } else if (response.status === 401) {
        alert("Incorrect login or password");
      } else {
        throw new Error(
          "Server did not respond as expected: " + response.status
        );
      }
    } catch (error) {
      alert("Cannot sign in: " + error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  return (
    <>
      <Typography variant="h3" component="h1" align="center">
        Sign in to continue
      </Typography>
      <TextField
        onChange={handleChange}
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
        onClick={handleSignIn}
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
    </>
  );
}
