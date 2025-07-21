import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./context/UserContext";
import { LanguageProvider } from "./service/language-contex";
import { ToastProvider } from "./hooks/use-toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalContext>
                <LanguageProvider>
                    <ToastProvider>
                        <App />
                    </ToastProvider>
                </LanguageProvider>
            </GlobalContext>
        </BrowserRouter>
    </React.StrictMode>
);
