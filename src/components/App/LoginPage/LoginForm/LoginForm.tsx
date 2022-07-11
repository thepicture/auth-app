import { useContext, useState } from "react";
import { TextField, Button, Typography, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserContext } from "../../../../contexts/UserContext";
import SignInResponse from "../../../../interfaces/SignInResponse";
import UserContextInterface from "../../../../interfaces/UserContextInterface";
import api from "../../../../http/api";

export function LoginForm() {
  const [_cookies, setCookie] = useCookies(["token", "user"]);
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({ login: "", password: "" });
  const { setUser } = useContext(UserContext) as UserContextInterface;

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/api/signin", loginUser, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const data: SignInResponse = response.data;
        setCookie("user", data.user);
        setUser({
          id: data.user.id,
          fullName: data.user.fullName,
        });
        navigate("/home");
      }
    } catch (error) {
      alert("Incorrect login or password");
    }
  }

  function isCanSignIn() {
    return loginUser.login !== "" && loginUser.password !== "";
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
