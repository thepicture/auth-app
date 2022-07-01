import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

interface SignInResponse {
  result: string;
  fullname: string | undefined;
}

export function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    const json: SignInResponse = await response.json();

    if (json.result === "ok") {
      alert("You signed in as " + json.fullname);
    } else if (json.result === "not found") {
      alert("Invalid login or password");
    } else {
      alert("Server did not respond as expected: " + response.status);
    }
  }

  return (
    <>
      <Typography variant="h3" component="h1" align="center">
        Sign in to continue
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
      <Button
        onClick={handleSignIn}
        variant="contained"
        style={{ margin: "2em 0 0 0" }}
      >
        Sign in
      </Button>
    </>
  );
}
