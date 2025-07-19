import type { Dispatch, SetStateAction } from "react";

export interface ContextType {
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
    showNavbar: boolean;
    setShowNavbar: Dispatch<SetStateAction<boolean>>;
}
