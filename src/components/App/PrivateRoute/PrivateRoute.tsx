import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function PrivateRoute(props: any) {
  const [isVerified, setIsVerified] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, _setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () =>
      await fetch("/api/verify")
        .then((res) => {
          if (res.status === 200) setIsAuthenticated(true);
        })
        .finally(() => setIsVerified(true));
    verify();
  });

  if (isVerified) {
    if (isAuthenticated && !!cookies) {
      return <>{props.children}</>;
    } else {
      removeCookie("user");
      navigate("/login", { replace: true });
      return <></>;
    }
  } else {
    return <></>;
  }
}
