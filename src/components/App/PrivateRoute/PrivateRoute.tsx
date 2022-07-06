import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface Token {
  exp: number;
}

export function PrivateRoute(props: any) {
  const [cookies] = useCookies(["token"]);

  function isJwtValid(): boolean {
    return (
      cookies.token && +new Date() < jwt_decode<Token>(cookies.token).exp * 1000
    );
  }

  return isJwtValid() ? props.children : <Navigate to="/login" replace />;
}
