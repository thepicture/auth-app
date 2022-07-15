import { createContext } from "react";

export interface DialogProps {
    showQuestion: (question: string, onConfirm: (result: boolean) => void) => void;
}

const DialogContext = createContext<DialogProps>({} as DialogProps);

export default DialogContext;