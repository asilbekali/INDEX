import {
    createContext,
    useState,
    useEffect,
    type FC,
    type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

type ContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    showNavbar: boolean;
    setShowNavbar: (value: boolean) => void;
};

export const Context = createContext<ContextType>({
    token: null,
    setToken: () => {},
    showNavbar: false,
    setShowNavbar: () => {},
});

export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [showNavbar, setShowNavbar] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setTokenState(storedToken);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const storedToken = localStorage.getItem("token");
            if (!storedToken && token) {
                setTokenState(null);
                navigate("/login");
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [token]);

    const setToken = (newToken: string | null) => {
        if (newToken) localStorage.setItem("token", newToken);
        else localStorage.removeItem("token");
        setTokenState(newToken);
    };

    return (
        <Context.Provider
            value={{ token, setToken, showNavbar, setShowNavbar }}
        >
            {children}
        </Context.Provider>
    );
};
