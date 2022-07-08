import { createContext } from "react";
import UserContextInterface from "../interfaces/UserContextInterface";

export const UserContext = createContext<UserContextInterface | null>(null);
