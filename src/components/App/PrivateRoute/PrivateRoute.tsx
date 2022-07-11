import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Token {
  exp: number;
}

export function PrivateRoute(props: any) {
  const [isVerified, setIsVerified] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verify = async () =>
      await fetch("/api/verify")
        .then((res) => {
          if (res.status === 200) setIsAuthenticated(true);
        })
        .finally(() => setIsVerified(true));
    verify();
  }, []);

  return (
    isVerified &&
    (isAuthenticated ? props.children : <Navigate to="/login" replace />)
  );
}
