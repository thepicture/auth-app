import jwtDecode, { JwtPayload } from "jwt-decode";
import { Cookies, useCookies } from "react-cookie";

const TO_UNIX_MILLISECONDS = 1000;

export const toExpireDate = (token: string): Date => new Date(jwtDecode<JwtPayload>(token).exp as number * TO_UNIX_MILLISECONDS);