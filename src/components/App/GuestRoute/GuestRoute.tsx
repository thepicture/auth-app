import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface Token {
  exp: number;
}

export function GuestRoute(props: any) {
  const [cookies] = useCookies(["user"]);

  return !!cookies.user ? <Navigate to="/home" replace /> : props.children;
}
