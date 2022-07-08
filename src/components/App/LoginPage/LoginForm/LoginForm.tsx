import { useContext, useState } from "react";
import { TextField, Button, Typography, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserContext } from "../../../../contexts/UserContext";
import { BASE_URL } from "../../../../http/Api";
import UserContextInterface from "../../../../interfaces/UserContextInterface";
import SignInResponse from "../../../../interfaces/SignInResponse";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { toExpireDate } from "../../../../namespaces/JwtHelper";

export function LoginForm() {
  const [_cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({ login: "", password: "" });
  const { setUser } = useContext(UserContext) as UserContextInterface;

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(BASE_URL + "/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    });

    try {
      if (response.status === 200) {
        const json: SignInResponse = await response.json();
        setCookie("token", json.token, {
          expires: toExpireDate(json.token),
        });
        setUser({
          id: json.user.id,
          fullName: json.user.fullName,
          token: json.token,
        });
        navigate("/home");
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
    setLoginUser({ ...loginUser, [name]: value });
  }

  return (
    <form onSubmit={handleSignIn}>
      <Stack>
        <Typography variant="h3" component="h1" align="center">
          Sign in to continue
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
        <Button
          type="submit"
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
