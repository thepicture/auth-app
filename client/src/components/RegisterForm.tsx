import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface SignInResponse {
  result: string;
  fullname: string | undefined;
}

export function RegisterForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  function isCanSignUp() {
    return login !== "" && password !== "" && fullName !== "";
  }

  async function handleSignUp() {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
        fullName,
      }),
    });

    if (response.status === 201) {
      alert("You have created a new account");
    } else {
      alert("Server did not respond as expected: " + response.status);
    }
  }

  return (
    <>
      <Typography variant="h3" component="h1" align="center">
        Create a new account
      </Typography>
      <TextField
        onChange={(e) => setLogin(e.target.value)}
        label="Login"
        variant="standard"
        margin="normal"
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        label="Password"
        variant="standard"
        margin="normal"
      />
      <TextField
        onChange={(e) => setFullName(e.target.value)}
        label="Full name"
        variant="standard"
        margin="normal"
      />
      <Button
        onClick={handleSignUp}
        disabled={!isCanSignUp()}
        variant="contained"
        style={{ margin: "2em 0 0 0" }}
      >
        Create account
      </Button>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          style={{
            margin: "2em auto 0 auto",
            width: "100%",
          }}
        >
          To login form
        </Button>
      </Link>
    </>
  );
}
