import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export function GuestRoute(props: any) {
  const [isVerified, setIsVerified] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies] = useCookies(["user"]);

  useEffect(() => {
    const verify = async () =>
      await fetch("/api/verify")
        .then((res) => {
          if (res.status === 200) setIsAuthenticated(true);
        })
        .finally(() => setIsVerified(true));
    verify();
  }, []);

  if (isVerified) {
    if (isAuthenticated && !!cookies.user) {
      return <Navigate to="/home" replace />;
    } else {
      return <>{props.children}</>;
    }
  } else {
    return <>{props.children}</>;
  }
}
