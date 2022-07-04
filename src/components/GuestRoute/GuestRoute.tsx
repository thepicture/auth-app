import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

interface Token {
  exp: number;
}

export function GuestRoute(props: any) {
  const [cookies] = useCookies(["token"]);

  function isJwtValid(): boolean {
    return (
      cookies.token && +new Date() < jwt_decode<Token>(cookies.token).exp * 1000
    );
  }

  return isJwtValid() ? <Navigate to="/home" replace /> : props.children;
}
