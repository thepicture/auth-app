import { createContext } from "react";

export interface User {
  token?: string;
  fullName?: string;
}

export const UserContext = createContext<any>({});
