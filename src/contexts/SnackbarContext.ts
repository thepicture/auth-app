import { createContext } from "react";

export interface SnackbarProps {
    showSnackbar: (message: string) => void;
}

const SnackbarContext = createContext({} as SnackbarProps);

export default SnackbarContext;